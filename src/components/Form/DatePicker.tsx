import { DatePicker as AntDatePicker, DatePickerProps, Form } from 'antd';
import { FormItemInputProps } from 'antd/es/form/FormItemInput';
import { head, isArray, isString } from 'lodash';
import { useMemo } from 'react';
import dateFnsGenerateConfig  from 'rc-picker/es/generate/dateFns';

export interface IDatePickerProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
  touched?: boolean | any;
  error?: string | string[] | any;
  label?: string;
  required?: boolean;
  formControlProps?: FormItemInputProps & {
    className?: string;
  };
  value?: string | Date;
  onChange?: (value: Date) => void;
}

const RootDatePicker: any = AntDatePicker.generatePicker<Date>(dateFnsGenerateConfig);

function DatePicker(props: IDatePickerProps) {
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
      <RootDatePicker
        format="DD/MM/YYYY"
        {...rest}
        status={invalid ? 'error' : undefined}
        size={size}
        variant="filled"
        className="bg-dark-3/50 w-full"
      />
    </Form.Item>
  );
}

export default DatePicker;
