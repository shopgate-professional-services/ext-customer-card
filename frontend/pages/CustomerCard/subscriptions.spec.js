import { appDidStart$, appWillStart$ } from '@shopgate/engage/core/streams';
import { authRoutes, configuration } from '@shopgate/engage/core/collections';
import { LOGIN_PATH, TAB_BAR_PATTERNS_BLACK_LIST } from '@shopgate/engage/core/constants';
import { registerIcons } from '@shopgate/engage/icons';
import { CUSTOMER_CARD } from '../../constants';
import { icons } from '../../icons';
import { registerNavigationActions } from '../../navigationActions';
import subscriptions from './subscriptions';

jest.mock('../../config.json', () => ({}), { virtual: true });
jest.mock('@shopgate/engage/core/streams', () => {
  /**
   * Creates a stream as far as the subscriptions use it.
   * @param {string} name The name of the stream.
   * @returns {Object} The stream.
   */
  const stream = name => ({
    name,
    filter: () => stream(`${name}.filtered`),
  });

  return {
    appDidStart$: stream('appDidStart$'),
    appWillStart$: stream('appWillStart$'),
    routeWillEnter$: stream('routeWillEnter$'),
    routeWillLeave$: stream('routeWillLeave$'),
  };
});
jest.mock('@shopgate/engage/core/commands', () => ({
  setBrightness: jest.fn(),
  resetBrightness: jest.fn(),
}));
jest.mock('@shopgate/engage/core/collections', () => ({
  authRoutes: { set: jest.fn() },
  configuration: { update: jest.fn() },
}));
jest.mock('@shopgate/engage/icons', () => ({ registerIcons: jest.fn() }));
jest.mock('../../navigationActions', () => ({ registerNavigationActions: jest.fn() }));

/**
 * Runs the subscriber and returns the callback it subscribed to a stream.
 * @param {Object} stream The stream.
 * @returns {Function} The callback.
 */
const getCallback = (stream) => {
  const subscribe = jest.fn();
  subscriptions(subscribe);
  return subscribe.mock.calls.find(([entry]) => entry === stream)[1];
};

describe('subscriptions', () => {
  it('registers the icon and the navigation action before the app renders', () => {
    getCallback(appWillStart$)();

    expect(registerIcons).toHaveBeenCalledWith(icons);
    expect(registerNavigationActions).toHaveBeenCalledTimes(1);
  });

  it('keeps the card behind the login and hides the tab bar on it', () => {
    getCallback(appDidStart$)();

    expect(authRoutes.set).toHaveBeenCalledWith(CUSTOMER_CARD, LOGIN_PATH);
    expect(configuration.update)
      .toHaveBeenCalledWith(TAB_BAR_PATTERNS_BLACK_LIST, expect.any(Function));

    const [[, update]] = configuration.update.mock.calls;

    expect(update(['/foo'])).toEqual(['/foo', CUSTOMER_CARD]);
  });
});
