import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, i18n, historyReplace } from '@shopgate/engage/core';
import { Route } from '@shopgate/engage/components';
import { getExternalCustomerNumber, getUserData, LOGIN_PATH } from '@shopgate/engage/user';
import { CUSTOMER_CARD } from '../../constants';
import styles from './style';
import {
  textHeadline,
  textMenuEntry,
  logoUrl,
  colorCodeBackground,
  colorCode,
  useQrCodeMode,
  barcodeFormat,
  textAboveCode,
  textBelowCode,
} from '../../config';

/**
 * Replaces placeholders in the format `{key}` within a string with corresponding values from
 * the user object.
 * Only keys listed in `allowedKeys` will be replaced; others remain unchanged.
 * @param {string} template - The string containing placeholders (e.g., "Hello {firstName}!").
 * @param {Object} data - The user object.
 * @param {string[]} allowedKeys - Allowed keys for replacement.
 * @returns {string}
 */
const replacePlaceholders = (template, data, allowedKeys = ['firstName', 'lastName', 'mail']) =>
  template.replace(/{(.*?)}/g, (_, key) => (
    allowedKeys.includes(key) ? data[key] || '' : `{${key}}`
  ));

/**
 * CustomerCard Component - Displays a customer card with either a QR code or barcode.
 * @returns {JSX.Element}
 */
const CustomerCard = () => {
  const { View, AppBar } = useTheme();
  const userCustomerNumber = useSelector(getExternalCustomerNumber);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  // The router only checks the login flag. Some login integrations (e.g. Shopify headless login
  // with an expired session) report a successful user request without a customer, which sets
  // that flag. Only show the card for a loaded customer, otherwise send the user to the login.
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

  if (!hasCustomer) return null;

  const replacedAboveText = replacePlaceholders(textAboveCode, userData);
  const replacedBelowText = replacePlaceholders(textBelowCode, userData);

  return (
    <View title={textMenuEntry}>
      <AppBar title={textMenuEntry} right={<div />} />
      <div className={styles.container}>
        <section className={`${styles.card} engage__customer__card`} aria-labelledby="customer-card-title">
          <img className={styles.logo} src={logoUrl} alt="Logo" aria-hidden />
          <h1 id="customer-card-title" className={styles.headline}>{textHeadline}</h1>
          <p className={styles.textAbove} dangerouslySetInnerHTML={{ __html: replacedAboveText }} />
          {useQrCodeMode ? (
            <QRCode
              value={userData.mail || ''}
              size={150}
              fgColor={colorCode}
              bgColor={colorCodeBackground || 'transparent'}
              className={styles.code}
              role="img"
              aria-label={i18n.text('customer_card.qr_code', { email: userData.mail })}
            />
          ) : (
            userCustomerNumber && (
              <Barcode
                value={userCustomerNumber}
                format={barcodeFormat}
                displayValue
                className={styles.code}
                role="img"
              />
            )
          )}
          <p className={styles.textBelow} dangerouslySetInnerHTML={{ __html: replacedBelowText }} />
        </section>
      </div>
    </View>
  );
};

export default () => (
  <Route pattern={CUSTOMER_CARD} component={CustomerCard} />
);
