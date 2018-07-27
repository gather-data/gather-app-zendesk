import { Text, TextTypes } from 'gather-style';
import * as React from 'react';

const TextField: React.SFC<{
  align: string;
  value: string;
}> = ({ value, align }) => (
  <Text align={align} type={TextTypes.BODY_SMALL} heavy>
    {value}
  </Text>
);

export default TextField;
