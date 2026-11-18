import { useCallback } from 'react';
import { useNavigation } from '@shopgate/engage/core/hooks';
import { CUSTOMER_CARD } from '../constants';

/**
 * Creates a click handler that opens the customer card.
 * @returns {Function} The click handler.
 */
export const useOpenCustomerCard = () => {
  const { push } = useNavigation();
  return useCallback(() => push({ pathname: CUSTOMER_CARD }), [push]);
};
