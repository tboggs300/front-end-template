/*eslint-disable*/

import { H2 } from 'components/Typography/H2';
import { NotFound } from 'xerum';
import { appConstants } from 'modules';
import { theme } from 'theme';
import {
  // MainWrapper,
  LoginWrapper,
  // CreateAccountWrapper,
  // ResetPasswordWrapper,
  // SetPasswordWrapper,
  PrivacyPolicyWrapper,
  TermsOfServiceWrapper,
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
    element: <LoginWrapper />,
  },
  // {
  //   path: '/create-account',
  //   element: <CreateAccountWrapper />,
  // },
  // {
  //   path: '/reset-password',
  //   element: <ResetPasswordWrapper />,
  // },
  // {
  //   path: '/set-password',
  //   element: <SetPasswordWrapper />,
  // },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyWrapper />,
  },
  {
    path: '/terms-of-service',
    element: <TermsOfServiceWrapper />,
  },
];

export { routes };