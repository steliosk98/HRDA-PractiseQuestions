# HRDA Quiz App

Live site: https://steliosk98.github.io/HRDA-PractiseQuestions/

An interactive React quiz app for practicing HRDA examination questions.

## Tech Stack

- React 19
- Vite
- Tailwind CSS 3

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production output is written to `dist/`.

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. Open `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or rerun the latest workflow.
5. Wait for the `Deploy to GitHub Pages` workflow to finish.

The workflow builds the Vite app, uploads the `dist/` artifact, and deploys it with the official GitHub Pages actions.

## Content

- `public/mcq.json`: multiple choice questions
- `public/truefalse.json`: true/false questions

## Troubleshooting

- If dependencies are missing, run `npm install`.
- If the local build fails, confirm you are using Node.js 18 or newer.
- If Pages shows an old version, rerun the latest GitHub Actions deployment after the `main` branch is updated.
