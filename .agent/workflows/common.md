# Common Workflows

## Starting Development Server

```bash
cd /Users/sehwanlee/Documents/Coding/06\ Wiseup/wiseup
npm run dev
```

Server runs at: http://localhost:4321

## Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Import global styles: `import '../styles/global.css';`
3. Add bilingual support with `data-ko` and `data-en` attributes
4. Add language switcher component if needed

## Modifying Styles

- Global styles: `src/styles/global.css`
- Page-specific styles: Use `<style>` tag within the `.astro` file
- Tailwind utilities are available via `@apply`
- Custom colors defined in `@theme` block in global.css

## Adding New Color

1. Add to `@theme` block in `global.css`:
   ```css
   --color-newcolor: #hexcode;
   ```
2. Use as Tailwind class: `text-newcolor`, `bg-newcolor`

## Bilingual Text

For simple text:

```html
<span data-ko="한국어" data-en="English">English</span>
```

For HTML content:

```html
<span data-html-ko="<span>한국어</span>" data-html-en="<span>English</span>">
  <span>English</span>
</span>
```

## Building for Production

```bash
npm run build
npm run preview  # to test
```
