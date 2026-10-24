import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { RECIPIENT, type DohodninaRequest } from "./dohodnina";

// The standard PDF fonts cannot encode č, so the form embeds DejaVu Sans
// (lib/fonts, free licence alongside). next.config.ts ships the files with
// the API route.
const FONT_DIR = path.join(process.cwd(), "lib", "fonts");

const INK = rgb(0, 0, 0);
const GREY = rgb(0.35, 0.35, 0.35);
const HEADER_FILL = rgb(0.25, 0.25, 0.25);
const WHITE = rgb(1, 1, 1);

const MARGIN = 60;
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;

/**
 * Lays out the official "Zahteva za namenitev dela dohodnine za donacije"
 * (Doh-Don) with the taxpayer's data and drawn signature in place, so the
 * printout is the same form FURS receives on paper.
 */
export async function buildDohodninaPdf(
  req: DohodninaRequest,
  date: string,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle("Zahteva za namenitev dela dohodnine za donacije");
  doc.setAuthor(`${req.firstName} ${req.lastName}`);
  doc.setLanguage("sl-SI");

  const [regular, bold] = await Promise.all([
    readFile(path.join(FONT_DIR, "DejaVuSans.ttf")).then((b) =>
      doc.embedFont(b, { subset: true }),
    ),
    readFile(path.join(FONT_DIR, "DejaVuSans-Bold.ttf")).then((b) =>
      doc.embedFont(b, { subset: true }),
    ),
  ]);

  const page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 80;

  page.drawText("PODATKI O DAVČNEM ZAVEZANCU:", {
    x: MARGIN,
    y,
    size: 10,
    font: bold,
  });
  y -= 42;

  // Two columns of filled-in lines, as on the paper form.
  const leftW = 260;
  const rightX = MARGIN + 300;
  const rightW = CONTENT_W - 300;
  const rows: [string, string, string, string][] = [
    [
      `${req.firstName} ${req.lastName}`,
      "(ime in priimek)",
      req.taxNumber,
      "(davčna številka)",
    ],
    [
      req.street,
      "(podatki o bivališču: naselje, ulica, hišna številka)",
      req.email,
      "(elektronski naslov)",
    ],
    [
      `${req.postalCode} ${req.postName}`,
      "(poštna številka, ime pošte)",
      req.phone,
      "(telefonska številka)",
    ],
  ];
  for (const [left, leftLabel, right, rightLabel] of rows) {
    field(page, regular, left, leftLabel, MARGIN, y, leftW);
    field(page, regular, right, rightLabel, rightX, y, rightW);
    y -= 44;
  }

  y -= 20;
  centered(page, bold, "ZAHTEVA", y, 11);
  y -= 15;
  centered(page, bold, "za namenitev dela dohodnine za donacije", y, 11);
  y -= 36;

  page.drawText("upravičencu:", { x: MARGIN, y, size: 10, font: bold });
  y -= 8;
  y = table(page, regular, bold, y, [
    "Ime oziroma naziv upravičenca",
    "Davčna številka upravičenca",
    "Odstotek (%)",
  ], [[RECIPIENT.name, RECIPIENT.taxNumber, req.percent]], 5);

  y -= 24;
  page.drawText("šolskemu skladu oziroma skladu vrtca:", {
    x: MARGIN,
    y,
    size: 10,
    font: bold,
  });
  y -= 8;
  y = table(page, regular, bold, y, [
    "Ime oziroma naziv šolskega sklada ali sklada vrtca",
    "Davčna številka šolskega sklada",
    "Odstotek (%)",
  ], [], 3);

  y -= 40;
  page.drawText(`V/Na ${req.place}, dne ${date}`, {
    x: MARGIN,
    y,
    size: 10,
    font: regular,
  });

  // Signature sits on the line, scaled to fit a fixed box.
  const sigLineY = y - 50;
  const sigX = PAGE_W - MARGIN - 200;
  const png = await doc.embedPng(req.signature);
  const scale = Math.min(200 / png.width, 70 / png.height);
  page.drawImage(png, {
    x: sigX + (200 - png.width * scale) / 2,
    y: sigLineY + 2,
    width: png.width * scale,
    height: png.height * scale,
  });
  page.drawLine({
    start: { x: sigX, y: sigLineY },
    end: { x: sigX + 200, y: sigLineY },
    thickness: 0.6,
    color: INK,
  });
  const sigLabel = "podpis zavezanca/ke";
  page.drawText(sigLabel, {
    x: sigX + (200 - regular.widthOfTextAtSize(sigLabel, 9)) / 2,
    y: sigLineY - 12,
    size: 9,
    font: regular,
  });

  page.drawText(
    "Zahtevek je bil izpolnjen in podpisan na spletni strani kkljubljana.com.",
    { x: MARGIN, y: 40, size: 7, font: regular, color: GREY },
  );

  return doc.save();
}

