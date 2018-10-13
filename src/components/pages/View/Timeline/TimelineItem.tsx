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
  modelEvent: IViewEvent;
}

const TimelineItem: React.SFC<IProps> = ({ modelEvent, ...rest }) => {
  const type = modelEvent.type;

  const Component = typeToComponent[type];

  if (!Component) {
    throw new Error(`Unsupport timeline type: ${type}`);
  }

  return <Component modelEvent={modelEvent} {...rest} />;
};

export default TimelineItem;
