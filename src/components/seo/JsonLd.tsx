interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renderiza um bloco <script type="application/ld+json"> para Schema.org.
 * Deve ser usado exclusivamente em Server Components ou layouts de servidor.
 */
export default function JsonLd({ data }: JsonLdProps) {
  // Previne que strings contendo "</script>" quebrem o documento HTML
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
