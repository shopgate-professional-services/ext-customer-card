import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';

/**
 * @param {Object} state - The current application state.
 * @param {Object} props - The component props.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
});

export default connect(mapStateToProps);
