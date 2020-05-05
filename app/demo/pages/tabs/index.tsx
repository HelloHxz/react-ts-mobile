import React, { ReactElement } from 'react';
import { App, Route } from 'star-mobile';

const TabsPage = (props): ReactElement => {
  const btnClick = (): void => {
    App.go('list', { id: 'x' });
  };
  return (
    <div>
      <Route {...props} />
      Tabs<button onClick={btnClick}>GoToxx</button>
    </div>
  );
};

export default TabsPage;
