import { Form, Input, InputProps } from 'antd';
import { FormItemInputProps } from 'antd/es/form/FormItemInput';
import { FormikErrors, FormikTouched } from 'formik';
import { useMemo } from 'react';
import { cn } from '../../utils/helpers';

export interface ITextFieldProps extends InputProps {
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: FormikErrors<any> | string | string[] | FormikErrors<any>[];
  label?: string;
  tooltip?: string;
  classNames?: {
    wrapper?: string;
    input?: string;
    label?: string;
    helperText?: string;
  };
  formControlProps?: FormItemInputProps & { name?: any };
  disabled?: boolean;
}

const TextField = (props: ITextFieldProps) => {
  const {
    label,
    touched,
    error,
    classNames,
    formControlProps,
    size = 'middle',
    tooltip,
    disabled = false,
    ...rest
  } = props;
  const invalid = useMemo(() => touched && error, [touched, error]);

  return (
    <Form.Item
      status={invalid ? 'error' : undefined}
      help={invalid && (error as string)}
      label={label}
      tooltip={tooltip}
      layout="vertical"
      required={rest.required}
      className="w-full"
      {...formControlProps}
    >
      <Input
        {...rest}
        size={size}
        status={invalid ? 'error' : undefined}
        autoComplete="off"
        aria-autocomplete="none"
        formNoValidate
        disabled={disabled}
        className={cn(
          'w-full border-transparent placeholder:text-sm bg-white border-primary',
          classNames?.input,
        )}
      />
    </Form.Item>
  );
};

export default TextField;
