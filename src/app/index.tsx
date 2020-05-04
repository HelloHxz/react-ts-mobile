import React, { Component, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

interface IAppInitPops {
  wrapper?: HTMLElement | null;
  root?: string;
  pages: {
    [pageName: string]: Component | FunctionComponent | Function;
  };
}

class App {
  public initProps?: IAppInitPops;
  public init = (params: IAppInitPops): void => {
    this.initProps = params;
    const root: HTMLElement = params.wrapper || document.body;
    ReactDOM.render(<Root config={this.initProps} />, root);
  };
}

export default new App();
