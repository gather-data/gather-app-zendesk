import { colors, ph, Text, TextTypes } from 'gather-style';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${colors.primary};
  border-radius: 2px;

  ${ph(1)};
`;

const EnumField: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>
    <Text color={colors.white} type={TextTypes.BODY_SMALL} heavy>
      {children}
    </Text>
  </Container>
);

export default EnumField;
