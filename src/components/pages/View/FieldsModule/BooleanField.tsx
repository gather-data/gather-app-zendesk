import { colors, ph, Text, TextTypes } from 'gather-style';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.color};
  border-radius: 2px;

  ${ph(1)};
`;

const StyledText = styled(Text)``;

const BooleanField: React.SFC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Container color={children ? colors.purple : colors.red}>
    <StyledText color={colors.white} type={TextTypes.BODY_SMALL} heavy>
      {Boolean(children).toString()}
    </StyledText>
  </Container>
);

export default BooleanField;