function field(
  page: PDFPage,
  font: PDFFont,
  value: string,
  label: string,
  x: number,
  y: number,
  width: number,
) {
  page.drawText(fit(font, value, 10, width), { x: x + 2, y: y + 4, size: 10, font });
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 0.6,
    color: INK,
  });
  page.drawText(label, { x, y: y - 10, size: 7, font, color: GREY });
}

function centered(page: PDFPage, font: PDFFont, text: string, y: number, size: number) {
  page.drawText(text, {
    x: (PAGE_W - font.widthOfTextAtSize(text, size)) / 2,
    y,
    size,
    font,
  });
}

/** Header row in dark fill, then `rowCount` ruled rows, the first ones filled. */
function table(
  page: PDFPage,
  font: PDFFont,
  bold: PDFFont,
  top: number,
  headers: [string, string, string],
  filled: string[][],
  rowCount: number,
) {
  const cols = [CONTENT_W * 0.5, CONTENT_W * 0.3, CONTENT_W * 0.2];
  const headerH = 32;
  const rowH = 18;

  page.drawRectangle({
    x: MARGIN,
    y: top - headerH,
    width: CONTENT_W,
    height: headerH,
    color: HEADER_FILL,
  });
  let x = MARGIN;
  headers.forEach((h, i) => {
    const lines = wrap(bold, h, 8.5, cols[i] - 10);
    lines.forEach((line, li) => {
      page.drawText(line, {
        x: x + (cols[i] - bold.widthOfTextAtSize(line, 8.5)) / 2,
        y: top - headerH / 2 + (lines.length - 1) * 5 - li * 10 - 3,
        size: 8.5,
        font: bold,
        color: WHITE,
      });
    });
    x += cols[i];
  });

  let y = top - headerH;
  for (let r = 0; r < rowCount; r++) {
    const rowTop = y;
    y -= rowH;
    page.drawRectangle({
      x: MARGIN,
      y,
      width: CONTENT_W,
      height: rowH,
      borderColor: INK,
      borderWidth: 0.5,
    });
    let cx = MARGIN;
    cols.forEach((w, i) => {
      if (i > 0)
        page.drawLine({
          start: { x: cx, y },
          end: { x: cx, y: rowTop },
          thickness: 0.5,
          color: INK,
        });
      const value = filled[r]?.[i];
      if (value)
        page.drawText(fit(font, value, 9.5, w - 8), {
          x: cx + 4,
          y: y + 5,
          size: 9.5,
          font,
        });
      cx += w;
    });
  }
  return y;
}

function wrap(font: PDFFont, text: string, size: number, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(next, size) > width) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Shrinks overlong values with an ellipsis rather than overrunning the line. */
function fit(font: PDFFont, text: string, size: number, width: number) {
  if (font.widthOfTextAtSize(text, size) <= width) return text;
  let out = text;
  while (out && font.widthOfTextAtSize(`${out}…`, size) > width)
    out = out.slice(0, -1);
  return `${out}…`;
}
