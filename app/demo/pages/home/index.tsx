import React, { ReactElement } from 'react';
import { App } from 'star-mobile';

const HomePage = (): ReactElement => {
  const btnClick = (): void => {
    App.go('list', { id: 'x' });
  };
  return (
    <div>
      HomePssssageView<button onClick={btnClick}>GoTo List</button>
    </div>
  );
};

export default HomePage;
