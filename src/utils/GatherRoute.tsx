import * as React from 'react';
import * as ReactRouter from 'react-router';
import { Redirect, Route } from 'react-router-dom';

type RedirectConditions = Array<{
  redirectIf: boolean | ((props: any) => boolean);
  redirectTo: string;
}>;

type DisableRenderConditions = Array<boolean | ((props: any) => boolean)>;

function renderRedirectRoute(
  redirectConditions: RedirectConditions,
  props: any,
  path: string,
  ComponentToRender?: React.ComponentClass<any>,
  renderFunction?: (props: any) => React.ReactNode,
) {
  let component;

  if (ComponentToRender) {
    component = <ComponentToRender {...props} />;
  } else if (renderFunction) {
    component = renderFunction(props);
  }

  redirectConditions.forEach(({ redirectIf, redirectTo }) => {
    if (typeof redirectIf === 'function') {
      redirectIf = redirectIf({ path });
    }

    if (redirectIf) {
      component = <Redirect to={redirectTo} />;
    }
  });

  return component;
}

interface IRouteProps extends ReactRouter.RouteProps {
  path: string;
  component?: React.ComponentClass<any>;
  render?: () => React.ReactNode;
  redirectConditions?: RedirectConditions;
  disableRenderConditions?: DisableRenderConditions;
}

const GatherRoute: React.SFC<IRouteProps> = ({
  component: ComponentToRender,
  render: renderFunction,
  path,
  redirectConditions = [],
  disableRenderConditions = [],
  ...rest
}) => (
  <Route
    {...rest}
    // tslint:disable-next-line
    render={(props: any) => {
      let disable;
      disableRenderConditions.forEach(disableCondition => {
        if (typeof disableCondition === 'function') {
          disable = disableCondition({ path });
        } else if (disableCondition) {
          disable = true;
        }
      });

      if (disable) {
        return null;
      }

      return renderRedirectRoute(
        redirectConditions,
        props,
        path,
        ComponentToRender,
        renderFunction,
      );
    }}
  />
);

export default GatherRoute;
