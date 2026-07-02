# ParagraphCMS React Router Advanced

Ten README jest krótką dokumentacją projektu ParagraphCMS dla przykładu React Router Advanced. Projekt rozwija framework-mode blog o lokalizowane trasy, przełączanie locale, prerendering, RSS, `sitemap.xml`, `robots.txt`, `llms.txt` oraz integrację `@paragraphcms/seo`.

Oficjalny kontekst: [ParagraphCMS React Router Advanced](https://paragraphcms.com/docs/advanced/react-router).

## Konfiguracja

1. Skopiuj `.env.example` do `.env`.
2. Ustaw `PARAGRAPH_API_KEY` kluczem API z ParagraphCMS.
3. W ParagraphCMS utwórz kolekcję `blog`, jeśli korzystasz z domyślnej mapy tras.
4. Zmień `site.url` w `paragraph.config.ts` na produkcyjną domenę.

## Uruchomienie

```bash
pnpm install
pnpm dev
```

Build i start produkcyjny:

```bash
pnpm build
pnpm start
```

## Najważniejsze pliki

- `paragraph.config.ts` - klient ParagraphCMS i konfiguracja SEO.
- `react-router.config.ts` - SSR oraz prerendering wszystkich znanych tras.
- `app/routes/blog*.tsx` - domyślne trasy bloga i RSS.
- `app/routes/locale*.tsx` - lokalizowane trasy bloga.
- `app/routes/sitemap.xml.ts`, `robots.txt.ts`, `llms.txt.ts` - generowane dokumenty SEO.
