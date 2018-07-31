import {
  border,
  borderRadius,
  colors,
  mt as _mt,
  p,
  pb,
  ph,
  Text,
  TextTypes,
} from 'gather-style';
import * as React from 'react';
import styled from 'styled-components';

const Container =
  styled.div <
  { mt: number } >
  `
  ${border};
  ${borderRadius};
  position: relative;
  ${p(2)};
  ${props => props.mt && _mt(props.mt)(props)};
  ${props => props.title && pb(1)};
`;

const TitleContainer = styled.div`
  background: ${colors.white};
  display: flex;
  align-items: center;
  position: absolute;
  left: 8px;
  top: -10.5px;
  ${ph(1)};
`;

interface IProps {
  title: string;
  titleIcon: React.ReactElement<{}>;
  children: React.ReactNode;
  mt?: number;
}

const Box: React.SFC<IProps> = ({ title, titleIcon, children, mt = 0 }) => (
  <Container mt={mt} title={title}>
    {title && (
      <TitleContainer>
        <Text mr={titleIcon ? 0.5 : 0} type={TextTypes.BODY_SMALL} heavy>
          {title}
        </Text>
        {titleIcon}
      </TitleContainer>
    )}
    {children}
  </Container>
);

export default Box;
