import { cva } from "class-variance-authority";

const buttonClasses = cva(
  ['flex items-center justify-center gap-1 font-medium transition-all relative select-none'],
  {
    variants: {
      intent: {
        filled: 'border text-white',
        outlined: 'border bg-transparent',
        text: 'bg-transparent border-none',
        soft: 'border-none',
        dashed: 'border border-dashed',
        softOutline: 'border bg-transparent',

    },
    color: {
      primary: '',
      success: '',
      warning: '',
      danger: '',
      info: '',
    },
    size: {
      small: 'px-[14px] py-2 rounded-lg body-sm',
      medium: 'gap-2 py-2 px-5 rounded-lg body-sm',
      large: 'px-5 py-3 rounded-lg body-md',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
    },
    loading: {
      true: 'pointer-events-none',
    },
    iconOnly: {
      true: 'aspect-square p-0 rounded-lg flex items-center justify-center',
    },
  },
  compoundVariants: [
  {
    intent: 'filled',
    color: 'primary',
    className: 'bg-primary hover:bg-primary/90',
  },
  {
    intent: 'filled',
    color: 'success',
    className: 'bg-success-500 hover:bg-success-600',
  },
  {
    intent: 'filled',
    color: 'info',
    className: 'bg-info-500 hover:bg-info-600',
  },
  {
    intent: 'filled',
    color: 'warning',
    className: 'bg-warning-500 hover:bg-warning-600',
  },
  {
    intent: 'filled',
    color: 'danger',
    className: 'bg-danger-500 hover:bg-danger-600',
  },

  {
    intent: 'outlined',
    color: 'primary',
    className: 'border-primary text-primary hover:text-white hover:bg-primary px-[12px] py-[8px]',
  },
  {
    intent: 'outlined',
    color: 'success',
    className: 'border-success-500 text-success-500 hover:text-white hover:bg-success-500',
  },
  {
    intent: 'outlined',
    color: 'info',
    className: 'border-info-500 text-info-500 hover:text-white hover:bg-info-500',
  },
  {
    intent: 'outlined',
    color: 'warning',
    className: 'border-warning-500 text-warning-500 hover:text-white hover:bg-warning-500',
  },
  {
    intent: 'outlined',
    color: 'danger',
    className: 'border-danger-500 text-danger-500 hover:text-white hover:bg-danger-500',
  },

  {
    intent: 'text',
    color: 'primary',
    className: 'bg-transparent hover:bg-primary text-primary hover:text-white',
  },
  {
    intent: 'text',
    color: 'success',
    className: 'bg-transparent hover:bg-success-500 text-success-500 hover:text-white',
  },
  {
    intent: 'text',
    color: 'info',
    className: 'bg-transparent hover:bg-info-500 text-info-500 hover:text-white',
  },
  {
    intent: 'text',
    color: 'warning',
    className: 'bg-transparent hover:bg-warning-500 text-warning-500 hover:text-white',
  },
  {
    intent: 'text',
    color: 'danger',
    className: 'bg-transparent hover:bg-danger-500 text-danger-500 hover:text-white',
  },

  {
    intent: 'soft',
    color: 'primary',
    className: 'bg-primary/10 hover:bg-primary text-primary hover:text-white',
  },
  {
    intent: 'soft',
    color: 'success',
    className: 'bg-success-500/10 hover:bg-success-500 text-success-500 hover:text-white',
  },
  {
    intent: 'soft',
    color: 'info',
    className: 'bg-info-500/10 hover:bg-info-500 text-info-500 hover:text-white',
  },
  {
    intent: 'soft',
    color: 'warning',
    className: 'bg-warning-500/10 hover:bg-warning-500 text-warning-500 hover:text-white',
  },
  {
    intent: 'soft',
    color: 'danger',
    className: 'bg-danger-500/10 hover:bg-danger-500 text-danger-500 hover:text-white',
  },

  {
    intent: 'dashed',
    color: 'primary',
    className:
      'bg-transparent border-primary text-primary hover:text-white hover:bg-primary/10',
  },
  {
    intent: 'dashed',
    color: 'success',
    className:
      'bg-transparent border-success-500 text-success-500 hover:text-white hover:bg-success-500/10',
  },
  {
    intent: 'dashed',
    color: 'info',
    className:
      'bg-transparent border-info-500 text-info-500 hover:text-white hover:bg-info-500/10',
  },
  {
    intent: 'dashed',
    color: 'warning',
    className:
      'bg-transparent border-warning-500 text-warning-500 hover:text-white hover:bg-warning-500/10',
  },
  {
    intent: 'dashed',
    color: 'danger',
    className:
      'bg-transparent border-danger-500 text-danger-500 hover:text-white hover:bg-danger-500/10',
  },
  {
    intent: 'softOutline',
    color: 'primary',
    className: 'bg-primary/10 text-primary hover:border-primary',
  },
  {
    iconOnly: true,
    size: 'small',
    className: 'w-6 h-6',
  },
  {
    iconOnly: true,
    size: 'large',
    className: 'w-10 h-10',
  },
  {
    iconOnly: true,
    size: 'medium',
    className: 'w-9 h-9',
  },
],
  defaultVariants: {
  intent: 'filled',
  color: 'primary',
  size: 'medium',
},
  },
);

export default buttonClasses;
