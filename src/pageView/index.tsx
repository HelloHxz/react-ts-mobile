import React, { ReactElement } from 'react';
import App from '../app';
import LazyPage from '../lazyPage';

interface IPageViewProps {
  pageName: string;
}

interface IPageViewState {
  pages: string;
}

class PageView extends React.Component<IPageViewProps, IPageViewState> {
  constructor(props: IPageViewProps) {
    super(props);
  }

  render = (): ReactElement => {
    const { pageName } = this.props;
    const { initProps } = App;
    if (initProps) {
      const { pages } = initProps;
      const p = pages[pageName];
      if (!p) {
        return <div>NotFound {pageName}</div>;
      }
      if (p instanceof LazyPage) {
        return <div>lazy</div>;
      }
      const Pa = p as React.FunctionComponent;
      return (
        <div>
          <Pa />
        </div>
      );
    }
    return <div>null</div>;
  };
}

export default PageView;
