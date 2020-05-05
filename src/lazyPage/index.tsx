import React, { ReactElement } from 'react';
import { IPageViewProps } from '../../index.d';

interface AsyncComponentState {
  Component: any;
}
export default function LazyPage(getComponent: Function): any {
  class AsyncComponent extends React.Component<{}, AsyncComponentState> {
    constructor(props: IPageViewProps) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentDidMount = (): void => {
      getComponent()
        .then((Com) => {
          this.setState({ Component: Com.default });
        })
        .catch(() => {
          this.setState({ Component: null });
        });
    };

    render = (): ReactElement => {
      const C = this.state.Component;
      return C ? <C {...this.props} /> : <div>....Loading</div>;
    };
  }
  return AsyncComponent;
}
