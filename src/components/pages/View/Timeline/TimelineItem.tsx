import * as React from 'react';
// @ts-ignore
import IOSArrowDown from 'react-icons/lib/io/ios-arrow-down';

import { IViewEvent } from '../types';

import TimelineActionItem from './TimelineActionItem';
import TimelineNoteItem from './TimelineNoteItem';

const typeToComponent = {
  action: TimelineActionItem,
  note: TimelineNoteItem,
};

interface IProps {
  viewEvent: IViewEvent;
}

const TimelineItem: React.SFC<IProps> = ({ viewEvent, ...rest }) => {
  const type = viewEvent.type;

  const Component = typeToComponent[type];

  if (!Component) {
    throw new Error(`Unsupport timeline type: ${type}`);
  }

  return <Component viewEvent={viewEvent} {...rest} />;
};

export default TimelineItem;
