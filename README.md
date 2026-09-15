# Healthcare portfolio

Humayun Naseer's healthcare technology consultancy portfolio. The application lives in this folder; shared strategy, design guidance, and ui-ux-pro-max are in the parent workspace.

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5180. Node 20.18.3 was used for verification. The server binds to the local machine only.

```sh
npm run build
npm test
npm run preview
```

The build checks TypeScript, produces optimized assets, and pre-renders seven routes. Preview uses port 5180, so stop the dev server before running it. No deployment is configured or performed.

## Routes

- `/`: healthcare consultancy homepage
- `/work/neuronest/`, `/work/learnme/`, `/work/reactneuro/`: case studies
- `/contact/`: consultation inquiry
- `/privacy/`: privacy notice
- `/404/` and generated `404.html`: not-found page

All routes contain page-specific HTML and metadata before JavaScript runs. Native links make the public pages readable and navigable without client-side routing. Interactive role previews and the inquiry form are progressively hydrated with React.

## Contact behavior

By default the form validates input and prepares an email draft addressed to `humayunnaseer5@gmail.com`. The visitor reviews and sends it from their own email application. The page explicitly distinguishes preparing a draft from sending a message. It does not store submitted information or display a false delivery confirmation.

For direct sending, create `.env.local` using `.env.example` and supply all three EmailJS public identifiers. Confirm the intended service, recipient, and allowed domains in the EmailJS account. The template receives `name`, `email`, `reply_to`, `subject`, `message`, and `time`. Keep private credentials out of VITE-prefixed variables. Rebuild after configuration changes. The privacy page reflects the chosen delivery mode.

The UI handles invalid input, loading, success, failed delivery, retry, and direct-email fallback. Automated tests use synthetic input and never send email. Actual delivery and EmailJS provider settings have not been verified because no service configuration was supplied for this new site.

## Content and assets

Edit `src/content/site.ts` for project narratives, profile details, and FAQ content. Homepage service and process copy lives in `src/components/Home.tsx`. The case-study template separates whole-product capabilities from individual contributions. No invented outcomes, customer counts, testimonials, or compliance badges are included.

Product graphics are custom responsive interface/architecture illustrations with synthetic content and visible captions. They are not screenshots of shipped client products. The original authentic portrait was converted to an approximately 83 KB JPEG; fonts are bundled locally under their included open-source licenses.

## Deployment preparation

Set `VITE_SITE_URL` to the real HTTPS origin before building to include canonical URLs, Open Graph URLs, and a sitemap. The current build deliberately has no invented production URL. It targets a domain root (`base: '/'`). Serve `dist/` as static files with directory index support and use `404.html` as the host's not-found page. Do not configure a blanket SPA rewrite to the homepage; each route already has its own HTML.

If a subdirectory deployment is required, update both the asset base and site links before publishing. The original P-F gh-pages deployment is unrelated and has not been reused. Configure any delivery provider's domain restrictions for the final hostname. Optional request logs are the responsibility of the chosen host; the application contains no analytics or advertising integrations.

## Verification

`npm test` checks pre-rendered routes and metadata, internal links and assets, contact validation and email-draft encoding, and core text/action color contrast. Browser review covers the role preview, mobile menu, case-study navigation, FAQ, form errors and focus, and responsive layout. No live inquiry is sent during automated verification.

Only the portfolio source and lockfile should be tracked. Dependencies, generated build output, environment values, and local caches are ignored by the parent workspace.
