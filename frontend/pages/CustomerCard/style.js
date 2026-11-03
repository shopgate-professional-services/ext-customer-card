import { css } from 'glamor';
import { themeColors } from '@shopgate/pwa-common/helpers/config';
import {
  colorCardBackground,
  colorText,
} from '../../config';

// Fills the visible content area below the app bar and centers the card in it.
const container = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%',
  boxSizing: 'border-box',
  backgroundColor: themeColors.background,
  padding: '16px',
}).toString();

// The card height follows its content, so no empty space is added above or below.
const card = css({
  width: '100%',
  maxWidth: '350px',
  boxSizing: 'border-box',
  backgroundColor: colorCardBackground,
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px',
}).toString();

const logo = css({
  width: '75%',
  marginBottom: '10px',
}).toString();

const code = css({
  width: '60%',
  marginBottom: '10px',
}).toString();

const textAbove = css({
  fontSize: '1rem',
  color: colorText,
}).toString();

const textBelow = css({
  fontSize: '0.8rem',
  color: colorText,
}).toString();

const headline = css({
  fontSize: '1rem',
  fontWeight: 700,
  margin: 0,
  color: colorText,
}).toString();

export default {
  container,
  card,
  logo,
  code,
  textAbove,
  textBelow,
  headline,
};
