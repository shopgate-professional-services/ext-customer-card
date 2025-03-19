import React from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useSelector } from 'react-redux';
import { useTheme, i18n } from '@shopgate/engage/core';
import { Route } from '@shopgate/engage/components';
import { getExternalCustomerNumber, getUserData } from '@shopgate/engage/user';
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

  if (!userData || userData.isFetching) return null;

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
