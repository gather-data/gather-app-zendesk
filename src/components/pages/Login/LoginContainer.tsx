import * as React from 'react';
import * as ReactRouter from 'react-router';

import { post } from '../../../utils/fetch';

import Login from './Login';

interface IState {
  email: string;
  password: string;
  error: string | null;
}

interface IProps extends ReactRouter.RouteComponentProps<{}> {
  updateToken: () => void;
}

interface ISession {
  token: string;
}

class LoginContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      error: null,
      password: '',
    };
  }

  public onChange = (field: 'email' | 'password', value: string) =>
    // @ts-ignore
    this.setState({ [field]: value });

  public onLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { history, updateToken } = this.props;

    // Reset error
    this.setState({
      error: null,
    });

    try {
      const session = await post<ISession>('/auth/email', {
        data: {
          password,
          usernameOrEmail: email,
        },
      });
      const token = session.token;
      localStorage.setItem('token', token);
      updateToken();
      history.push('/view');
    } catch (error) {
      this.setState({
        error: error.message.detail,
      });
    }
  };

  public isValid = () => {
    const { email, password } = this.state;
    return Boolean(email && password);
  };

  public render() {
    const { email, password, error } = this.state;

    const isValid = this.isValid();

    return (
      <Login
        onChange={this.onChange}
        email={email}
        password={password}
        error={error}
        isValid={isValid}
        onLogin={this.onLogin}
      />
    );
  }
}

export default LoginContainer;
