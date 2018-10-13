import {
  border,
  borderRadius,
  colors,
  mh,
  mv,
  pb,
  ph,
  pt,
  Text,
  TextTypes,
} from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import styled from 'styled-components';

import { IViewEvent } from '../types';

import Footer from './Footer';
import TimelineItem from './TimelineItem';

const Container = styled.div`
  ${border};
  ${borderRadius};
  background: ${colors.white};
  overflow: hidden;

  ${ph(2)};
  ${pt(1.5)};
  ${pb(1.5)};
`;

const ItemContainer = styled.div`
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    width: 1px;
    background: ${colors.border};
    position: absolute;
    top: 4px;
    left: 7.5px;
    bottom: 38px;
    z-index: -1;
  }
`;

const Divider =
  styled.div <
  { stretch: boolean } >
  `
  height: 1px;
  width: 100%;
  background: ${colors.border};
  ${mv(1)};

  ${(props: { stretch?: boolean }) =>
    props.stretch &&
    `
    // @ts-ignore
    ${mh(-3)(props)};
    width: auto;
  `};
`;

interface IViewProps {
  modelEvents: IViewEvent[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
  changePage: (next: boolean) => void;
}

class View extends React.Component<IViewProps, {}> {
  // @ts-ignore
  private container: React.RefObject<HTMLDivElement>;

  public constructor(props: IViewProps) {
    super(props);
    this.container = React.createRef();
  }

  public render() {
    const {
      changePage,
      currentPage,
      totalPages,
      totalResults,
      perPage,
      modelEvents,
    } = this.props;

    return (
      <Container>
        <Text heavy type={TextTypes.BODY_SMALL}>
          Timeline
        </Text>
        <Divider stretch />
        <ItemContainer>
          {modelEvents.map(modelEvent => (
            <TimelineItem key={modelEvent.id} modelEvent={modelEvent} />
          ))}
        </ItemContainer>
        <Footer
          totalResults={totalResults}
          currentPage={currentPage}
          pageSize={perPage}
          changePage={changePage}
          totalPages={totalPages}
        />
      </Container>
    );
  }
}

export default View;
