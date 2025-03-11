import React from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useSelector } from 'react-redux';
import { useTheme, i18n } from '@shopgate/engage/core';
import { Route } from '@shopgate/engage/components';
import { getExternalCustomerNumber, getUserEmail } from '@shopgate/engage/user';
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
  textInfoBlock,
} from '../../config';

/**
 * CustomerCard Component - Displays a customer card with either a QR code or barcode.
 * @returns {JSX.Element}
 */
const CustomerCard = () => {
  const { View, AppBar } = useTheme();
  const userCustomerNumber = useSelector(getExternalCustomerNumber);
  const userEmail = useSelector(getUserEmail);

  return (
    <View title={textMenuEntry}>
      <AppBar title={textMenuEntry} right={<div />} />
      <div className={styles.container}>
        <section className={`${styles.card} engage__customer__card`} aria-labelledby="customer-card-title">
          <img className={styles.logo} src={logoUrl} alt="Logo" aria-hidden />
          <h1 id="customer-card-title" className={styles.headline}>{textHeadline}</h1>
          {useQrCodeMode ? (
            <QRCode
              value={userEmail || ''}
              size={150}
              fgColor={colorCode}
              bgColor={colorCodeBackground || 'transparent'}
              className={styles.code}
              role="img"
              aria-label={i18n.text('customer_card.qr_code', { email: userEmail })}
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
          <p className={styles.textInfo} dangerouslySetInnerHTML={{ __html: textInfoBlock }} />
        </section>
      </div>
    </View>
  );
};

export default () => (
  <Route pattern={CUSTOMER_CARD} component={CustomerCard} />
);
