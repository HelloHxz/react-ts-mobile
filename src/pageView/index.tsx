import React, { ReactElement } from 'react';
import App from '../app';
import LazyPage from '../lazyPage';

interface IPageViewProps {
  pageName: string;
  path: string;
  isDestroy: boolean;
}

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
      if (p instanceof LazyPage) {
        return <div>lazy {isDestroy ? 'sile' : 'huozhe'}</div>;
      }
      const Pa = p as React.FunctionComponent;
      return (
        <div>
          <Pa />
          {isDestroy ? 'sile' : 'huozhe'}
        </div>
      );
    }
    return <div>null</div>;
  };
}

export default PageView;
