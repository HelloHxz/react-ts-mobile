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
    window.location.hash = RouteUtils.combinePathAndQuery(path, this.prepareaQuery(path, query));
  };

  private prepareaQuery = (path: string, query?: IQuery): IQuery => {
    const curPathArr = RouteUtils.getPathArr();
    const goToPathArr = RouteUtils.getPathArr(path);
    // 如果是嵌套页面跳转到根页面一样的页面 那么就刷新当前内嵌页面
    if (curPathArr.length === 1 && goToPathArr.length === 1) {
      this.routeSeed += 1;
    } else if (curPathArr[0] !== goToPathArr[0]) {
      this.routeSeed += 1;
    }
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
