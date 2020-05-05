import { App, LazyPage } from 'star-mobile';
import './index.less';

window.onload = (): void => {
  App.init({
    wrapper: document.getElementById('app_root'),
    root: 'home',
    pages: {
      home: require('./pages/home').default,
      list: LazyPage(() => {
        return import('./pages/list');
      }),
    },
  });
};
