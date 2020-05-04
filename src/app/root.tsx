import React, { ReactElement, useEffect, useState } from 'react';
import Route, { IRouteProps } from '../route';
import RouteUtils, { IURLInfo } from './routeUtils';

const Root = (props): ReactElement => {
  const getPath = (): IRouteProps => {
    const urlInfo: IURLInfo = RouteUtils.getUrlInfo();
    return {
      path: urlInfo.pagename,
      seed: urlInfo.routeSeed,
    };
  };
  const [routeProps, setRouteProps] = useState<IRouteProps>(getPath());
  const urlChange = (): void => {
    setRouteProps(getPath());
  };
  useEffect(() => {
    window.onhashchange = (): void => {
      urlChange();
    };
  });

  return <Route {...routeProps} />;
};

export default Root;
