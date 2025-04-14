import { DatePicker as AntDatePicker, Form } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { FormItemInputProps } from 'antd/es/form/FormItemInput';
import { head, isArray, isString } from 'lodash';
import { useMemo } from 'react';
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns';

export interface IDateRangePickerProps
  extends Partial<Omit<RangePickerProps, 'value' | 'onChange'>> {
  touched?: boolean;
  error?: string | string[];
  label?: string;
  required?: boolean;
  formControlProps?: FormItemInputProps;
  value?: string | Date[] | string[];
  onChange?: (value: Date[]) => void;
}

const RootDatePicker: any = AntDatePicker.generatePicker<Date>(dateFnsGenerateConfig);

function DateRangePicker(props: IDateRangePickerProps) {
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
      <RootDatePicker.RangePicker
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

export default DateRangePicker;
