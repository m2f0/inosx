# Spanish release 4.5.0

Scope: institutional landing page, internal product catalog, ROI calculator, Store links, Terms and Privacy. External product sites and source-language videos/PDFs are unchanged.

- URL lang parameter takes precedence over saved/browser language.
- Locale switches preserve path, unrelated query parameters and hash.
- Internal HTML links preserve locale; downloads and external URLs are excluded.
- Legal EN/ES dictionaries mirror the 35 existing Terms blocks and 43 Privacy blocks without policy changes; effective date remains September 3, 2026.
- Whitepaper UI and industries translated; no live lead submission performed.

Validation: i18n validation passed; syntax checked for all inline and shared scripts; browser verified landing ES, industries, EN/ES switch with query+hash, catalog PT/ES switch preserving #datagpt, ROI ES, legal ES and return to EN. Root design audit still reports the same 11 pre-existing findings.
