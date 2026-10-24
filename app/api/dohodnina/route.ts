import { NextResponse } from "next/server";
import { EMAIL } from "@/lib/data";
import { formatDate, parseRequest, RECIPIENT } from "@/lib/dohodnina";
import { buildDohodninaPdf } from "@/lib/dohodnina-pdf";

// pdf-lib and the font files need Node, not the edge runtime.
export const runtime = "nodejs";

/**
 * Receives a signed 1 % request, renders it onto the Doh-Don form and e-mails
 * the PDF to the club, which posts it to FURS. Responds with the same PDF so
 * the taxpayer can keep a copy.
 *
 * Mail goes through Resend. Set in Vercel:
 *   RESEND_API_KEY   API key
 *   DOHODNINA_FROM   sender on a verified domain, e.g. "KK Ljubljana <obrazci@kkljubljana.com>"
 *   DOHODNINA_TO     optional, defaults to the club address
 * Without a key, local development skips the e-mail and only returns the PDF.
 */
export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Neveljaven zahtevek." }, { status: 400 });
  }

  // Honeypot: people never see this field, form-filling bots do.
  if (typeof raw.website === "string" && raw.website !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = parseRequest(raw);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const date = formatDate();
  let pdf: Uint8Array;
  try {
    pdf = await buildDohodninaPdf(data, date);
  } catch (err) {
    console.error("dohodnina: PDF failed", err);
    return NextResponse.json(
      { error: "Obrazca ni bilo mogoče pripraviti. Poskusite znova." },
      { status: 500 },
    );
  }

  const filename = `dohodnina-${data.lastName}-${data.firstName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-");

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.DOHODNINA_FROM,
        to: process.env.DOHODNINA_TO || EMAIL,
        reply_to: data.email || undefined,
        subject: `1 % dohodnine: ${data.firstName} ${data.lastName}`,
        text: [
          `Nov zahtevek za namenitev ${data.percent} % dohodnine ${RECIPIENT.name}.`,
          "",
          `Zavezanec: ${data.firstName} ${data.lastName}`,
          `Naslov: ${data.street}, ${data.postalCode} ${data.postName}`,
          `E-pošta: ${data.email || "—"}`,
          `Telefon: ${data.phone || "—"}`,
          `Podpisano: ${data.place}, ${date}`,
          "",
          "Podpisan obrazec Doh-Don je v prilogi. Natisnite ga in pošljite na FURS do 31. decembra.",
        ].join("\n"),
        attachments: [
          {
            filename: `${filename}.pdf`,
            content: Buffer.from(pdf).toString("base64"),
          },
        ],
      }),
    });
    if (!res.ok) {
      console.error("dohodnina: e-mail failed", res.status, await res.text());
      return NextResponse.json(
        {
          error:
            "Zahtevka ni bilo mogoče poslati. Poskusite znova ali nam pišite.",
        },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("dohodnina: RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Oddaja trenutno ne deluje. Prosimo, pišite nam." },
      { status: 503 },
    );
  } else {
    console.warn("dohodnina: RESEND_API_KEY not set, e-mail skipped");
  }

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
