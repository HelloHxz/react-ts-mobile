import { App } from 'star-mobile';
import './index.less';
import HomPage from './pages/home';

window.onload = (): void => {
  App.init({
    wrapper: document.getElementById('app_root'),
    root: 'home',
    pages: {
      home: HomPage,
      // eslint-disable-next-line
      list: () => {
        return import('./pages/home');
      },
    },
  });
};
