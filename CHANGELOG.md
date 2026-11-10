# Changelog

## 2.0.0

### BREAKING

- Requires PWA 7.32.0 or newer (`@shopgate/engage >=7.32.0`).
- Removed the configuration keys `colorCardBackground`, `colorText`, `colorCode`, `colorCodeBackground`
  and `logoUrl`. Their values are no longer read. Set them again under the new `override*` keys if you
  still need them (see "Added").

### Added

- `cardStyle`: card design from the theme's primary color: `gradient` (default), `solid` or `tinted`.
- `showShine`: optional shine sweep over the card when it opens.
- `overrideColorCardBackground`, `overrideColorText`, `overrideColorCode`, `overrideColorCodeBackground`
  and `overrideLogoUrl`. They default to `null`, which means the theme value is used.

### Changed

- Logged-out customers are sent to the login and come back to the card after login. Before, an expired
  session (e.g. with Shopify headless login) could show an empty card.
- The card is centered and sized by its content. The page no longer scrolls unless the texts are long.
- Card colors follow the merchant's primary color and the light / dark color scheme.
- The logo is taken from the shop logo in the app config.
- The card slides in when the page opens (turned off with reduced motion).
- Customer values in the configured texts are HTML-escaped.

## 1.0.0

- Initial release: customer card with a QR code (customer e-mail) or a barcode (external customer number).
