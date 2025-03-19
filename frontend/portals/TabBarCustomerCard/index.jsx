import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import CustomerCardIcon from '../../components/CustomerCardIcon';
import withNavigationHandler from '../../hocs/withNavigationHandler';
import { CUSTOMER_CARD } from '../../constants';
import { textMenuEntry, showTabBarEntry } from '../../config';

const tabItemIcon = css({
  height: 24,
  width: 24,
}).toString();

/**
 * TabBarCustomerCard Component - Adds a tab bar item for the customer card
 *
 * @param {Function} props.TabBarAction - Component to render a tab bar action
 * @param {string} props.path - Current active path
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in
 * @param {number} [props.tabIndex] - Tab index for accessibility
 * @returns {JSX.Element} The rendered component
 */
const TabBarCustomerCard = ({
  onNavigate,
  TabBarAction,
  children,
  tabIndex,
  path,
}) => {
  if (!showTabBarEntry) return null;

  const isHighlighted = path === CUSTOMER_CARD;

  return (
    <TabBarAction
      label={textMenuEntry}
      icon={<CustomerCardIcon className={tabItemIcon} />}
      isHighlighted={isHighlighted}
      aria-label={textMenuEntry}
      aria-selected={isHighlighted}
      tabIndex={tabIndex}
      onClick={onNavigate}
    >
      {children}
    </TabBarAction>
  );
};

TabBarCustomerCard.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  TabBarAction: PropTypes.elementType.isRequired,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
};

TabBarCustomerCard.defaultProps = {
  children: null,
  tabIndex: null,
};

export default withNavigationHandler(TabBarCustomerCard);
