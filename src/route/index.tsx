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
  destoryPage: IStackItem | null;
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
      destoryPage: null,
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
    const newHistroyStack: IStackItem[] = [];
    let destoryPage: IStackItem | null = null;
    for (let i = 0, j = historyStack.length; i < j; i += 1) {
      if (historyStack[i].seed > nextSeed) {
        destoryPage = { ...historyStack[i] };
      } else {
        newHistroyStack.push({ ...historyStack[i] });
      }
    }
    if (!Route.routeIsExist(historyStack, pageKey)) {
      newHistroyStack.push({
        seed: nextSeed,
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
      remainingPath,
      destoryPage,
      historyStack: newHistroyStack,
    };
  };

  render = (): ReactElement => {
    const { historyStack, destoryPage } = this.state;
    const pages: ReactElement[] = [];
    for (let i = 0, j = historyStack.length; i < j; i += 1) {
      const item: IStackItem = historyStack[i];
      const { pageKey, remainingPath, pageName, seed } = item;
      pages.push(<PageView seed={seed} isDestroy={false} key={pageKey} path={remainingPath} pageName={pageName} />);
    }
    if (destoryPage) {
      pages.push(
        <PageView
          isDestroy={true}
          seed={destoryPage.seed}
          key={destoryPage.pageKey}
          path={destoryPage.remainingPath}
          pageName={destoryPage.pageName}
        />
      );
    }
    return <div>{pages}</div>;
  };
}

export default Route;
