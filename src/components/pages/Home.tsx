import { Flex, Link, LinkTypes, Text, TextTypes } from 'gather-style';
import * as React from 'react';

import zafClient from '../../utils/zaf';

class Auth extends React.Component<{}, {}> {
  public componentDidMount() {
    zafClient.invoke('resize', {
      // Add extra for buffer
      height: '150px',
      width: '100%',
    });
  }

  public render() {
    return (
      <Flex flow="column">
        <Flex
          mt={1}
          mb={2}
          ph={2}
          flow="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Text mb={1} type={TextTypes.HEADING_4}>
            Welcome to Gather!
          </Text>
          <Flex justifyContent="center">
            <Text type={TextTypes.BODY} mb={3}>
              Already have an account?
            </Text>
            <Link ml={1} type={LinkTypes.TEXT} to="/login" mb={3}>
              Log In
            </Link>
          </Flex>
        </Flex>
        <Link
          type={LinkTypes.BUTTON_PRIMARY}
          href="https://app.gatherdata.co/signup"
          fullWidth
        >
          Get Started For Free
        </Link>
      </Flex>
    );
  }
}

export default Auth;
