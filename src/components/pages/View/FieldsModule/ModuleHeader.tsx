import { colors, Link, LinkTypes } from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IProps {
  name: string;
  href?: string;
}

const ModuleHeader: React.SFC<IProps> = ({ name, href }) => (
  <Container>
    <Link
      color={colors.navy}
      type={LinkTypes.TEXT}
      size="large"
      heavy
      href={href}
    >
      {name}
    </Link>
  </Container>
);

export default ModuleHeader;
