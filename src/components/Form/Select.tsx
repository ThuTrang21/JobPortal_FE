import { Select as AntSelect, Form, SelectProps } from 'antd';
import { FormItemInputProps } from 'antd/es/form/FormItemInput';
import { head, isArray, isString } from 'lodash';
import { useMemo } from 'react';

export interface ISelectProps extends SelectProps {
  touched?: boolean;
  error?: string | string[];
  label?: string;
  required?: boolean;
  formControlProps?: FormItemInputProps;
}

function Select(props: ISelectProps) {
  const { label, touched, error, size = 'middle', formControlProps, ...rest } = props;
  const invalid = useMemo(() => touched && error, [touched, error]);

  return (
    <Form.Item
      status={invalid ? 'error' : undefined}
      help={invalid && isString(error) ? error : isArray(error) ? head(error) : undefined}
      label={label}
      layout="vertical"
      required={rest.required}
      className="w-full"
      {...formControlProps}
    >
      <AntSelect
        {...rest}
        status={invalid ? 'error' : undefined}
        size={size}
        variant="outlined"
        className="[&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!border-primary w-full"
      />
    </Form.Item>
  );
}

export default Select;
