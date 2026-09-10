/**
 * Emits a JSON-LD block. Kept in one place so escaping is handled once.
 *
 * `<` is escaped because a literal "</script>" anywhere in the data would
 * otherwise close the tag early and break the page.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
