import React, { ReactElement } from 'react';
import App from '../App';
import PageView from '../pageView';

export interface IRouteProps {
  isRoot?: boolean;
  path: string;
  seed: number;
}

interface IRouteState {
  pages: ReactElement[];
  path: string;
  seed: number;
}

class Route extends React.Component<IRouteProps, IRouteState> {
  constructor(props: IRouteProps) {
    super(props);
    this.state = {
      pages: [],
      path: '',
      seed: -1,
    };
  }
  static getDerivedStateFromProps = (nextProps: IRouteProps, prevState: IRouteState): IRouteState | null => {
    const { path: nextPath, seed: nextSeed } = nextProps;
    const { path, seed } = prevState;
    if (nextPath === path && seed === nextSeed) {
      return null;
    }
    return {
      pages: [<PageView key="xx" pageName="home" />],
      seed: nextSeed,
      path: nextPath,
    };
  };

  render = (): ReactElement => {
    const { pages } = this.state;
    return <div>{pages}</div>;
  };
}

export default Route;
