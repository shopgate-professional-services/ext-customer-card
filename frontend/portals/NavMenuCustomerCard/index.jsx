import React from 'react';
import PropTypes from 'prop-types';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import CustomerCardIcon from '../../components/CustomerCardIcon';
import withNavigationHandler from '../../hocs/withNavigationHandler';
import { textMenuEntry } from '../../config';

const isIos = themeName.includes('ios');

/**
 * Navigation menu item for the Customer Card.
 * @param {React.ElementType} props.Item - The menu item component to render.
 * @param {Function} props.onNavigate - The navigation handler function.
 * @returns {JSX.Element}
 */
const NavMenuCustomerCard = ({ Item, onNavigate }) => (
  <Item
    label={textMenuEntry}
    icon={isIos ? '' : CustomerCardIcon}
    onClick={onNavigate}
  />
);

NavMenuCustomerCard.propTypes = {
  Item: PropTypes.elementType.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default withNavigationHandler(NavMenuCustomerCard);
