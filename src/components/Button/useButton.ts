import { DefaultColor, DefaultIntent, DefaultSize, StaticElementProps } from '../../styles/types';
import { cn } from '../../utils/helpers';
import buttonClasses from './styles';

export type ButtonProps = {
  variant?: DefaultIntent;
  color?: DefaultColor;
  size?: DefaultSize;

  loading?: boolean;
  iconOnly?: boolean;
} & StaticElementProps<'button'>;

export function useButton(props: ButtonProps) {
  const {
    variant = 'filled',
    color = 'primary',
    size = 'medium',
    className,
    loading,
    iconOnly = false,
    ...rest
  } = props;

  const classes = buttonClasses({
    intent: variant,
    color,
    size,
    disabled: props.disabled,
    loading,
    className,
    iconOnly,
  });

  return {
    ...rest,
    className: cn(classes),
    loading,
  };
}
