import * as moment from 'moment';
import * as React from 'react';
// @ts-ignore
import IOSEmailOutline from 'react-icons/lib/io/ios-email-outline';
// @ts-ignore
import IOSTelephoneOutline from 'react-icons/lib/io/ios-telephone-outline';

import BooleanField from './BooleanField';
import EnumField from './EnumField';
import InlineField from './InlineField';
import LinkField from './LinkField';
import TextField from './TextField';

function fillTemplate(templateString: string, templateVars: any) {
  // eslint-disable-next-line
  return new Function(`return \`${templateString}\`;`).call(templateVars);
}

interface IDateTypeInfo {
  format: string;
  fromNow: boolean;
}

function renderMoment(m: moment.Moment, typeInfo: IDateTypeInfo) {
  const format = typeInfo.format || 'MM/DD/YY h:mm a';
  const fromNow = typeInfo.fromNow;

  if (m.isValid()) {
    if (fromNow) {
      return m.fromNow();
    }

    return m.format(format);
  }

  return null;
}

function renderTimestamp(value: string, typeInfo: IDateTypeInfo) {
  const m = moment.unix(parseInt(value, 10));
  return { value: renderMoment(m, typeInfo) || value };
}

function renderIso8601(value: string, typeInfo: IDateTypeInfo) {
  const m = moment(value);
  return { value: renderMoment(m, typeInfo) || value };
}

function renderEnum(
  value: string,
  typeInfo: { enumMap: { [index: string]: string } },
) {
  let newValue = value;

  if (typeInfo.enumMap) {
    newValue = typeInfo.enumMap[value.toString()] || value;
  }

  return { value: newValue, fieldComponent: <EnumField>{newValue}</EnumField> };
}

function renderCurrency(value: string, typeInfo: { currency: string }) {
  const currency = typeInfo.currency || 'USD';
  const currencySymbolMap = {
    CAD: '$',
    EUR: '€',
    GBP: '£',
    USD: '$',
  };
  const symbol = currencySymbolMap[currency];

  return {
    value: `${symbol}${value}`,
  };
}

function renderPercentage(value: string) {
  return {
    value: `${value}%`,
  };
}

function renderUrl(value: string, typeInfo: { template: string }) {
  const template = typeInfo.template;
  let href = value;

  try {
    href = fillTemplate(template, {
      value,
    });
  } catch (error) {
    // pass
  }

  return {
    fieldComponent: <LinkField href={href}>{value}</LinkField>,
    value,
  };
}

function renderEmail(value: string) {
  return {
    fieldComponent: (
      <LinkField href={`mailto:${value}`} icon={<IOSEmailOutline size={16} />}>
        {value}
      </LinkField>
    ),
    value,
  };
}

function renderTel(value: string) {
  return {
    fieldComponent: (
      <LinkField href={`tel:${value}`} icon={<IOSTelephoneOutline size={16} />}>
        {value}
      </LinkField>
    ),
    value,
  };
}

function renderBoolean(value: string) {
  return {
    fieldComponent: <BooleanField>{value}</BooleanField>,
    value,
  };
}

const renderers = {
  boolean: renderBoolean,
  currency: renderCurrency,
  email: renderEmail,
  enum: renderEnum,
  iso8601: renderIso8601,
  percentage: renderPercentage,
  tel: renderTel,
  'unix-timestamp': renderTimestamp,
  url: renderUrl,
};

interface IFieldProps {
  value: string;
  ContainerComponent?: React.SFC;
  fieldComponent?: React.ReactNode;
}

function defaultRenderer(value: string, ...rest: any[]): IFieldProps {
  if (typeof value !== 'string') {
    return {
      value: JSON.stringify(value),
    };
  }

  return {
    value,
  };
}

export default (value: string, typeInfo: any) => {
  let renderer = defaultRenderer;

  if (typeInfo && renderers[typeInfo.type]) {
    renderer = renderers[typeInfo.type];
  }

  let fieldProps = renderer(value, typeInfo);

  // Defaults
  fieldProps = {
    ContainerComponent: InlineField,
    fieldComponent: <TextField align="right" value={fieldProps.value} />,
    ...fieldProps,
  };

  return fieldProps;
};
