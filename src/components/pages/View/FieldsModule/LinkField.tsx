import { Link, LinkTypes } from 'gather-style';
import * as React from 'react';
// @ts-ignore
import IOSArrowRight from 'react-icons/lib/io/ios-arrow-right';

const LinkField: React.SFC<{
  children: React.ReactNode;
  to?: string;
  href?: string;
  icon?: React.ReactNode;
}> = ({ children, to, href, icon = <IOSArrowRight size={16} /> }) => (
  <Link
    target="_blank"
    to={to}
    href={href}
    type={LinkTypes.TEXT}
    size="small"
    icon={icon}
    iconEnd
  >
    {children}
  </Link>
);

export default LinkField;
