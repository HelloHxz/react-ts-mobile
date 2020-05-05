import React, { ReactElement } from 'react';
import App from '../app';
import { IPageViewProps } from '../../index.d';

interface IPageViewState {
  pages: string;
}

class PageView extends React.Component<IPageViewProps, IPageViewState> {
  constructor(props: IPageViewProps) {
    super(props);
  }

  render = (): ReactElement => {
    const { pageName, isDestroy } = this.props;
    const { initProps } = App;
    if (initProps) {
      const { pages } = initProps;
      const p = pages[pageName];
      if (!p) {
        return <div>NotFound {pageName}</div>;
      }
      const Pa = p as React.FunctionComponent;
      return (
        <div>
          <Pa {...this.props} />
          {isDestroy ? 'sile' : 'huozhe'}
        </div>
      );
    }
    return <div>null</div>;
  };
}

export default PageView;
