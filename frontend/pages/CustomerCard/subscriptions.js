import { routeWillEnter$, routeWillLeave$, appDidStart$ } from '@shopgate/engage/core/streams';
import { setBrightness, resetBrightness } from '@shopgate/engage/core/commands';
import { authRoutes, configuration } from '@shopgate/engage/core/collections';
import { LOGIN_PATH, TAB_BAR_PATTERNS_BLACK_LIST } from '@shopgate/engage/core/constants';
import { CUSTOMER_CARD } from '../../constants';

const customerCardRouteWillEnter$ = routeWillEnter$
  .filter(({ action }) => action.route.pattern === CUSTOMER_CARD);

const customerCardRouteWillLeave$ = routeWillLeave$
  .filter(({ action }) => action.route.pattern === CUSTOMER_CARD);

export default (subscribe) => {
  subscribe(appDidStart$, () => {
    authRoutes.set(CUSTOMER_CARD, LOGIN_PATH);
    configuration.update(TAB_BAR_PATTERNS_BLACK_LIST, blacklist => [...blacklist, CUSTOMER_CARD]);
  });

  subscribe(customerCardRouteWillEnter$, () => {
    setBrightness(100);
  });

  subscribe(customerCardRouteWillLeave$, () => {
    resetBrightness();
  });
};
