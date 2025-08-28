## Running the project

### Requirements

- Node.js >= 18.18 (recommended 20 LTS)
- npm >= 9

### Quick start

```sh
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production build

```sh
npm run build
npm run start
```

---

## Localization (Lingui)

The project uses Lingui for i18n. Translation catalogs are located in `src/locales`.

### Extract and compile locales

- Extract new/updated keys from code into `.po` files:

```sh
npm run lingui:extract
```

- Compile catalogs for runtime:

```sh
npm run lingui:compile
```

After running these commands, updated translations will be in `src/locales` (including compiled `.js`).

Tip for usage in code: use `<Trans />` in JSX and `t(i18n)`...`` for strings.

---

## Useful scripts

- Local development: `npm run dev`
- Build: `npm run build`
- Production server: `npm run start`
- Lint: `npm run lint`
- Format: `npm run format`
- Extract locales: `npm run lingui:extract`
- Compile locales: `npm run lingui:compile`

---

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Lingui v5 (`@lingui/core`, `@lingui/macro`, `@lingui/react`)
- CSS Modules
- ESLint + Prettier
- React Hook Form + `@hookform/resolvers` + Yup
- `classnames`

---

## Quiz data model tips

- **Conditional flow**: Each quiz item can define `transitions` that depend on the user’s answer and determine the next question. Example (conceptual):

```ts
{
  id: 'qt1',
  type: 'tile',
  question: 'Select your <gender>',
  options: [...],
  transitions: [
    { to: 'q1f', when: { equals: 'female' } },
    { to: 'q1m', when: { equals: 'male' } },
    { to: 'q1o', when: { equals: 'other' } },
  ],
}
```

- **Highlight words in questions**: You can highlight parts of a question by wrapping them in angle brackets `<>`. At render time the marked part is wrapped in a tag (currently `<mark>`), while exports (CSV/email) strip the brackets:

```txt
Select your <gender>
What do you <hate> the most in a book?
```

The UI will render the highlighted word with emphasis, but CSV and email outputs will contain plain text without `<>`.
