import React from 'react';
import ThemeIcon from '@shopgate/engage/icons/components/ThemeIcon';
import { CUSTOMER_CARD_ICON } from '../../constants';

/**
 * Renders the customer card icon, which merchants can replace in the icon library.
 * @param {Object} props The props of the icon.
 * @returns {JSX.Element}
 */
const CustomerCardIcon = props => (
  <ThemeIcon name={CUSTOMER_CARD_ICON} {...props} />
);

export default CustomerCardIcon;
