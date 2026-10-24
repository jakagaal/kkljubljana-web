"use client";

import { useCallback, useState, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";
import {
  deadlineFor,
  parseRequest,
  PERCENT_OPTIONS,
  RECIPIENT,
  type FieldErrors,
} from "@/lib/dohodnina";
import { ArrowRight } from "@/components/ui/Icons";
import { SignaturePad } from "./SignaturePad";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "done"; pdfUrl: string; filename: string }
  | { state: "error"; message: string };

export function DohodninaForm({ privacyHref }: { privacyHref: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [signature, setSignature] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const onSignature = useCallback((v: string) => setSignature(v), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = {
      ...Object.fromEntries(form),
      consent: form.get("consent") === "on",
      signature,
    };

    const { errors: found } = parseRequest(raw);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document
        .getElementById(`f-${first}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/dohodnina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body.errors) setErrors(body.errors);
        setStatus({
          state: "error",
          message: body.error ?? "Preverite označena polja.",
        });
        return;
      }
      const blob = await res.blob();
      const filename =
        res.headers
          .get("Content-Disposition")
          ?.match(/filename="(.+)"/)?.[1] ?? "dohodnina.pdf";
      setStatus({ state: "done", pdfUrl: URL.createObjectURL(blob), filename });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus({
        state: "error",
        message: "Ni povezave. Preverite internet in poskusite znova.",
      });
    }
  }

  if (status.state === "done") {
    return (
      <div className="border border-ink/15 bg-paper p-8 md:p-12">
        <span className="label text-blood">/ Oddano</span>
        <h2 className="display text-4xl md:text-5xl mt-4 leading-[0.95]">
          Hvala za vašo podporo!
        </h2>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-ink/75 max-w-2xl">
          Vaš podpisan zahtevek smo prejeli. V klubu ga bomo do{" "}
          {deadlineFor()} posredovali na FURS. Zahtevek velja tudi za
          naslednja leta, dokler ga ne spremenite ali prekličete.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-ink/75 max-w-2xl">
          Povabite k sodelovanju še partnerja, stare starše in prijatelje.
          Vsak lahko nameni svoj 1 %.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={status.pdfUrl}
            download={status.filename}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 label border border-ink hover:bg-ink hover:text-bone transition-colors"
          >
            Prenesi kopijo (PDF)
          </a>
          <button
            type="button"
            onClick={() => {
              setSignature("");
              setStatus({ state: "idle" });
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 label bg-blood text-bone hover:bg-blood-deep transition-colors"
          >
            Izpolni za drugo osebo
          </button>
        </div>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={submit} noValidate className="space-y-12">
      <Fieldset number="01" title="Vaši podatki">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="firstName" label="Ime" error={errors.firstName} autoComplete="given-name" />
          <Field name="lastName" label="Priimek" error={errors.lastName} autoComplete="family-name" />
          <Field
            name="taxNumber"
            label="Davčna številka"
            error={errors.taxNumber}
            inputMode="numeric"
            maxLength={8}
            hint="8 števk, najdete jo na odločbi o dohodnini."
            className="sm:col-span-2"
          />
          <Field
            name="street"
            label="Naselje, ulica in hišna številka"
            error={errors.street}
            autoComplete="street-address"
            className="sm:col-span-2"
          />
          <Field
            name="postalCode"
            label="Poštna številka"
            error={errors.postalCode}
            inputMode="numeric"
            maxLength={4}
            autoComplete="postal-code"
          />
          <Field name="postName" label="Pošta" error={errors.postName} autoComplete="address-level2" />
          <Field
            name="email"
            label="E-pošta"
            optional
            type="email"
            error={errors.email}
            autoComplete="email"
          />
          <Field name="phone" label="Telefon" optional type="tel" error={errors.phone} autoComplete="tel" />
        </div>
      </Fieldset>

      <Fieldset number="02" title="Upravičenec">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-5 items-end">
          <ReadOnly label="Naziv" value={RECIPIENT.name} />
          <ReadOnly label="Davčna številka" value={RECIPIENT.taxNumber} mono />
          <label className="block">
            <span className="label text-ink/70 block mb-2">Odstotek</span>
            <select
              name="percent"
              defaultValue="1,0"
              className="w-full sm:w-32 bg-paper border border-ink/30 px-4 py-3.5 text-base focus:border-ink focus:outline-none"
            >
              {PERCENT_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p} %
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/60 max-w-2xl">
          Skupaj lahko namenite največ 1 %. Nov zahtevek nadomesti prejšnjega,
          zato če že podpirate druge organizacije in jih želite obdržati,
          zahtevek raje oddajte prek eDavkov.
        </p>
      </Fieldset>

      <Fieldset number="03" title="Kraj in podpis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="place" label="Kraj podpisa" error={errors.place} placeholder="npr. Ljubljana" />
        </div>
        <div id="f-signature" className="mt-6">
          <span className="label text-ink/70 block mb-2">Vaš podpis</span>
          <SignaturePad onChange={onSignature} invalid={!!errors.signature} />
          <FieldError message={errors.signature} />
        </div>
      </Fieldset>

      {/* Hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Spletna stran
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div id="f-consent">
        <label className="flex gap-3 items-start cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-blood)]"
          />
          <span className="text-base leading-relaxed text-ink/80">
            Potrjujem, da so podatki pravilni, in želim nameniti del dohodnine{" "}
            {RECIPIENT.name}. Klub bo podpisan obrazec posredoval na FURS.
            Prebral/a sem{" "}
            <a
              href={privacyHref}
              target="_blank"
              className="text-blood underline decoration-blood/40 underline-offset-4 hover:decoration-blood"
            >
              kako ravnamo z vašimi podatki
            </a>
            .
          </span>
        </label>
        <FieldError message={errors.consent} />
      </div>

      {status.state === "error" ? (
        <p role="alert" className="border-l-2 border-blood pl-4 text-blood">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-5 label bg-blood text-bone border border-blood hover:bg-blood-deep hover:border-blood-deep transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {sending ? "Pošiljam…" : "Oddaj zahtevek"}
        {sending ? null : (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        )}
      </button>
    </form>
  );
}

function Fieldset({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-4 mb-6">
        <span className="label text-blood">/ {number}</span>
        <span className="h-px w-8 bg-ink/20" />
        <span className="display text-2xl md:text-3xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

function Field({
  name,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: FieldProps) {
  return (
    <label id={`f-${name}`} className={clsx("block", className)}>
      <span className="label text-ink/70 block mb-2">
        {label}
        {optional ? <span className="text-ink/40"> (neobvezno)</span> : null}
      </span>
      <input
        name={name}
        aria-invalid={!!error}
        className={clsx(
          "w-full bg-paper border px-4 py-3.5 text-base focus:outline-none transition-colors",
          error ? "border-blood" : "border-ink/30 focus:border-ink",
        )}
        {...props}
      />
      {hint && !error ? (
        <span className="mt-2 block text-sm text-ink/50">{hint}</span>
      ) : null}
      <FieldError message={error} />
    </label>
  );
}

function ReadOnly({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <span className="label text-ink/70 block mb-2">{label}</span>
      <div
        className={clsx(
          "border border-ink/15 bg-mist px-4 py-3.5 text-base",
          mono && "font-mono tracking-wider",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <span role="alert" className="mt-2 block text-sm text-blood">
      {message}
    </span>
  ) : null;
}
