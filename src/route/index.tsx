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
  isDestroy: boolean;
  remainingPath: string;
  pageName: string;
}

interface IRouteState {
  path: string;
  seed: number;
  isDestroy: boolean;
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
      isDestroy: false,
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
    const newHistroyStack = [...historyStack];
    for (let i = 0, j = newHistroyStack.length; i < j; i += 1) {
      if (newHistroyStack[i].seed > nextSeed) {
        newHistroyStack[i].isDestroy = true;
      }
    }
    if (!Route.routeIsExist(historyStack, pageKey)) {
      newHistroyStack.push({
        seed: nextSeed,
        isDestroy: false,
        path: nextPath,
        pageKey,
        pageName,
        remainingPath,
      });
    }
    return {
      seed: nextSeed,
      path: nextPath,
      pageKey,
      pageName,
      isDestroy: false,
      remainingPath,
      historyStack: newHistroyStack,
    };
  };

  render = (): ReactElement => {
    const { historyStack } = this.state;
    const pages: ReactElement[] = [];
    for (let i = 0, j = historyStack.length; i < j; i += 1) {
      const item: IStackItem = historyStack[i];
      const { isDestroy, pageKey, remainingPath, pageName } = item;
      pages.push(<PageView isDestroy={isDestroy} key={pageKey} path={remainingPath} pageName={pageName} />);
    }
    return <div>{pages}</div>;
  };
}

export default Route;
