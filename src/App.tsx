import {
  border,
  borderRadius,
  boxShadow,
  colors,
  Flex,
  Link,
  LinkTypes,
  p,
} from 'gather-style';
import * as History from 'history';
import createMemoryHistory from 'history/createMemoryHistory';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import { Router, Switch } from 'react-router';
import styled from 'styled-components';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import View from './components/pages/View';
import GatherRoute from './utils/GatherRoute';

interface IAppState {
  isLoggedIn: boolean;
  showModal: boolean;
}

const Container = styled.div`
  position: relative;
`;

const Modal = styled(Flex)`
  background: ${colors.white};
  ${borderRadius};
  ${border};
  ${boxShadow};
  ${p(3)};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

class App extends React.Component<{}, IAppState> {
  private appContainer: React.RefObject<any>;
  private history: History.History;

  constructor(props: {}) {
    super(props);
    this.appContainer = React.createRef();

    this.state = {
      isLoggedIn: Boolean(localStorage.getItem('token')),
      showModal: false,
    };

    this.history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });
  }

  public componentWillUpdate() {
    if (!this.state.isLoggedIn) {
      this.updateToken();
    }
  }

  public componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  public handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case '?':
        if (!this.state.showModal) {
          this.setState({ showModal: true });
        }
        return;
      case 'Escape':
        if (this.state.showModal) {
          this.setState({ showModal: false });
        }
        return;
    }
  };

  public handleLogout = () => {
    localStorage.removeItem('token');

    this.history.replace('/');
  };

  public updateToken = () => {
    this.setState({
      isLoggedIn: Boolean(localStorage.getItem('token')),
    });
  };

  public render() {
    const { isLoggedIn, showModal } = this.state;

    const NotLoggedInConditions = {
      redirectIf: !isLoggedIn,
      redirectTo: '/',
    };

    const LoggedInConditions = {
      redirectIf: isLoggedIn,
      redirectTo: '/view',
    };

    return (
      <Router history={this.history}>
        <Container ref={this.appContainer}>
          <Switch>
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
          {showModal && (
            <Modal flow="column" alignItems="stretch">
              <Link
                type={LinkTypes.BUTTON_DEFAULT}
                mt={3}
                icon={<IOSArrowRight size={20} />}
                iconEnd
                onClick={this.handleLogout}
              >
                Logout
              </Link>
            </Modal>
          )}
        </Container>
      </Router>
    );
  }
}

export default App;
