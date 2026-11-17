import { useAppSelector } from '@shopgate/engage/core/hooks';
import { getCurrentPathname } from '@shopgate/engage/core/selectors';
import { registerNavigationAction } from '@shopgate/engage/navigation';
import { useOpenCustomerCard } from './hooks/useOpenCustomerCard';
import { CUSTOMER_CARD, CUSTOMER_CARD_ACTION, CUSTOMER_CARD_ICON } from './constants';
import config from './config.json';

const { textMenuEntry } = config;

/**
 * Resolves the customer card action: opens the card and is active on its page.
 * @returns {Object} The resolved action.
 */
const useCustomerCardAction = () => ({
  available: true,
  icon: CUSTOMER_CARD_ICON,
  label: textMenuEntry,
  onClick: useOpenCustomerCard(),
  isActive: useAppSelector(state => getCurrentPathname(state) === CUSTOMER_CARD),
});

/**
 * Registers the customer card action, which merchants can add to the tab bar.
 */
export const registerNavigationActions = () => {
  registerNavigationAction(CUSTOMER_CARD_ACTION, useCustomerCardAction, {
    tabBar: {
      label: textMenuEntry,
      icon: CUSTOMER_CARD_ICON,
      adminLabel: {
        'en-us': 'Customer card',
        'de-de': 'Kundenkarte',
      },
    },
  });
};
