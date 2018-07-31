import {
  colors,
  Flex,
  Link,
  LinkTypes,
  mr,
  pr,
  Text,
  TextTypes,
} from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import styled from 'styled-components';

import Modules from './Modules';
import Timeline from './Timeline';
import { IZendeskFetchData } from './types';

// @ts-ignore
const StyledLink = styled(Link)`
  &:not(:last-child) {
    ${mr(2)};
    ${pr(2)};
    border-right: 1px solid ${colors.border};
  }
`;

const tabs = {
  modules: {
    Component: Modules,
    label: 'Customer',
  },
  timeline: {
    Component: Timeline,
    label: 'Timeline',
  },
};

interface IProps {
  activeTab: string;
  error: string | null;
  updateTab: (tab: string) => void;
  zendeskFetchData: IZendeskFetchData | null;
  email: string;
}

class View extends React.Component<IProps, {}> {
  public render() {
    const { activeTab, error, updateTab, zendeskFetchData } = this.props;
    const { Component } = tabs[activeTab];

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
        <Flex mb={1} flow="row" alignItems="center">
          {Object.entries(tabs).map(([key, info]) => (
            <StyledLink
              onClick={() => updateTab(key)}
              type={LinkTypes.TEXT}
              heavy={key === activeTab}
              mr={1}
            >
              {info.label}
            </StyledLink>
          ))}
        </Flex>
        <Component {...this.props} />
      </div>
    );
  }
}

export default View;
