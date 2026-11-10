import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, i18n, historyReplace } from '@shopgate/engage/core';
import { Route } from '@shopgate/engage/components';
import { GlobalStyles, makeStyles, keyframes } from '@shopgate/engage/styles';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { getExternalCustomerNumber, getUserData, LOGIN_PATH } from '@shopgate/engage/user';
import { CUSTOMER_CARD } from '../../constants';
import config from '../../config.json';

const {
  textHeadline,
  textMenuEntry,
  useQrCodeMode,
  barcodeFormat,
  textAboveCode,
  textBelowCode,
  showShine,
} = config;

/**
 * Reads an override config. Null, empty values and leftover quotes ("" or '') count as not set.
 * @param {*} value The config value.
 * @returns {string|null}
 */
const getOverride = (value) => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return ['', 'null', '""', "''"].includes(trimmed) ? null : trimmed;
};

const overrides = {
  cardBackground: getOverride(config.overrideColorCardBackground),
  text: getOverride(config.overrideColorText),
  code: getOverride(config.overrideColorCode),
  codeBackground: getOverride(config.overrideColorCodeBackground),
  logoUrl: getOverride(config.overrideLogoUrl),
};

const CARD_STYLE_GRADIENT = 'gradient';
const CARD_STYLE_SOLID = 'solid';
const CARD_STYLE_TINTED = 'tinted';

const cardIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(32px) scale(0.98)',
  },
  '100%': {
    opacity: 1,
    transform: 'none',
  },
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const shineSweep = keyframes({
  '0%': { left: '-60%' },
  '100%': { left: '120%' },
});

/**
 * Card background and text color per card style. Colors come from the theme, so the card follows
 * the merchant's primary color and the light / dark color scheme. The color configs override them.
 * @param {Object} theme The theme.
 * @param {string} cardStyle The configured card style.
 * @returns {Object}
 */
const getCardColors = (theme, cardStyle) => {
  const { primary, background, text } = theme.palette;

  // A configured card background replaces the card style in every color scheme. The text color
  // is derived from that background the same way the theme does it for the primary color.
  if (overrides.cardBackground) {
    return {
      background: overrides.cardBackground,
      color: theme.contrastColor(overrides.cardBackground),
    };
  }

  switch (cardStyle) {
    case CARD_STYLE_TINTED:
      return {
        background: `color-mix(in srgb, ${primary.main} 14%, ${background.surface})`,
        color: text.primary,
        ...theme.applyStyles('dark', {
          background: `color-mix(in srgb, ${primary.main} 24%, ${background.surface})`,
        }),
      };
    case CARD_STYLE_SOLID:
      return {
        background: primary.main,
        color: primary.contrastText,
      };
    case CARD_STYLE_GRADIENT:
    default:
      return {
        background: `linear-gradient(135deg, ${primary.main} 0%, ${theme.darken(primary.main, 0.25)} 100%)`,
        color: primary.contrastText,
      };
  }
};

