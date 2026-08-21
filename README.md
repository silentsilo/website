# silentsilo.website

The site at [silentsilo.com](https://silentsilo.com), for
[SilentSilo](https://github.com/silentsilo/desktop): a local-first,
end-to-end encrypted vault for files and passwords.

Next.js, exported to plain static files. `npm run build` writes `out/`, which
any static host or CDN serves as is. There is no server runtime, no database
and no build step at request time.

## Licence

Two different things live in this repository, under two different terms.

**The code is MIT.** See [LICENSE](LICENSE). Read it, copy it, build on it.

**The brand and the content are not.** Excluded from that licence, and
remaining the property of Software Hive S.R.L.:

- the name **SilentSilo** and the logo in `public/icon.svg`
- the screenshots in `public/shots/` and the card in `public/og.png`
- the text of the pages, wherever it appears in `app/`

You may fork this and make a site of your own from it. You may not publish it,
or anything that resembles it, as SilentSilo. That line exists because people
download an encrypted vault from this site, and a convincing copy of it is a
convincing way to hand them something else.

## Dev

```bash
npm install
npm run dev
npm run build   # static export into out/
```

## Deployment

Everything about shipping the site lives in `deploy/`. Pushing to `main`
builds a Docker image, pushes it to `ghcr.io/silentsilo/website`, and calls a
Coolify webhook to roll it out.

The image is nginx plus the exported files. No Node reaches production, so
there is no application runtime to patch and nothing to exploit but a file
server. `deploy/security-headers.conf` carries the content policy, which is
the privacy page's promise enforced rather than asserted.

Two repository secrets drive the rollout, and the build simply skips it when
they are absent: `COOLIFY_WEBHOOKS`, comma separated for several targets, and
`COOLIFY_API_TOKEN`.

To build and run it the way production does:

```bash
docker build -f deploy/Dockerfile -t silentsilo-website .
```

## Screenshots

`public/shots/` holds what the landing page shows. They are not made here:
`scripts/screenshots.mjs` in the desktop repository drives the app's own mock
backend and writes them into its `docs/screenshots/`, and the ones this site
uses are copied from there. The page above them says they are from the current
build, and taking them any other way is how that stops being true.

The social card is `public/og.png`, drawn by `scripts/og-image.mjs`. Change
the script, run `npm run og`, commit the result.

## Keeping the pages true

The site states things that can quietly stop being true. These are the ones
that matter, and each is one commit away from being wrong:

- **`/security`** summarises `docs/CRYPTO.md` in the desktop repository. When
  the two disagree, CRYPTO.md is right and this site is wrong.
- **`/privacy`** claims no cookies, no analytics and no third-party requests.
  The font ships from this domain for that reason. Anything external added
  here changes that page in the same commit.
- **The app is free in full**, with no paid tier and no licence key. An
  app-side paid tier would contradict it, and several pages would change that
  day.
