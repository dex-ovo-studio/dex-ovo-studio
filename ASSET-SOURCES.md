# Profile source and maintenance notes

## Existing work retained

This update continues `design/compact-20261116` from commit `a0fb31557ea8208366b6cd607164313474856897`, six commits ahead of `main` at `410d67c419b149a6e08de5891133b09161714c75`. It keeps the existing README, four product marks, light/dark headers and all earlier canvas assets. No previous artwork is removed.

The four `assets/studio-header-*.svg` files retain the existing geometry and palette. This update increases the small text, uses the current D.E.X Studio wordmark spelling, and extends the compact-header breakpoint to 768px. Product icons are unchanged. No fonts, scripts, third-party illustrations or new runtime dependencies are downloaded or embedded.

These assets are branding, not screenshots of running products. No private project material or application screenshots have been copied into this repository. This update does not assign a new license to the repository or change any product's license. Each product's source and redistribution terms must be checked in that product's repository and release materials.

## Public status checked on 2026-11-17

- Navio: [published Beta 7](https://github.com/dex-ovo-studio/Navio/releases/tag/v1.0.0-beta.7); the tag and title identify a beta even though GitHub's prerelease flag is false. No RC4, RC5 or 1.0 Stable release was listed. Keep the proxy-restoration advisory. [Release list](https://github.com/dex-ovo-studio/Navio/releases).
- Mystery: [2.1.0 release in the software hub](https://github.com/dex-ovo-studio/DEX-Studio-Software-Status/releases/tag/mystery-v2.1.0), with an installer and SHA256SUMS.txt. Its historical asset name is preserved. This metadata check is not a fresh binary test or checksum certification.
- Tune: [current status](https://github.com/dex-ovo-studio/Tune/blob/main/STATUS.md) says development prototype and no public installer. Its release collection was empty.
- Rovelio: [current status](https://github.com/dex-ovo-studio/Rovelio/blob/main/STATUS.md) says development prototype and no public image. Its release collection was empty.

Tune and Rovelio use their confirmed product names while links retain the existing repository names. Update those URLs only after the repository rename and compatibility checks are complete. Do not infer completed feature tests from a product's description.

## Validation and later updates

Run `node scripts/check-profile.mjs` for local asset, navigation and availability guards. It uses Node built-ins only and makes no network requests. It does not certify GitHub rendering, link reachability, licenses or binaries.

Before integration, inspect the real GitHub rendering in light/dark themes and desktop/mobile widths. Check the selected picture source, text wrapping, horizontal overflow, product and support anchors, and actual release destinations. When publishing a new product version, recheck the release metadata and update the dated README status in the same reviewed change. Do not treat an unpublished build or a GitHub badge as proof of a stable release.
