import { Flex, Link, LinkTypes, Text, TextTypes } from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';

import zaf from '../../../utils/zaf';

import FieldsModule from './FieldsModule';
import { IZendeskFetchData } from './types';

interface IViewProps {
  zendeskFetchData: IZendeskFetchData | null;
  error: string | null;
  email: string;
}

class View extends React.Component<IViewProps, {}> {
  public componentDidMount() {
    const { error } = this.props;

    if (!error) {
      zaf.invoke('resize', {
        // Add extra for buffer
        height: '600px',
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
      <div>
        {zendeskFetchData.modules.map(m => (
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
        ))}
      </div>
    );
  }
}

export default View;
