import { css } from 'glamor';
import { themeColors } from '@shopgate/pwa-common/helpers/config';
import {
  colorCardBackground,
  colorText,
} from '../../config';

const container = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: themeColors.background,
  padding: '16px',
}).toString();

const card = css({
  width: '300px',
  height: '500px',
  maxWidth: '350px',
  maxHeight: '600px',
  backgroundColor: colorCardBackground,
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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

const textInfo = css({
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
  textInfo,
  headline,
};
