import { Flex, Text, TextTypes } from 'gather-style';
import * as React from 'react';
import styled from 'styled-components';

import { get } from '../../../../utils/fetch';
import Pending from '../../../partials/Pending';

import { IViewEventsResponse, IZendeskFetchData } from '../types';
import Timeline from './Timeline';

interface IProps {
  zendeskFetchData: IZendeskFetchData;
}

interface IState {
  isPending: boolean;
  modelEventsState: IViewEventsResponse | null;
  error: null | string;
  page: number;
}

const PendingContainer = styled(Flex)`
  height: 100%;
`;

class TimelineContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      error: null,
      isPending: true,
      modelEventsState: null,
      page: 1,
    };
  }

  public componentWillMount() {
    this.fetch();
  }

  public fetch = async (page: number = 1) => {
    const { zendeskFetchData } = this.props;

    // This is the entity ID used to index the events
    const entityId =
      zendeskFetchData.view_data[zendeskFetchData.view.model.pk_field[0]];
    const viewId = zendeskFetchData.view.id;

    let modelEventsState;
    try {
      modelEventsState = await get<IViewEventsResponse>('/events', {
        query: {
          id: entityId,
          page,
          view: viewId,
        },
      });
    } catch (error) {
      this.setState({
        error: error.message && error.message.detail,
        isPending: false,
      });
      return;
    }

    this.setState({
      isPending: false,
      modelEventsState,
    });
  };

  public changePage = async (next: boolean = true) => {
    const { modelEventsState } = this.state;

    if (!modelEventsState) {
      return;
    }

    const {
      page: currentPage,
      total_pages: totalPages,
    } = modelEventsState.meta;
    let nextPage = currentPage;

    if (next) {
      if (currentPage + 1 > totalPages) {
        return;
      }

      nextPage += 1;
    } else {
      if (currentPage - 1 < 0) {
        return;
      }

      nextPage -= 1;
    }

    await this.fetch(nextPage);
    window.scrollTo(0, 0);
  };

  public render() {
    const { isPending, modelEventsState, error } = this.state;

    if (isPending || !modelEventsState) {
      return (
        <PendingContainer pt={2} flow="column">
          <Pending center />
        </PendingContainer>
      );
    }

    if (error) {
      return (
        <Flex flow="column" pt={2}>
          <Text type={TextTypes.BODY_SMALL} ph={4} align="center">
            {error || 'Could not find info for this customer'}
          </Text>
        </Flex>
      );
    }

    const {
      page: currentPage,
      total_pages: totalPages,
      total_results: totalResults,
      per_page: perPage,
    } = modelEventsState.meta;

    return (
      <Timeline
        modelEvents={modelEventsState.model_events}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        perPage={perPage}
        changePage={this.changePage}
      />
    );
  }
}

export default TimelineContainer;
