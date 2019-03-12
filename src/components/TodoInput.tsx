import React from 'react';
import { observer } from 'mobx-react';
import { TodoFormInstance } from '../models/TodoForm';

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface IProps extends Pick<HTMLInputProps, Exclude<keyof HTMLInputProps, 'value' | 'onChange' | 'onKeyDown'>> {
  model: TodoFormInstance;
  onEnter?: () => void;
  onCancel?: () => void;
}

@observer
export class TodoInput extends React.Component<IProps> {
  public handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.model.update(e.target.value);
  };
  public handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const {onEnter, onCancel} = this.props;
    switch (e.keyCode) {
      case 13: {
        if (onEnter) {
          onEnter();
        }
        break;
      }
      case 27: {
        if (onCancel) {
          onCancel();
        }
        break;
      }
      default:
        break;
    }
  };
  public render () {
    const {model, onEnter, onCancel, ...restProps} = this.props;
    return <input {...restProps} value={model.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>;
  }
}
