import { Flex, Link, LinkTypes, mb, Text, TextTypes } from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import * as ReactRouter from 'react-router';
import styled from 'styled-components';

import zaf from '../../../../utils/zaf';

import FieldsModule from '../FieldsModule';
import { IZendeskFetchData } from '../types';

const Container = styled.div`
  position: relative;
`;

const ModuleContainer = styled.div`
  &:not(:last-child) {
    ${mb(2)};
  }
`;

interface IViewProps extends ReactRouter.RouteComponentProps<{}> {
  zendeskFetchData: IZendeskFetchData | null;
  error: string | null;
  email: string;
}

class View extends React.Component<IViewProps, {}> {
  // @ts-ignore
  private container: React.RefObject<HTMLDivElement>;

  public constructor(props: IViewProps) {
    super(props);
    this.container = React.createRef();
  }

  public componentDidMount() {
    const { error } = this.props;

    if (!error) {
      zaf.invoke('resize', {
        // Add extra for buffer
        height:
          `${this.container &&
            this.container.current &&
            this.container.current.offsetHeight + 65}px` || '600px',
        width: '100%',
      });
    }
  }

  public render() {
    const { zendeskFetchData, error, email } = this.props;

    if (error || !zendeskFetchData) {
      return (
        <Flex flow="column" pt={2}>
          <Text type={TextTypes.BODY_SMALL} ph={4} align="center">
            {error || 'Could not find info for this customer'}
          </Text>
          {error &&
            error.includes('Zendesk') && (
              <Link
                type={LinkTypes.BUTTON_PRIMARY}
                mt={3}
                icon={<IOSArrowRight size={20} />}
                iconEnd
                href="https://app.gatherdata.co/dashboard/settings/team/apps/zendesk"
              >
                Configure Zendesk
              </Link>
            )}
        </Flex>
      );
    }

    return (
      <Container innerRef={this.container}>
        {zendeskFetchData.modules.map(m => (
          <ModuleContainer>
            <FieldsModule
              name={m.name}
              data={m.data}
              error={m.error}
              displayFields={m.display_fields}
              viewsByViewId={zendeskFetchData.views_by_id}
              view={zendeskFetchData.view}
              emailField={zendeskFetchData.email_field}
              email={email}
            />
          </ModuleContainer>
        ))}
      </Container>
    );
  }
}

export default View;
