import * as querystring from 'querystring';

import {
  border,
  borderRadius,
  colors,
  Link,
  mh,
  mt,
  mv,
  pb,
  ph,
  pt,
  Text,
  TextTypes,
} from 'gather-style';
import { sortBy, startCase } from 'lodash';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';
import styled from 'styled-components';

import { IModuleFetchData, IView } from '../types';

import getFieldProps from './getFieldProps';
import LinkField from './LinkField';
import ModuleHeader from './ModuleHeader';

const Container = styled.div`
  ${border};
  ${borderRadius};
  background: ${colors.white};
  overflow: hidden;

  ${ph(2)};
  ${pt(1.5)};
  ${pb(1.5)};
`;

const Divider =
  styled.div <
  { stretch: boolean } >
  `
  height: 1px;
  width: 100%;
  background: ${colors.border};
  ${mv(1)};

  ${(props: { stretch?: boolean }) =>
    props.stretch &&
    `
    // @ts-ignore
    ${mh(-3)(props)};
    width: auto;
  `};
`;

const ManyLinkContainer = styled.div``;

// @ts-ignore
const ManyLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:nth-child(2)) {
    ${mt(1)};
    ${pt(1)};
    border-top: 1px solid ${colors.border};
  }
  width: auto;
`;

const ManyLinkText = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled(Text)`
  border-radius: 14px;
  background: ${colors.navy};
  ${ph(1)};
`;

function renderCell(
  dataEntry: [string, any],
  viewsByViewId: { [index: string]: IView },
  moduleData: IModuleFetchData,
) {
  if (!moduleData) {
    return null;
  }

  const name = dataEntry[0];
  const prettyName = startCase(name);
  const value = dataEntry[1];
  const typeInfo = moduleData.field_types && moduleData.field_types[name];

  const fieldProps = getFieldProps(value, typeInfo);

  // Override if the field is a relation
  const relation = moduleData.relations.toOne[name];
  if (relation) {
    const view = viewsByViewId[relation.to_table];
    if (view) {
      fieldProps.value =
        moduleData.field_display_names[name] || fieldProps.value;
      const href = `https://app.gatherdata.co/dashboard/views/details/${
        view.id
      }?${querystring.stringify({
        [relation.to_column]: moduleData.item[name],
      })}`;
      fieldProps.fieldComponent = (
        <LinkField href={href}>{fieldProps.value}</LinkField>
      );
    }
  }

  return (
    // @ts-ignore
    <fieldProps.ContainerComponent name={prettyName}>
      {fieldProps.fieldComponent}
    </fieldProps.ContainerComponent>
  );
}

interface IModuleProps {
  data: null | IModuleFetchData;
  displayFields: string[];
  name: string;
  viewsByViewId: { [index: string]: IView };
  error: null | {
    detail: string;
  };
  emailField: string;
  view: IView;
  email: string;
}

const Module: React.SFC<IModuleProps> = ({
  name,
  data,
  viewsByViewId,
  displayFields,
  error,
  emailField,
  view,
  email,
}) => {
  if (!data) {
    return (
      <Container>
        <ModuleHeader name={name} />
        <Divider stretch />
        <Text type={TextTypes.BODY}>{error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <ModuleHeader
        name={name}
        href={
          data.item[emailField] &&
          `https://app.gatherdata.co/dashboard/views/details/${
            view.id
          }?${emailField}=${data.item[emailField]}`
        }
      />
      <Divider stretch />
      {sortBy(
        Object.entries(data.item).filter(
          dataEntry =>
            displayFields.length ? displayFields.includes(dataEntry[0]) : true,
        ),
        (dataEntry: [string, any]) => displayFields.indexOf(dataEntry[0]),
      ).map((dataEntry: [string, any]) =>
        renderCell(dataEntry, viewsByViewId, data),
      )}
      {Boolean(
        data.relations.toMany.filter(
          relation => viewsByViewId[relation.from_table],
        ).length,
      ) && (
        <ManyLinkContainer>
          <Divider stretch />
          {data.relations.toMany
            .filter(relation => viewsByViewId[relation.from_table])
            .map(relation => {
              const relatedView = viewsByViewId[relation.from_table];

              return [
                <ManyLink
                  key={relation.from_table}
                  underline={false}
                  color={colors.text}
                  href={`https://app.gatherdata.co/dashboard/views/lists/${
                    relatedView.id
                  }?${querystring.stringify({
                    [relation.from_column]: data.item[relation.to_column],
                  })}`}
                >
                  <ManyLinkText>
                    <Text mr={1} type={TextTypes.BODY_SMALL} heavy>
                      {relation.from_table}
                    </Text>
                    {relation.count !== null && (
                      <Count
                        color={colors.white}
                        type={TextTypes.BODY_SMALL}
                        heavy
                      >
                        {relation.count}
                      </Count>
                    )}
                  </ManyLinkText>
                  <IOSArrowRight size={16} />
                </ManyLink>,
              ];
            })}
        </ManyLinkContainer>
      )}
    </Container>
  );
};

export default Module;
