import React, { useCallback } from 'react';
import { useNavigation } from '@shopgate/engage/core';
import { CUSTOMER_CARD } from '../constants';

/**
 * HOC that enhances a component with navigation logic based on the login status.
 * @param {React.ComponentType} Component - The component to be enhanced with navigation logic.
 * @returns {React.ComponentType} - The wrapped component with `onNavigate`.
 */
const withNavigationHandler = (Component) => {
  /**
   * @returns {React.Element}
   */
  const WrappedComponent = ({ ...props }) => {
    const { push } = useNavigation();

    const handleNavigation = useCallback(() => {
      push({ pathname: CUSTOMER_CARD });
    }, [push]);

    return <Component
      {...props}
      onNavigate={handleNavigation}
    />;
  };

  return WrappedComponent;
};

export default withNavigationHandler;
