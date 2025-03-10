import { connect } from 'react-redux';
import { getExternalCustomerNumber } from '@shopgate/engage/user';
import { getUserEmail } from '@shopgate/pwa-common/selectors/user';
import { historyPop } from '@shopgate/pwa-common/actions/router';

/**
 * @param {Function} dispatch - The redux dispatch function.
 * @returns {Object}
 */
const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(historyPop()),
});

/**
 * @param {Object} state - The current application state.
 * @param {Object} props - The component props.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  userCustomerNumber: getExternalCustomerNumber(state),
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps, mapDispatchToProps);
