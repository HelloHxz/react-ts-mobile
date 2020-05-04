import React, { ReactElement, useEffect, useState } from 'react';
import Route, { IRouteProps } from '../route';
import URLUtils, { IURLInfo } from './urlUtils';

const Root = (props): ReactElement => {
  const getPath = (): IRouteProps => {
    const urlInfo: IURLInfo = URLUtils.getUrlInfo();
    return {
      path: 'home',
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
