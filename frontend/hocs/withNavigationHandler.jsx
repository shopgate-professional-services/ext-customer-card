import React from 'react';
import { useOpenCustomerCard } from '../hooks/useOpenCustomerCard';

/**
 * HOC that passes a handler to the component which opens the customer card.
 * @param {React.ComponentType} Component - The component to be enhanced with navigation logic.
 * @returns {React.ComponentType} - The wrapped component with `onNavigate`.
 */
const withNavigationHandler = (Component) => {
  /**
   * @param {Object} props The props of the component.
   * @returns {React.Element}
   */
  const WrappedComponent = (props) => {
    const onNavigate = useOpenCustomerCard();

    return <Component {...props} onNavigate={onNavigate} />;
  };

  return WrappedComponent;
};

export default withNavigationHandler;
