import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import config from './config';
import './App.css';
import Home from './Home';
import Messages from './Messages';
import Navbar from './Navbar';

const oktaAuth = new OktaAuth(config.oidc);

function App() {

  const history = useHistory();
  const restoreOriginalUri = async (oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Navbar />
        <Container text style={{marginTop: '7em'}}>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/login/callback" component={LoginCallback}/>
            <SecureRoute path="/messages" component={Messages}/>
          </Switch>
        </Container>
    </Security>
  );
}

export default App;
