import React, { ReactElement } from 'react';

class LazyPage {
  private cb?: any;
  constructor(cb) {
    this.cb = cb;
  }
}

export default LazyPage;
