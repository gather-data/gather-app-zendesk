import { Flex } from 'gather-style';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import styled from 'styled-components';

import { post } from '../../../utils/fetch';
import zaf from '../../../utils/zaf';
import Pending from '../../partials/Pending';

import { IZendeskFetchData } from './types';
import View from './View';

interface IRequester {
  'ticket.requester': {
    name: string;
    email: string;
  };
}

interface IState {
  isPending: boolean;
  zendeskFetchData: IZendeskFetchData | null;
  error: null | string;
  showModal: boolean;
  requester?: IRequester;
}

const PendingContainer = styled(Flex)`
  height: 100%;
`;

class ViewContainer extends React.Component<
  ReactRouter.RouteComponentProps<{}>,
  IState
> {
  constructor(props: ReactRouter.RouteComponentProps<{}>) {
    super(props);

    this.state = {
      error: null,
      isPending: true,
      showModal: false,
      zendeskFetchData: null,
    };
  }

  public componentWillMount() {
    this.fetch();
  }

  public fetch = async () => {
    const requester: IRequester = await zaf.get('ticket.requester');

    let zendeskFetchData;
    try {
      zendeskFetchData = await post<IZendeskFetchData>('/apps/zendesk/fetch', {
        data: {
          email: requester['ticket.requester'].email,
        },
      });
    } catch (error) {
      console.info(error.message && error.message.detail);
      this.setState({
        error: error.message && error.message.detail,
        isPending: false,
        requester,
      });
      return;
    }

    this.setState({
      isPending: false,
      requester,
      zendeskFetchData,
    });
  };

  public render() {
    const {
      isPending,
      zendeskFetchData,
      error,
      requester,
      showModal,
    } = this.state;

    if (isPending || !requester) {
      return (
        <PendingContainer pt={2} flow="column">
          <Pending center />
        </PendingContainer>
      );
    }

    return (
      <View
        zendeskFetchData={zendeskFetchData}
        error={error}
        email={requester['ticket.requester'].email}
        showModal={showModal}
        {...this.props}
      />
    );
  }
}

export default ViewContainer;
