# Customer Card

This extension provides a customer card with either a QR code or barcode.


## Configuration

### UI Settings
| Key | Description | Default |
|------|------------|---------|
| `iconSvgContent` | Raw SVG markup for the tab bar icon. | SVG Path |
| `textHeadline` | Headline text for the customer card. | `Your customer card` |
| `textAboveCode` | Information text above the code. Supported placeholder: `{mail}`, `{firstName}` and `{lastName}` | `<h1>Customer Card</h1><p>{firstName} {lastName}</p>` |
| `textBelowCode` | Information text below the code. Supported placeholder: `{mail}`, `{firstName}` and `{lastName}` | `<p>Some information such as user's e-mail address: <strong>{mail}</strong></p>` |
| `textMenuEntry` | Text for the customer card menu entry. | `Customer Card` |

### Colors
| Key | Description | Default |
|------|------------|---------|
| `colorCodeBackground` | Background color of the customer card code area. If no color is specified, 'transparent' will be used for QR codes. | `#ffffff` |
| `colorCardBackground` | Background color of the customer card sheet. | `#ffffff` |
| `colorText` | Text color used in the customer card interface. | `#000000` |
| `colorCode` | Color of the customer card code. | `#000000` |

### Branding
| Key | Description | Default |
|------|------------|---------|
| `logoUrl` | URL of the logo displayed on the customer card. | `https://www.shopgate.com/hubfs/ShopGate/Images/12321321.svg` |

### Functional Settings
| Key | Description | Default |
|------|------------|---------|
| `useQrCodeMode` | Enable or disable QR code mode for the customer card. | `true` |
| `barcodeFormat` | Barcode format (e.g., 'CODE128' or 'MSI'). | `CODE128` |
| `showTabBarEntry` | Show or hide the customer card entry in the tab bar. | `true` |


## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
