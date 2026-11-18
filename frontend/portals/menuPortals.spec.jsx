import PropTypes from 'prop-types';
import { fireEvent, render, screen } from '@testing-library/react';
import CustomerCardIcon from '../components/CustomerCardIcon';
import { CUSTOMER_CARD } from '../constants';
import MoreMenuCustomerCard from './MoreMenuCustomerCard';
import NavMenuCustomerCard from './NavMenuCustomerCard';

const mockPush = jest.fn();
const mockItem = jest.fn();

jest.mock('../config.json', () => ({ textMenuEntry: 'Meine Karte' }), { virtual: true });
jest.mock('@shopgate/pwa-common/helpers/config', () => ({ themeName: 'theme-ios11' }));
jest.mock('@shopgate/engage/core/hooks', () => ({
  useNavigation: () => ({ push: mockPush }),
}));
jest.mock('../components/CustomerCardIcon', () => () => null);

/**
 * Renders a menu item as a plain button and records its props.
 * @param {Object} props The props of the item.
 * @returns {JSX.Element}
 */
const Item = (props) => {
  const { label, onClick } = props;
  mockItem(props);

  return <button type="button" onClick={onClick}>{label}</button>;
};

Item.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

describe('menu portals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['NavMenuCustomerCard', NavMenuCustomerCard],
    ['MoreMenuCustomerCard', MoreMenuCustomerCard],
  ])('%s renders an item with the merchant text and the card icon that opens the card', (_, Portal) => {
    render(<Portal Item={Item} />);

    expect(mockItem).toHaveBeenLastCalledWith(expect.objectContaining({
      label: 'Meine Karte',
      icon: CustomerCardIcon,
    }));

    fireEvent.click(screen.getByRole('button', { name: 'Meine Karte' }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({ pathname: CUSTOMER_CARD });
  });
});
