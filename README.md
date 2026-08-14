# Mivama UI Showcase

Interactive component catalog and compatibility testbed for [`@mivama/ui`](https://github.com/mivama-digital/ui). The showcase is intentionally separate from product applications so UI changes can be reviewed in isolation before consumers adopt them.

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`@mivama/ui` is installed directly from the `main` branch of `mivama-digital/ui`. The lockfile pins the exact verified commit used by a checkout, while the scheduled sync workflow refreshes that lock against the latest `ui/main` state every six hours.

To refresh it manually:

```bash
npm update @mivama/ui --package-lock-only --ignore-scripts
npm ci
npm run verify
```

## Component pages

The catalog is split into focused routes for themes, actions, content, feedback, forms, navigation, dialogs, sheets, attachments, and layout primitives. Current previews include the newer Choice, Field, Select, BentoGrid, Container, EditorialGrid, ScrollScene, Section, and standalone Tooltip families in addition to the existing component coverage.

The `check:ui-coverage` gate reads the exports from the installed `@mivama/ui` package and scans the showcase routes for each visual component family's primary import. Adding a new visual export to `ui` therefore makes CI fail until a representative showcase preview is added.

Use the header control to inspect the catalog in light and dark themes.

## Checks

```bash
npm run lint
npm run typecheck
npm run check:ui-coverage
npm run doctor
npm run build
npm run test:e2e
```

Run the complete functional and accessibility gate with `npm run verify` (lint, typecheck, UI export coverage, react-doctor, build, e2e). Visual snapshots are intentionally reviewed separately with `npm run test:visual`; update approved baselines with `npm run test:visual -- --update-snapshots`.

The browser checks cover every route in both themes, opened overlay states, Axe accessibility rules, focus trapping, keyboard behavior, and 320 px overflow. Chromium and Firefox run locally. WebKit is configured for CI and can be enabled explicitly with `PLAYWRIGHT_WEBKIT=1`; its Linux system dependencies must be installed first. Visual tests run against a production build and keep Chromium baselines.

## UI synchronization

Two GitHub Actions workflows keep the repository aligned with `mivama-digital/ui`:

- `CI` runs the full showcase verification for pull requests and pushes to `main`.
- `Sync latest Mivama UI` checks `ui/main` every six hours. When the resolved UI commit changes, it refreshes `package-lock.json`, installs the new graph, runs lint, typecheck, react-doctor, and a production build, and only then commits the verified lock update to `main`.

This keeps normal installs reproducible while removing the old requirement for a sibling `mivama-ui-3.0.0.tgz` file.

## Deployment

`https://ui.kamidzu.com` laeuft aktuell als Entwicklungs-Deployment mit Hot Reload: das systemd-User-Unit `mivama-ui-showcase-dev.service` startet `next dev -p 8300 -H 127.0.0.1` (Build-Cache unter `.next-dev`), nginx leitet die Domain an diesen Port weiter. Aenderungen an `app/` sind ohne Neustart live; die Domain ist per Basic Auth geschuetzt.

```bash
systemctl --user enable --now mivama-ui-showcase-dev
systemctl --user status mivama-ui-showcase-dev
journalctl --user -u mivama-ui-showcase-dev -f
```

Das Docker-Image (`docker-compose.prod.yml`, Container `mivama-ui-showcase` auf `127.0.0.1:8300`) ist die alternativ moegliche Produktionsausfuehrung. Der Dependency-Layer verwendet `npm ci` ohne `--ignore-scripts`, damit das `prepare`-Build der Git-basierten `@mivama/ui`-Abhaengigkeit ausgefuehrt wird. Beim Wechsel zurueck auf Produktion zuerst den Dev-Dienst stoppen, damit kein `next dev`-Prozess auf dem Port laeuft:

```bash
systemctl --user stop mivama-ui-showcase-dev
docker compose -f docker-compose.prod.yml up -d --build
```

Die Nginx-Virtual-Host-Vorlage liegt unter `deploy/ui.kamidzu.com.nginx.conf`.
