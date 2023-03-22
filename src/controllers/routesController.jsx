/*eslint-disable*/

import { H2 } from 'components/Typography/H2';
import { NotFound } from 'xerum';
import { appConstants } from 'modules';
import { theme } from 'theme';
import {
  // MainWrapper,
  // LoginWrapper,
  // CreateAccountWrapper,
  // ResetPasswordWrapper,
  // SetPasswordWrapper,
  // PrivacyPolicyWrapper,
  // TermsOfServiceWrapper,
} from 'pages';


const routes = [
  // Private Routes
  {
    path: '/',
    element: <p>Home</p>,
  },
  {
    path: '/authenticated-route',
    element: <p>Authenicated Content.</p>,
    authenticate: true,
  },

  // Public Routes
  {
    path: '*',
    element: <NotFound
      theme={theme}
      selectedTheme={appConstants.themes.light}
      icon='fa-solid fa-sad-tear'
      title={<H2>Unga Bunga!  We bungled the request ...</H2>}
      message="We'll try to do better, next time."
    />,
  },
  {
    path: '/login',
    element: <p>Login</p>
  },
  {
    path: '/create-account',
    element: <p>Create Acount</p>
  },
  {
    path: '/reset-password',
    element: <p>Reset password</p>
  },
  {
    path: '/set-password',
    element: <p>Set Password</p>
  },
  {
    path: '/privacy-policy',
    element: <p>Privacy policy</p>
  },
  {
    path: '/terms-of-service',
    element: <p>Terms of service</p>
  },
];

export { routes };