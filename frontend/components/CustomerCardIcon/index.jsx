import React from 'react';
import { Icon } from '@shopgate/engage/components';
import config from '../../config.json';

const { iconSvgContent } = config;

/**
 * Renders a customer card icon using the configured SVG content.
 * @param {Object} props - The component props.
 * @returns {JSX.Element}
 */
const CustomerCardIcon = props => (
  <Icon content={iconSvgContent} {...props} />
);

export default CustomerCardIcon;
