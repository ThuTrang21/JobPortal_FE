import { forwardRef } from 'react';
import { ButtonProps, useButton } from './useButton';
import { Spin } from 'antd';
import { cn } from '../../utils/helpers';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, loading, ...rest } = useButton(props);

  return (
    <button ref={ref} {...rest}>
      {children}
      <span
        className={cn(
          'bg-dark-1/90 pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-lg transition-all',
          loading ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Spin size="small" />
      </span>
    </button>
  );
});

export default Button;
