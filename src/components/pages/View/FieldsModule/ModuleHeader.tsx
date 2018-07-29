import { colors, Link, LinkTypes, Text, TextTypes } from 'gather-style';
import * as React from 'react';
// @ts-ignore
import ShareIcon from 'react-icons/lib/io/share';
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
    {href ? (
      <Link
        color={colors.navy}
        type={LinkTypes.TEXT}
        size="small"
        heavy
        href={href}
        icon={<ShareIcon size={16} />}
        iconEnd
      >
        {name}
      </Link>
    ) : (
      <Text type={TextTypes.BODY_SMALL} heavy>
        {name}
      </Text>
    )}
  </Container>
);

export default ModuleHeader;
