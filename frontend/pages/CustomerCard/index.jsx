import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useTheme } from '@shopgate/engage/core';
import {
  Route,
  AppBarIOS,
  AppBarAndroid,
  CrossIcon,
} from '@shopgate/engage/components';
import { themeName } from "@shopgate/pwa-common/helpers/config";
import { CUSTOMER_CARD } from '../../constants';
import connect from './connector';
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
 * @param {string} props.userCustomerNumber - The customer number used for generating a barcode.
 * @param {string} props.userEmail - The email used for generating a QR code.
 * @param {Function} props.goBack - Callback function triggered when the back button is clicked.
 * @returns {JSX.Element}
 */
const CustomerCard = ({ userCustomerNumber, userEmail, goBack }) => {
  const { View, AppBar } = useTheme();
  const isIos = themeName.includes('ios');
  const AppBarIcon = isIos
    ? AppBarIOS.Icon
    : AppBarAndroid.Icon;
  return (
    <View title={textMenuEntry}>
      <AppBar
        title={textMenuEntry}
        left={<div />}
        right={<AppBarIcon icon={CrossIcon} onClick={goBack} />}
      />
      <div className={styles.container}>
        <article className={`${styles.card} engage__customer__card`} aria-labelledby="customer-card-title">
          <img className={styles.logo} src={logoUrl} alt="Logo" />
          <h1 id="customer-card-title" className={styles.headline}>{textHeadline}</h1>
          {useQrCodeMode ? (
            <QRCode
              value={userEmail || ''}
              size={150}
              fgColor={colorCode}
              bgColor={colorCodeBackground || 'transparent'}
              className={styles.code}
              aria-label={`QR-Code: ${userEmail}`}
            />
          ) : (
            userCustomerNumber && (
              <Barcode
                value={userCustomerNumber}
                format={barcodeFormat}
                displayValue
                className={styles.code}
                aria-label={`Barcode: ${userCustomerNumber}`}
              />
            )
          )}
          <p className={styles.textInfo}>{textInfoBlock}</p>
        </article>
      </div>
    </View>
  );
};

CustomerCard.propTypes = {
  goBack: PropTypes.func.isRequired,
  userCustomerNumber: PropTypes.string,
  userEmail: PropTypes.string,
};

CustomerCard.defaultProps = {
  userCustomerNumber: '',
  userEmail: '',
};

export default () => (
  <Route pattern={CUSTOMER_CARD} component={connect(CustomerCard)} />
);
