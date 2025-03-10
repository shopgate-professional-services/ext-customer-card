import { routeWillEnter$, routeWillLeave$ } from '@shopgate/engage/core/streams';
import { setBrightness, resetBrightness } from '@shopgate/engage/core/commands';
import { CUSTOMER_CARD } from '../../constants';

const customerCardRouteWillEnter$ = routeWillEnter$
  .filter(({ action }) => action.route.pattern === CUSTOMER_CARD);

const customerCardRouteWillLeave$ = routeWillLeave$
  .filter(({ action }) => action.route.pattern === CUSTOMER_CARD);

export default (subscribe) => {
  subscribe(customerCardRouteWillEnter$, () => {
    setBrightness(100);
  });

  subscribe(customerCardRouteWillLeave$, () => {
    resetBrightness();
  });
};
