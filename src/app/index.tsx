import React, { Component, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import LazyPage from '../lazyPage';
import RouteUtils, { IQuery } from './routeUtils';

interface IAppInitPops {
  wrapper?: HTMLElement | null;
  root?: string;
  pages: {
    [pageName: string]: Component | FunctionComponent | Function | LazyPage;
  };
}

interface IRouteParams {
  path: string;
  query?: IQuery;
}

enum RouteAction {
  FORWARD,
  BACK,
  REFRESH,
  INIT,
}

class App {
  public initProps?: IAppInitPops;
  private routeSeed: number = 0;
  public routeAction: RouteAction = RouteAction.INIT;

  public init = (params: IAppInitPops): void => {
    this.initProps = params;
    RouteUtils.setRouteSeedKey('__r');
    this.routeSeed = RouteUtils.getUrlInfo().routeSeed;
    const root: HTMLElement = params.wrapper || document.body;
    ReactDOM.render(<Root config={this.initProps} />, root);
  };
  public go = (path: string, query?: IQuery): void => {
    this.routeAction = RouteAction.FORWARD;
    if (query) {
      delete query[RouteUtils.routeSeedKey];
    }
    window.location.hash = RouteUtils.combinePathAndQuery(path, this.prepareaQuery(query));
  };

  private prepareaQuery = (query?: IQuery): IQuery => {
    this.routeSeed += 1;
    if (query) {
      query[RouteUtils.routeSeedKey] = this.routeSeed;
      return query;
    } else {
      return {
        [RouteUtils.routeSeedKey]: this.routeSeed,
      };
    }
  };

  public back = (params: IRouteParams): void => {
    this.routeAction = RouteAction.BACK;
    window.history.go(-1);
  };
}

export default new App();
