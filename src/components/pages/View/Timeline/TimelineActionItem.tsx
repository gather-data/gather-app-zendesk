import { colors, height, mb, mr, Text, TextTypes, width } from 'gather-style';
import * as moment from 'moment';
import * as React from 'react';
// @ts-ignore
import IOSCompose from 'react-icons/lib/io/ios-compose-outline';
import styled from 'styled-components';

import SimpleBox from '../../../partials/SimpleBox';
import { IViewEvent } from '../types';

const Container = styled.div`
  display: flex;
  ${mb(3)};
`;

const InnerContainer = styled.div`
  flex: 1;
`;

const Cirle = styled.div`
  border-radius: 8px;
  border: 2px solid ${colors.primary};
  background: ${colors.white};
  margin-top: 4px;
  ${width(2)};
  ${height(2)};
  ${mr(2)};
`;

const InfoContainer = styled.div``;

interface IProps {
  viewEvent: IViewEvent;
}

const TimelineActionItem: React.SFC<IProps> = ({ viewEvent }) => {
  const title = viewEvent.action.name;
  const user = `${viewEvent.user.first_name} ${viewEvent.user.last_name}`;
  const date = viewEvent.created_time;
  const note = viewEvent.note;

  return (
    <Container>
      <Cirle />
      <InnerContainer>
        <InfoContainer>
          <Text type={TextTypes.BODY} heavy>
            {title}
          </Text>
          <Text type={TextTypes.BODY_SMALL}>
            {`${moment(date).format('MMM D, h:mmA')} by ${user}`}
          </Text>
        </InfoContainer>
        {note && (
          <SimpleBox
            mt={3}
            title="Note"
            titleIcon={<IOSCompose color={colors.navy} size={12} />}
          >
            <Text italic type={TextTypes.BODY}>
              {note}
            </Text>
          </SimpleBox>
        )}
      </InnerContainer>
    </Container>
  );
};

export default TimelineActionItem;
