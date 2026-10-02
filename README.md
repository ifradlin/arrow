# ARROW project website

Static project page for **ARROW: Arbitrary Reconstruction and Tracking of 4D
Observations in the Wild**. No application server or build step is required
to run the source website.

## Local setup

Connect the media storage, then serve the page over HTTP:

```sh
ln -s /path/to/arrow-assets assets
npx http-server . -p 3000 -c-1
```

To preview a release, replace `.` with `dist`. Python is a fallback:

```sh
python3 -m http.server 3000
```

Formatting settings are in `.prettierrc.json`; choose Prettier in your editor
to apply them consistently.

## Release

Run `npm ci`, then `npm run build` to bundle the website into `dist/`. The build
loads assets from `https://ifradlin.github.io/storage/arrow/assets/` by default;
no local asset directory is needed. Rebuilding safely replaces the previous
output. Use `--out <directory>` to choose another output directory.

To load assets from a different server:

```sh
npm run build -- --asset-base https://example.org/arrow/assets/
```

This rewrites image, video and viewer URLs and skips copying local assets.
`ASSET_BASE_URL` can also supply the URL. The asset server must allow cross-origin
requests for viewer data and images.

For a self-contained build with local assets, use `npm run build -- --asset-base ''`.
Add `--no-assets` to keep relative URLs without copying the assets.

The website's media is stored in the
[ARROW assets release](https://github.com/ifradlin/storage/releases/tag/arrow-assets-2026-10-02)
as `arrow-assets.tar.gz`, with an inventory and SHA-256 checksums. The storage
repository's GitHub Pages workflow extracts the archive to `arrow/assets/`.
Release download URLs are not used directly because the interactive viewers
need cross-origin access to JSON, binary data, images, and videos.

Push changes to `gh-pages` to publish the website. The `Publish website` workflow
uses Node 24, runs `npm ci` and `npm run build`, and deploys `dist/` to
<https://ifradlin.github.io/arrow/>. GitHub Pages uses **GitHub Actions** as its
publishing source. Keep media and generated releases out of Git.
