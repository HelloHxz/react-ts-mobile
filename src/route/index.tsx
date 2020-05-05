import React, { ReactElement } from 'react';
import RouteUtils from '../app/routeUtils';
import PageView from '../pageView';

export interface IRouteProps {
  isRoot?: boolean;
  path: string;
  seed: number;
}

interface IStackItem {
  path: string;
  pageKey: string;
  seed: number;
  remainingPath: string;
  pageName: string;
}

interface IRouteState {
  path: string;
  seed: number;
  remainingPath: string;
  pageName: string;
  pageKey: string;
  historyStack: IStackItem[];
}

class Route extends React.Component<IRouteProps, IRouteState> {
  constructor(props: IRouteProps) {
    super(props);
    this.state = {
      path: '',
      seed: -1,
      pageName: '',
      remainingPath: '',
      pageKey: '',
      historyStack: [],
    };
  }
  static routeIsExist = (historyStack: IStackItem[], pageKey: string): boolean => {
    let re = false;
    for (let i = 0, j = historyStack.length; i < j; i += 1) {
      if (historyStack[i].pageKey === pageKey) {
        re = true;
        break;
      }
    }
    return re;
  };
  static getDerivedStateFromProps = (nextProps: IRouteProps, prevState: IRouteState): IRouteState | null => {
    const { path: nextPath, seed: nextSeed } = nextProps;
    const { path, seed, historyStack } = prevState;
    if (nextPath === path && seed === nextSeed) {
      return null;
    }
    const pathInfo = RouteUtils.getCurrentPageNameByRoutePath(nextPath);
    const pageName = pathInfo.pageName;
    const remainingPath = pathInfo.remaining;
    const pageKey = `${pageName}_${nextSeed}`;
    if (Route.routeIsExist(historyStack, pageKey)) {
      return null;
    }
    return {
      seed: nextSeed,
      path: nextPath,
      pageKey,
      pageName,
      remainingPath,
      historyStack: [...historyStack, { seed: nextSeed, path: nextPath, pageKey, pageName, remainingPath }],
    };
  };

  render = (): ReactElement => {
    const { historyStack } = this.state;
    const pages: ReactElement[] = [];
    for (let i = 0, j = historyStack.length; i < j; i += 1) {
      const item: IStackItem = historyStack[i];
      pages.push(<PageView key={item.pageKey} path={item.remainingPath} pageName={item.pageName} />);
    }
    return <div>{pages}</div>;
  };
}

export default Route;