const useStyles = makeStyles()((theme) => {
  const cardColors = getCardColors(theme, config.cardStyle);

  return {
    container: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    card: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: 350,
      boxSizing: 'border-box',
      borderRadius: 16,
      padding: theme.spacing(3, 2.5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      ...cardColors,
      ...(overrides.text && { color: overrides.text }),
      animation: `${cardIn} 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
    logo: {
      display: 'block',
      maxWidth: '70%',
      maxHeight: 44,
      marginBottom: theme.spacing(2),
    },
    headline: {
      fontSize: '1.0625rem',
      fontWeight: 700,
      margin: 0,
    },
    textAbove: {
      fontSize: '0.9375rem',
      opacity: 0.85,
      '& p': {
        margin: theme.spacing(0.5, 0, 0),
      },
    },
    code: {
      boxSizing: 'border-box',
      margin: theme.spacing(2, 'auto'),
      padding: theme.spacing(1.5),
      borderRadius: 12,
      background: overrides.codeBackground || '#ffffff',
      animation: `${fadeIn} 300ms ease-out 180ms both`,
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
      '& svg': {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
      },
    },
    qrCode: {
      width: '62%',
      '& svg': {
        width: '100%',
      },
    },
    textBelow: {
      fontSize: '0.8125rem',
      opacity: 0.85,
      wordBreak: 'break-word',
      '& p': {
        margin: 0,
      },
    },
    shine: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      borderRadius: 'inherit',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        bottom: '-50%',
        left: '-60%',
        width: '45%',
        background: 'linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 100%)',
        transform: 'rotate(8deg)',
        animation: `${shineSweep} 900ms ease-in-out 520ms both`,
      },
      '@media (prefers-reduced-motion: reduce)': {
        display: 'none',
      },
    },
  };
});

// The core keeps every iOS page a few pixels scrollable. The card fits the screen, so only
// long texts should make the page scroll.
const noExtraScrollSpace = {
  '.engage__view__content.route__customer_card': {
    '--extra-ios-scroll-space': '0px !important',
  },
};

/**
 * Escapes a customer value, so it is inserted as text into the configured HTML.
 * @param {*} value The value.
 * @returns {string}
 */
const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

/**
 * Replaces placeholders in the format `{key}` within a string with corresponding values from
 * the user object.
 * Only keys listed in `allowedKeys` will be replaced; others remain unchanged.
 * @param {string|null} template - The string containing placeholders (e.g., "Hello {firstName}!").
 * @param {Object} data - The user object.
 * @param {string[]} allowedKeys - Allowed keys for replacement.
 * @returns {string}
 */
const replacePlaceholders = (template, data, allowedKeys = ['firstName', 'lastName', 'mail']) =>
  String(template ?? '').replace(/{(.*?)}/g, (_, key) => (
    allowedKeys.includes(key) ? escapeHtml(data[key]) : `{${key}}`
  ));

/**
 * CustomerCard Component - Displays a customer card with either a QR code or barcode.
 * @returns {JSX.Element}
 */
const CustomerCard = () => {
  const { View, AppBar } = useTheme();
  const { classes, cx } = useStyles();
  const userCustomerNumber = useSelector(getExternalCustomerNumber);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  // The router only checks the persisted login flag when the page opens. After an app start with
  // an expired session (e.g. Shopify headless login) that flag is still set until the user request
  // fails. Only show the card for a loaded customer, otherwise send the user to the login.
  // A logout while the page is open needs no handling here: the core resets the history to the
  // start page when a protected route is active.
  const isUserLoaded = !!userData && userData.isFetching === false;
  const hasCustomer = isUserLoaded && !!userData.id;

  useEffect(() => {
    if (isUserLoaded && !hasCustomer) {
      dispatch(historyReplace({
        pathname: LOGIN_PATH,
        state: { redirect: { location: CUSTOMER_CARD } },
      }));
    }
  }, [dispatch, hasCustomer, isUserLoaded]);

  // The logo config only overrides the shop logo from the app config.
  const logo = overrides.logoUrl || appConfig.logo || appConfig.logoFallback;
  const codeColor = overrides.code || '#000000';
  const codeBackground = overrides.codeBackground || '#ffffff';

  return (
    <View title={textMenuEntry}>
      <GlobalStyles styles={noExtraScrollSpace} />
      <AppBar title={textMenuEntry} right={<div />} />
      {hasCustomer && (
        <div className={classes.container}>
          <section className={cx(classes.card, 'engage__customer__card')} aria-labelledby="customer-card-title">
            {logo && <img className={classes.logo} src={logo} alt={appConfig.shopName || ''} />}
            <h1 id="customer-card-title" className={classes.headline}>{textHeadline}</h1>
            <div
              className={classes.textAbove}
              dangerouslySetInnerHTML={{ __html: replacePlaceholders(textAboveCode, userData) }}
            />
            {useQrCodeMode ? (
              <div className={cx(classes.code, classes.qrCode)}>
                <QRCode
                  value={userData.mail || ''}
                  size={150}
                  fgColor={codeColor}
                  bgColor={codeBackground}
                  role="img"
                  aria-label={i18n.text('customer_card.qr_code', { email: userData.mail })}
                />
              </div>
            ) : (
              userCustomerNumber && (
                <div className={classes.code}>
                  <Barcode
                    value={userCustomerNumber}
                    format={barcodeFormat}
                    lineColor={codeColor}
                    background={codeBackground}
                    displayValue
                    role="img"
                  />
                </div>
              )
            )}
            <div
              className={classes.textBelow}
              dangerouslySetInnerHTML={{ __html: replacePlaceholders(textBelowCode, userData) }}
            />
            {showShine && <div className={classes.shine} aria-hidden />}
          </section>
        </div>
      )}
    </View>
  );
};

export default () => (
  <Route pattern={CUSTOMER_CARD} component={CustomerCard} />
);
