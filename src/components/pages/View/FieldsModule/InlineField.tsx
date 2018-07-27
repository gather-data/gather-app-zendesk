import { colors, mb, mh, Text, TextTypes } from 'gather-style';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  ${mb(0.5)};
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px dotted ${colors.border};
  flex: 1 0 40px;
  ${mh(1)};
`;

const StyledText = styled(Text)`
  flex: 0 1 auto;
`;

const ChildContainer = styled.div`
  flex: 0 1 auto;
  white-space: pre-line;
`;

const InlineField: React.SFC<{ children: React.ReactNode; name: string }> = ({
  children,
  name,
}) => (
  <Container>
    <StyledText type={TextTypes.BODY_SMALL}>{name}</StyledText>
    <Divider />
    <ChildContainer>{children}</ChildContainer>
  </Container>
);

export default InlineField;
