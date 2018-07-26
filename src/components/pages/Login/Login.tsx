import {
  border,
  borderRadius,
  colors,
  Flex,
  Link,
  LinkTypes,
  p,
  ph,
  pv,
  Text,
  TextTypes,
} from 'gather-style';
import * as React from 'react';
import styled from 'styled-components';

import zafClient from '../../../utils/zaf';

const Input = styled.input`
  ${border};
  ${borderRadius};
  ${ph(2)};
  ${pv(1)};

  font-size: ${14 / 16}rem;
  font-family: Rubik, Helvetica, sans-serif;
  color: ${colors.text};
  outline: 0;
`;

const Form = styled.form`
  width: 100%;
`;

const Error = styled(Text)`
  ${border};
  ${borderRadius};
  ${p(2)};
`;

interface ILoginProps {
  onChange: (field: 'email' | 'password', value: string) => void;
  email: string;
  password: string;
  isValid: boolean;
  onLogin: (event: React.FormEvent) => void;
  error: string | null;
}

class Login extends React.Component<ILoginProps, {}> {
  public componentDidMount() {
    zafClient.invoke('resize', {
      // Add extra for buffer
      height: '400px',
      width: '100%',
    });
  }

  public render() {
    const { onChange, email, password, isValid, onLogin, error } = this.props;

    return (
      <Flex flow="column">
        <Flex
          mt={1}
          mb={1}
          ph={2}
          flow="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Text mb={1} type={TextTypes.HEADING_4}>
            Welcome!
          </Text>
          <Text align="center" type={TextTypes.BODY_SMALL}>
            To get started, log in with Gather below.
          </Text>
        </Flex>
        <Form>
          {error && (
            <Error
              mt={2}
              mb={2}
              color={colors.red}
              heavy
              type={TextTypes.BODY_SMALL}
            >
              {error}
            </Error>
          )}
          <Flex
            mb={2}
            mt={2}
            flow="column"
            alignItems="stretch"
            justifyContent="flex-start"
          >
            <Text mb={1} type={TextTypes.BODY_TINY} heavy>
              Email
            </Text>
            <Input
              onChange={event => onChange('email', event.target.value)}
              value={email}
            />
          </Flex>
          <Flex
            flow="column"
            alignItems="stretch"
            justifyContent="flex-start"
            mb={3}
          >
            <Text mb={1} type={TextTypes.BODY_TINY} heavy>
              Password
            </Text>
            <Input
              type="password"
              onChange={event => onChange('password', event.target.value)}
              value={password}
            />
          </Flex>
          <Link
            disabled={!isValid}
            type={LinkTypes.BUTTON_PRIMARY}
            onClick={onLogin}
            fullWidth
          >
            Log in
          </Link>
        </Form>
      </Flex>
    );
  }
}

export default Login;
