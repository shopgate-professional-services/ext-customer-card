import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigation } from '@shopgate/engage/core';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { CUSTOMER_CARD } from '../constants';

/**
 * HOC that enhances a component with navigation logic based on the login status.
 * @param {React.ComponentType} Component - The component to be enhanced with navigation logic.
 * @returns {React.ComponentType} - The wrapped component with `onNavigate`.
 */
const withNavigationHandler = (Component) => {
  /**
   * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
   * @param {Function} props.onNavigate - The function to handle navigation.
   * @returns {React.Element}
   */
  const WrappedComponent = ({ isLoggedIn, ...props }) => {
    const { push } = useNavigation();

    const handleNavigation = useCallback(() => {
      push({ pathname: isLoggedIn ? CUSTOMER_CARD : LOGIN_PATH });
    }, [isLoggedIn, push]);

    return <Component
      {...props}
      onNavigate={handleNavigation}
    />;
  };

  WrappedComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  /**
   * @param {Object} state - The current application state.
   * @returns {Object}
   */
  const mapStateToProps = state => ({
    isLoggedIn: isUserLoggedIn(state),
  });

  return connect(mapStateToProps)(WrappedComponent);
};

export default withNavigationHandler;
