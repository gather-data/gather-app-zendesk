import { colors, height, mb, mr, Text, TextTypes, width } from 'gather-style';
import * as moment from 'moment';
import * as React from 'react';
// @ts-ignore
import IOSCompose from 'react-icons/lib/io/ios-compose-outline';
import styled from 'styled-components';

import { IViewEvent } from '../types';

const Container = styled.div`
  display: flex;
  ${mb(3)};
`;

const InnerContainer = styled.div`
  flex: 1;
`;

const StyledIcon = styled(IOSCompose)`
  background: ${colors.white};
  margin-top: 4px;
  transform: scale(1.5) translate(1px, 0);
  ${width(2)};
  ${height(2)};
  ${mr(2)};
`;

const InfoContainer = styled.div``;

interface IProps {
  modelEvent: IViewEvent;
}

const TimelineNoteItem: React.SFC<IProps> = ({ modelEvent }) => {
  const user = `${modelEvent.user.first_name} ${modelEvent.user.last_name}`;
  const date = modelEvent.created_time;
  const note = modelEvent.note;

  return (
    <Container>
      <StyledIcon color={colors.blue} />
      <InnerContainer>
        <InfoContainer>
          <Text type={TextTypes.BODY} heavy>{`${user} left a note`}</Text>
          <Text type={TextTypes.BODY_SMALL}>
            {moment(date).format('MMM D, h:mmA')}
          </Text>
        </InfoContainer>
        <Text mt={1} type={TextTypes.BODY}>
          {note}
        </Text>
      </InnerContainer>
    </Container>
  );
};

export default TimelineNoteItem;
