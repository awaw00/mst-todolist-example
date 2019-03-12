import React from 'react';
import { inject, observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import { Root } from '../models';

export interface IProps {
  root?: Instance<typeof Root>;
  children: (root: Instance<typeof Root>) => React.ReactNode;
}

@inject('root')
@observer
export class ModelInjector extends React.Component<IProps> {
  public render() {
    const { root, children } = this.props;

    return children(root!);
  }
}
