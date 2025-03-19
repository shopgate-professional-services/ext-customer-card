import React from 'react';
import PropTypes from 'prop-types';
import CustomerCardIcon from '../../components/CustomerCardIcon';
import withNavigationHandler from '../../hocs/withNavigationHandler';
import { textMenuEntry } from '../../config';

/**
 * Navigation menu item for the customer card in the GMD theme.
 * @param {React.ElementType} props.Item - The menu item component to render.
 * @param {Function} props.onNavigate - The navigation handler function.
 * @returns {JSX.Element}
 */
const NavMenuCustomerCard = ({ Item, onNavigate }) => (
  <Item
    label={textMenuEntry}
    icon={CustomerCardIcon}
    onClick={onNavigate}
  />
);

NavMenuCustomerCard.propTypes = {
  Item: PropTypes.elementType.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default withNavigationHandler(NavMenuCustomerCard);
