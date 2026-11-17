import { render } from '@testing-library/react';
import { getCurrentPathname } from '@shopgate/engage/core/selectors';
import { registerNavigationAction } from '@shopgate/engage/navigation';
import { CUSTOMER_CARD, CUSTOMER_CARD_ACTION, CUSTOMER_CARD_ICON } from './constants';
import { icons } from './icons';
import { registerNavigationActions } from './navigationActions';

const mockPush = jest.fn();

jest.mock('./config.json', () => ({
  iconSvgContent: '<path d="M0 0h24v24H0z"/>',
  textMenuEntry: 'Meine Karte',
}), { virtual: true });
jest.mock('@shopgate/engage/navigation', () => ({ registerNavigationAction: jest.fn() }));
jest.mock('@shopgate/engage/core/selectors', () => ({ getCurrentPathname: jest.fn() }));
jest.mock('@shopgate/engage/core/hooks', () => ({
  useAppSelector: selector => selector({}),
  useNavigation: () => ({ push: mockPush }),
}));

/**
 * Renders the hook of the registered action and returns what it resolved.
 * @param {string} pathname The path of the current route.
 * @returns {Object} The resolved action.
 */
const resolve = (pathname = '/') => {
  getCurrentPathname.mockReturnValue(pathname);
  const [[, useAction]] = registerNavigationAction.mock.calls;
  let result;

  /**
   * Calls the hook of the action.
   * @returns {null}
   */
  const Consumer = () => {
    result = useAction({
      action: CUSTOMER_CARD_ACTION,
      icon: '',
      link: '',
    });
    return null;
  };

  render(<Consumer />);

  return result;
};

describe('navigation actions', () => {
  beforeAll(() => {
    registerNavigationActions();
  });

  it('registers the customer card action with the merchant text as tab label and admin labels', () => {
    expect(registerNavigationAction).toHaveBeenCalledTimes(1);
    expect(registerNavigationAction).toHaveBeenCalledWith(
      '@shopgate-project/customer-card/card',
      expect.any(Function),
      {
        tabBar: {
          label: 'Meine Karte',
          icon: CUSTOMER_CARD_ICON,
          adminLabel: {
            'en-us': 'Customer card',
            'de-de': 'Kundenkarte',
          },
        },
      }
    );
  });

  it('uses the registered customer card icon for the tab', () => {
    const [[, , meta]] = registerNavigationAction.mock.calls;

    expect(icons[meta.tabBar.icon]).toBe('<path d="M0 0h24v24H0z"/>');
  });

  it('resolves an available action with the merchant text and the tab icon', () => {
    expect(resolve()).toMatchObject({
      available: true,
      icon: CUSTOMER_CARD_ICON,
      label: 'Meine Karte',
    });
  });

  it('opens the customer card', () => {
    resolve().onClick();

    expect(mockPush).toHaveBeenCalledWith({ pathname: CUSTOMER_CARD });
  });

  it('is active only on the customer card page', () => {
    expect(resolve(CUSTOMER_CARD).isActive).toBe(true);
    expect(resolve('/cart').isActive).toBe(false);
  });
});
