import React, { ReactElement } from 'react';
import App from '../App';
import PageView from '../pageView';

export interface IRouteProps {
  isRoot?: boolean;
  path: string;
  seed: number;
}

interface IStackItem {
  path: string;
  seed: number;
};

interface IRouteState {
  path: string;
  seed: number;
  historyStack: IStackItem[];
}

class Route extends React.Component<IRouteProps, IRouteState> {
  constructor(props: IRouteProps) {
    super(props);
    this.state = {
      path: '',
      seed: -1,
      historyStack: [],
    };
  }
  static getDerivedStateFromProps = (nextProps: IRouteProps, prevState: IRouteState): IRouteState | null => {
    const { path: nextPath, seed: nextSeed } = nextProps;
    const { path, seed, historyStack } = prevState;
    if (nextPath === path && seed === nextSeed) {
      return null;
    }
    return {
      seed: nextSeed,
      path: nextPath,
      historyStack: [...historyStack, { seed: nextSeed, path: nextPath }],
    };
  };

  render = (): ReactElement => {
    const { historyStack } = this.state;
    const pages: ReactElement[] = [];
    for (let i = 0, j = historyStack.length; i < j; i += 1) {
      const item: IStackItem = historyStack[i];
      pages.push(<PageView key={`${item.path}_${item.seed}`} pageName={item.path} />);
    }
    return <div>{pages}</div>;
  };
}

export default Route;
