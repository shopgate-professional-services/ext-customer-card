# Customer Card

This extension provides a customer card with either a QR code or a barcode.

- **QR code mode** encodes the e-mail address of the logged-in customer.
- **Barcode mode** encodes the external customer number of the logged-in customer.

The card is only available for logged-in customers. Guests and customers without a loaded customer account are sent to the login and return to the card afterwards.

## Requirements

PWA 7.32.0 or newer. The card takes its colors from the app theme, which is available from this version on.

## Design

By default the card follows the app theme, so it needs no colors or logo to be configured:

- **Card colors:** based on the primary color of the app theme (see `cardStyle`). The text color is chosen by the theme, so it stays readable on light and dark primary colors.
- **Page background:** the regular background color of the app.
- **Dark mode:** supported automatically when the app uses a dark color scheme.
- **Logo:** the shop logo of the app, the same one that is shown in the app header.
- **Code:** black on a white area, so scanners at the checkout can read it reliably, also in dark mode.
- **Animation:** the card slides in from the bottom when the page opens. Customers who turned on "Reduce motion" on their device see no animation.

Every color and the logo can be overridden with the `override…` configs below. They default to `null`. `null`, an empty field and `""` all mean "not set", so the default from above is used.

> The shop logo is designed for the app header. If it is hard to read on the card (for example a colored logo on a card in the same color), set `overrideLogoUrl` to a logo that fits, for example a white version.

## Configuration

### Texts
| Key | Description | Default |
|------|------------|---------|
| `textMenuEntry` | Text for the customer card menu entry. | `Customer Card` |
| `textHeadline` | Headline of the customer card. | `Your customer card` |
| `textAboveCode` | HTML text above the code. Placeholders: `{mail}`, `{firstName}`, `{lastName}` | `<p>{firstName} {lastName}</p>` |
| `textBelowCode` | HTML text below the code. Placeholders: `{mail}`, `{firstName}`, `{lastName}` | `<p>Some information such as user's e-mail address: <strong>{mail}</strong></p>` |

### Design
| Key | Description | Default |
|------|------------|---------|
| `cardStyle` | How the card uses the primary color of the app theme: `gradient` (gradient of the primary color), `solid` (primary color) or `tinted` (primary color as a soft tint of the page background, with the regular text colors). | `gradient` |
| `showShine` | Lets a light shine sweep once over the card after it appeared. | `false` |
| `overrideLogoUrl` | URL of the logo on the card. Not set: shop logo of the app. | `null` |
| `overrideColorCardBackground` | Card background. Replaces `cardStyle` in light and dark mode; the text color is then derived from this background. Not set: taken from the app theme. | `null` |
| `overrideColorText` | Text color on the card. Not set: taken from the app theme. | `null` |
| `overrideColorCode` | Color of the QR code or barcode. Not set: black. | `null` |
| `overrideColorCodeBackground` | Background of the code area. Not set: white. | `null` |
| `iconSvgContent` | Raw SVG markup for the menu and tab bar icon. | Card icon |

### Function
| Key | Description | Default |
|------|------------|---------|
| `useQrCodeMode` | `true`: QR code with the customer's e-mail address. `false`: barcode with the external customer number. | `true` |
| `barcodeFormat` | Barcode format, e.g. `CODE128` or `MSI`. Only used in barcode mode. | `CODE128` |
| `showTabBarEntry` | Show the customer card entry in the tab bar. | `true` |

### Upgrading from 1.x
Version 2.0 renamed the color and logo configs to `override…` and no longer reads the old keys `colorCardBackground`, `colorText`, `colorCode`, `colorCodeBackground` and `logoUrl`. Values stored for them in 1.x are ignored, so the card uses the app theme right away. To keep a custom color or logo, set the matching `override…` config.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
