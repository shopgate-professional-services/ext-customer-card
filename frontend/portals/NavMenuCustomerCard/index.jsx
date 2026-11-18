import React from 'react';
import PropTypes from 'prop-types';
import CustomerCardIcon from '../../components/CustomerCardIcon';
import { useOpenCustomerCard } from '../../hooks/useOpenCustomerCard';
import { textMenuEntry } from '../../texts';

/**
 * Navigation menu item for the customer card in the GMD theme.
 * @param {React.ElementType} props.Item - The menu item component to render.
 * @returns {JSX.Element}
 */
const NavMenuCustomerCard = ({ Item }) => {
  const onClick = useOpenCustomerCard();

  return (
    <Item
      label={textMenuEntry}
      icon={CustomerCardIcon}
      onClick={onClick}
    />
  );
};

NavMenuCustomerCard.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

export default NavMenuCustomerCard;
