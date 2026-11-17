# Changelog

## 3.0.0

### BREAKING

- Requires PWA 7.35.0 or newer (`@shopgate/engage >=7.35.0-alpha.3` until 7.35.0 is released; then the
  range moves to `>=7.35.0`).
- The customer card no longer adds itself to the tab bar. It is a tab bar item that merchants add in
  the Theme Config of the admin ("Customer card" / "Kundenkarte"). A shop's tab bar list has to
  contain the item when this version goes live there, at the position it has today (after Cart),
  otherwise the tab disappears. How the list gets the item before the deployment is still open: the
  admin only offers items of extensions the shop's app already runs
  ([CURB-6408](https://jira.shopgate.guru/browse/CURB-6408)).
- Removed the configuration key `showTabBarEntry`. Merchants show or hide the tab in the admin.

### Changed

- The tab uses the merchant text `textMenuEntry` as before and opens the customer card, where the tab
  bar stays hidden.
- The icon of `iconSvgContent` is registered as the extension icon `@shopgate-project/customer-card/card`,
  so merchants can replace the tab icon in the icon library of the admin. The menu entries keep
  showing `iconSvgContent`.

### Development

- Updated the frontend setup: `@shopgate/engage`, `@shopgate/eslint-config` and
  `@shopgate/pwa-unit-test` as dev dependencies, React 17, a `lint` script, a Jest config and specs,
  and a `jsconfig.json` for the editor. `react-redux` is declared, since the card page imports it.
- `package-lock.json` is tracked.

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
