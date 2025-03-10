import React from 'react';
import Icon from '@shopgate/pwa-common/components/Icon';
import { iconSvgContent } from '../../config';

/**
 * Renders a customer card icon using the configured SVG content.
 * @param {Object} props - The component props.
 * @returns {JSX.Element}
 */
const CustomerCardIcon = props => (
  <Icon content={iconSvgContent} {...props} />
);

export default CustomerCardIcon;
