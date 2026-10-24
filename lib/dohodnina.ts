/**
 * Namenitev dela dohodnine (obrazec Doh-Don).
 *
 * Shared by the form on /dohodnina and the API route that turns a submission
 * into a filled-in, signed copy of the official FURS form. The club receives it
 * by e-mail, prints it and posts it to FURS before 31 December.
 */

/**
 * Recipient as it must appear on the form. The tax number has to match the
 * club's entry on the FURS list of upravičenci, or FURS discards the request.
 */
export const RECIPIENT = {
  name: "Karate klub Ljubljana",
  taxNumber: "52316173",
} as const;

/** Last day a request counts for the current tax year. */
export function deadlineFor(now = new Date()) {
  return `31. 12. ${now.getFullYear()}`;
}

/** FURS accepts tenths of a percent, at most 1 % across all recipients. */
export const PERCENT_OPTIONS = [
  "1,0",
  "0,9",
  "0,8",
  "0,7",
  "0,6",
  "0,5",
  "0,4",
  "0,3",
  "0,2",
  "0,1",
] as const;

export type Percent = (typeof PERCENT_OPTIONS)[number];

export type DohodninaRequest = {
  firstName: string;
  lastName: string;
  taxNumber: string;
  street: string;
  postalCode: string;
  postName: string;
  email: string;
  phone: string;
  percent: Percent;
  place: string;
  /** PNG data URL from the signature pad. */
  signature: string;
  consent: boolean;
};

/** Slovenian tax numbers are 8 digits with a mod-11 check digit. */
export function isValidTaxNumber(value: string) {
  if (!/^[1-9]\d{7}$/.test(value)) return false;
  const digits = value.split("").map(Number);
  const sum = digits
    .slice(0, 7)
    .reduce((acc, d, i) => acc + d * (8 - i), 0);
  const check = 11 - (sum % 11);
  if (check === 11) return false;
  return (check === 10 ? 0 : check) === digits[7];
}

const SIGNATURE_PREFIX = "data:image/png;base64,";
/** A drawn signature is a few tens of KB; anything far bigger is not one. */
const SIGNATURE_MAX_LENGTH = 1_500_000;

/** Field name → message, in the language the form is shown in. */
export type FieldErrors = Partial<Record<keyof DohodninaRequest, string>>;

const clean = (v: unknown, max = 120) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";

/**
 * Normalises raw input and checks it. Runs in the browser for instant feedback
 * and again on the server, which is the check that counts.
 */
export function parseRequest(raw: Record<string, unknown>): {
  data: DohodninaRequest;
  errors: FieldErrors;
} {
  const data: DohodninaRequest = {
    firstName: clean(raw.firstName, 60),
    lastName: clean(raw.lastName, 60),
    taxNumber: clean(raw.taxNumber, 20).replace(/\s/g, ""),
    street: clean(raw.street),
    postalCode: clean(raw.postalCode, 10).replace(/\s/g, ""),
    postName: clean(raw.postName, 60),
    email: clean(raw.email),
    phone: clean(raw.phone, 30),
    percent: PERCENT_OPTIONS.includes(raw.percent as Percent)
      ? (raw.percent as Percent)
      : "1,0",
    place: clean(raw.place, 60),
    signature: typeof raw.signature === "string" ? raw.signature : "",
    consent: raw.consent === true,
  };

  const errors: FieldErrors = {};
  if (!data.firstName) errors.firstName = "Vpišite ime.";
  if (!data.lastName) errors.lastName = "Vpišite priimek.";
  if (!isValidTaxNumber(data.taxNumber))
    errors.taxNumber = "Davčna številka ima 8 števk. Preverite jo.";
  if (!data.street) errors.street = "Vpišite naslov.";
  if (!/^\d{4}$/.test(data.postalCode))
    errors.postalCode = "Poštna številka ima 4 števke.";
  if (!data.postName) errors.postName = "Vpišite ime pošte.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "E-poštni naslov ni pravilen.";
  if (!data.place) errors.place = "Vpišite kraj podpisa.";
  if (
    !data.signature.startsWith(SIGNATURE_PREFIX) ||
    data.signature.length > SIGNATURE_MAX_LENGTH
  )
    errors.signature = "Podpišite se v okvir.";
  if (!data.consent) errors.consent = "Potrdite, da so podatki pravilni.";

  return { data, errors };
}

/** Today's date as written on the form, in the club's time zone. */
export function formatDate(now = new Date()) {
  return new Intl.DateTimeFormat("sl-SI", {
    timeZone: "Europe/Ljubljana",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(now);
}
