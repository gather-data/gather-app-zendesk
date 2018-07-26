import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import View from './components/pages/View';
import GatherRoute from './utils/GatherRoute';

interface IAppState {
  isLoggedIn: boolean;
}

class App extends React.Component<{}, IAppState> {
  private appContainer: React.RefObject<any>;

  constructor(props: {}) {
    super(props);
    this.appContainer = React.createRef();

    this.state = {
      isLoggedIn: Boolean(localStorage.getItem('token')),
    };
  }

  public componentWillUpdate() {
    if (!this.state.isLoggedIn) {
      this.updateToken();
    }
  }

  public updateToken = () => {
    console.info('YOLO', Boolean(localStorage.getItem('token')));
    this.setState({
      isLoggedIn: Boolean(localStorage.getItem('token')),
    });
  };

  public render() {
    const { isLoggedIn } = this.state;

    const NotLoggedInConditions = {
      redirectIf: !isLoggedIn,
      redirectTo: '/',
    };

    const LoggedInConditions = {
      redirectIf: isLoggedIn,
      redirectTo: '/view',
    };

    return (
      <Router>
        <div ref={this.appContainer}>
          <Switch>
            <GatherRoute
              path="/index.html"
              exact
              redirectConditions={[{ redirectTo: '/', redirectIf: true }]}
            />
            <GatherRoute
              exact={true}
              path="/"
              component={Home}
              redirectConditions={[LoggedInConditions]}
            />
            <GatherRoute
              exact={true}
              path="/login"
              // @ts-ignore
              render={props => (
                <Login {...props} updateToken={this.updateToken} />
              )}
              redirectConditions={[LoggedInConditions]}
            />
            <GatherRoute
              exact={true}
              path="/view"
              component={View}
              redirectConditions={[NotLoggedInConditions]}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
