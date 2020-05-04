import React, { ReactElement } from 'react';

interface IButtonProps {
  title?: string;
}

interface IButtonState {
  title: string;
}

class Button extends React.Component<IButtonProps, IButtonState> {
  constructor(props: IButtonProps) {
    super(props);
  }

  render = (): ReactElement => {
    return <div />;
  };
}

export default Button;
