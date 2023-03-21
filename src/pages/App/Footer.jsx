/* eslint-disable */
import { StyledFooter } from './styles';
import { Font, Layout } from 'components';
import { Copyright, Social, Spacer } from 'xerum';
import { socialNetworks } from 'controllers';
import PackageJSON from '../../../package.json';

const { version } = PackageJSON;

const Footer = props => {
  const { theme, selectedTheme } = props;

  return (
    <StyledFooter theme={theme} selectedTheme={selectedTheme}>
      <Layout inline={true} center={true}>
        <Font size={0.9}>
          <Copyright
            rights={true}
            name='Test Company'
            message='Made for all'
          />
        </Font>

        <Font weight='light' size={0.9}>
          <Social
            theme={theme}
            selectedTheme={selectedTheme}
            iconSize={1}
            networks={socialNetworks}
          />
        </Font>

        <Spacer across={true} />

        v{version}
      </Layout>
    </StyledFooter>
  );
};

export { Footer };