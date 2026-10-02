# Sam McFarland — Projects

A minimal, responsive portfolio: five project cards categorized by technical area, with direct demo links. Plain HTML and CSS, with bold Space Grotesk typography. No JavaScript or runtime dependencies.

## Preview

Open `index.html` directly, or run `npm run dev` and visit **http://localhost:3000**. For a different port, use `PORT=3001 npm run dev`.

## Edit

- Project names and demo links: `index.html`.
- Fonts, colors, and spacing: `styles.css` (font loading is in `index.html`).
- Resume: `public/Sam_McFarland_Resume.pdf`.
- SpectrumIQ photo: `public/spectrumiq.jpg`. It sits on the right side of the card on desktop and below the links on mobile. CSS crops it to fit while preserving its proportions.

The original `Sam_McFarland_Resume.pdf` in the repository root is ignored by Git. The copy in `public/` stays tracked so deployments can include the Resume download.

The technical categories are Mobile / iOS (Scramble), Full-Stack Web AI Dev Tool (Ancori), Chrome Extension (OneTap), Full-Stack Web (WolfTrade), and Algorithms / Optimization / Bidding and Auctions (SpectrumIQ).

Ancori, OneTap, and WolfTrade demo URLs come from the resume. Scramble links to the supplied TestFlight invitation. SpectrumIQ includes the two supplied LinkedIn posts; it has no public demo.

Google Fonts loads Space Grotesk when online. Local font fallbacks are included.

## Build

Run `npm run build` and upload the contents of `dist/` to any static host. No backend or environment variables are required.

## Vercel

Import the GitHub repository into Vercel with the repository root as the Root Directory. The included `vercel.json` selects the Other framework preset, runs `npm run build`, and publishes `dist/`.

Keep the Output Directory set to `dist`, not `public`. The `public/` folder contains only the resume; the generated homepage is `dist/index.html`.

For an existing project, the configuration takes effect on its next deployment. If needed, use the latest deployment's Redeploy action and ensure it uses the commit containing `vercel.json`.
