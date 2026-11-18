import { render } from '@testing-library/react';
import ThemeIcon from '@shopgate/engage/icons/components/ThemeIcon';
import { CUSTOMER_CARD_ICON } from '../../constants';
import CustomerCardIcon from '.';

jest.mock('@shopgate/engage/icons/components/ThemeIcon', () => jest.fn(() => null));

describe('CustomerCardIcon', () => {
  it('renders the registered customer card icon with the props of the menu', () => {
    render(<CustomerCardIcon className="menu-icon" size={24} />);

    expect(ThemeIcon.mock.calls[0][0]).toEqual({
      name: CUSTOMER_CARD_ICON,
      className: 'menu-icon',
      size: 24,
    });
  });
});
