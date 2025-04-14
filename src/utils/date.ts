import { format, parseISO } from 'date-fns';
import { isDate, isEmpty, isNil } from 'lodash';

type FormatTemplate =
  | 'dd/MM/yyyy'
  | 'HH:mm:ss'
  | 'dd/MM/yyyy HH:mm:ss'
  | 'HH:mm dd/MM/yyyy'
  | string;

export const parseToDate = (d?: string | Date): Date | null => {
  if (isNil(d)) return null;

  return isDate(d) ? d : parseISO(d as string);
};

export const formatDate = (d?: string | Date, template: FormatTemplate = 'dd/MM/yyyy') => {
  if (isEmpty(d)) return null;

  const parseDate = parseToDate(d);

  return format(parseDate as Date, template);
};
