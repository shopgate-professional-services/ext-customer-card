import React from 'react';
import PropTypes from 'prop-types';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import CustomerCardIcon from '../../components/CustomerCardIcon';
import withNavigationHandler from '../../hocs/withNavigationHandler';
import { textMenuEntry } from '../../config';

const isIos = themeName.includes('ios');

/**
 * A menu item for the Customer Card in the "More" menu on iOS devices.
 * @param {React.ElementType} props.Item - The menu item component to render.
 * @param {Function} props.onNavigate - The navigation handler function.
 * @returns {JSX.Element|null}
 */
const MoreMenuCustomerCard = ({ Item, onNavigate }) => (
  isIos ? <Item
    label={textMenuEntry}
    icon={CustomerCardIcon}
    onClick={onNavigate}
  /> : null
);

MoreMenuCustomerCard.propTypes = {
  Item: PropTypes.elementType.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default withNavigationHandler(MoreMenuCustomerCard);
