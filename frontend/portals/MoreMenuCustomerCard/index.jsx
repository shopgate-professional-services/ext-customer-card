import React from 'react';
import PropTypes from 'prop-types';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import CustomerCardIcon from '../../components/CustomerCardIcon';
import { useOpenCustomerCard } from '../../hooks/useOpenCustomerCard';
import { textMenuEntry } from '../../texts';

const isIos = themeName.includes('ios');

/**
 * A menu item for the Customer Card in the "More" menu on iOS devices.
 * @param {React.ElementType} props.Item - The menu item component to render.
 * @returns {JSX.Element|null}
 */
const MoreMenuCustomerCard = ({ Item }) => {
  const onClick = useOpenCustomerCard();

  return isIos ? (
    <Item
      label={textMenuEntry}
      icon={CustomerCardIcon}
      onClick={onClick}
    />
  ) : null;
};

MoreMenuCustomerCard.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

export default MoreMenuCustomerCard;
