/*eslint-disable*/
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { BrowserTracing } from '@sentry/tracing';
import { ThemeProvider } from 'styled-components';
import { Heartbeat } from 'xerum';
import { RouteChangeTracker } from 'components';
// import { store } from 'store';
import { theme } from 'theme';
import { AppWrapper } from 'pages';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import PackageJSON from '../package.json';
import * as Sentry from '@sentry/react';
import _ from 'lodash';

import '@fortawesome/fontawesome-free/css/all.css';
import './fontFaces.css';

const { 
  NODE_ENV,
  VITE_SENTRY_DSN: sentryDSN,
  VITE_ANALYTICS_ID: analyticsId,
} = process.env;

const { name, version } = PackageJSON;
const inProduction = NODE_ENV === 'production';

const startApp = async () => {
  if (!inProduction) {
    await import('./utility/mirage');
  } 

  const startAnalytics = () => {
    if (!_.isEmpty(analyticsId) && inProduction) {
      ReactGA.initialize(analyticsId);
      return <RouteChangeTracker />;
    } 
  };

  const startErrorMonitoring = () => {
    if (!_.isEmpty(sentryDSN) && inProduction) {
      Sentry.init({
        dsn: sentryDSN,
        release: `${name}@${version}`,
        integrations: [ new BrowserTracing() ],
        tracesSampleRate: 1.0,
      });
    } 
  }

  startAnalytics();
  startErrorMonitoring();

  const MyApp = (
    <StrictMode>
      {/* <Provider store={store}> */}
        <BrowserTracing>
          <ThemeProvider theme={theme}>
            <Heartbeat disabled={!inProduction}>
              <AppWrapper />
              {'Hello'}
            </Heartbeat>
          </ThemeProvider>
        </BrowserTracing>
      {/* </Provider> */}
    </StrictMode>
  );

  const target = document.querySelector('#root');
  const root = ReactDOM.createRoot(target);

  root.render(MyApp);
};

startApp();