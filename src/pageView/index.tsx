import React, { ReactElement } from 'react';
import App from '../app';

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
      const Pa = pages[pageName] as React.FunctionComponent;
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
