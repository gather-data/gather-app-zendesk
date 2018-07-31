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
  requester?: IRequester;
  activeTab: string;
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
      activeTab: 'modules',
      error: null,
      isPending: true,
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

  public updateTab = (activeTab: string) => this.setState({ activeTab });

  public render() {
    const {
      activeTab,
      isPending,
      zendeskFetchData,
      error,
      requester,
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
        activeTab={activeTab}
        updateTab={this.updateTab}
        zendeskFetchData={zendeskFetchData}
        error={error}
        email={requester['ticket.requester'].email}
        {...this.props}
      />
    );
  }
}

export default ViewContainer;
