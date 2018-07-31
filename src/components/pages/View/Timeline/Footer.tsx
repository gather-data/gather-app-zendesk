import { colors, Link, LinkTypes, mr, pt, Text, TextTypes } from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowLeft from 'react-icons/lib/io/ios-arrow-left';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import styled from 'styled-components';

const Container =
  styled.div <
  { showBorder: boolean } >
  `
  background: ${colors.white};
  display: flex;
  align-items: center;
  flex-flow: row;
  ${props => props.showBorder && `border-top: 1px solid ${colors.border}`};

  ${pt(2)};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ResultsCountContainer = styled.div`
  display: flex;
  align-items: center;
  ${mr(3)};
`;

interface IProps {
  totalResults: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  changePage: (next: boolean) => void;
}

const ListViewFooter: React.SFC<IProps> = ({
  totalResults,
  currentPage,
  pageSize,
  changePage,
  totalPages,
}) => (
  <Container showBorder={totalResults !== 0}>
    <LeftContainer>
      <Text mr={1} type={TextTypes.BODY_SMALL} heavy>
        {totalResults}
      </Text>
      <Text type={TextTypes.BODY_SMALL}>events</Text>
    </LeftContainer>
    <RightContainer>
      <ResultsCountContainer>
        <Text type={TextTypes.BODY_SMALL} ml={2} mr={1}>
          Showing
        </Text>
        <Text type={TextTypes.BODY_SMALL} heavy>
          {1 + (currentPage - 1) * pageSize} -{' '}
          {Math.min(currentPage * pageSize, totalResults)}
        </Text>
      </ResultsCountContainer>
      <Link
        color={colors.navy}
        disabled={currentPage <= 1}
        onClick={() => changePage(false)}
        type={LinkTypes.BUTTON_DEFAULT}
        size="small"
        mr={1}
      >
        <IOSArrowLeft size={16} />
      </Link>
      <Link
        color={colors.navy}
        disabled={currentPage >= totalPages}
        onClick={() => changePage(true)}
        type={LinkTypes.BUTTON_DEFAULT}
        size="small"
      >
        <IOSArrowRight size={16} />
      </Link>
    </RightContainer>
  </Container>
);

export default ListViewFooter;
