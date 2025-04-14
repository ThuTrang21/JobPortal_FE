/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import classNames, { ArgumentArray } from 'classnames';

import {
  cloneDeep,
  compact,
  forEach,
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isString,
  keys,
  map,
  omitBy,
  reduce,
  reject,
  set,
  trim,
} from 'lodash';
import queryString from 'query-string';
import { LoaderFunctionArgs } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { dispatchAction } from '../store/helpers';
import { navigate } from '../store/app/actions';
import CryptoJS from 'crypto-js';

export const trimObjectValues = (values: any, { omitEmpty } = { omitEmpty: false }) => {
  try {
    JSON.parse(JSON.stringify(values));

    const isRemove = (val: any) =>
      isObject(val) && !isFunction(val) && !isDate(val)
        ? isEmpty(val)
        : isString(val)
          ? !val
          : isNil(val);

    // @ts-ignore
    const trims = (val: any) => {
      if (isString(val)) return trim(val);

      if (isFunction(val) || isDate(val) || !isObject(val)) return val;

      if (isArray(val)) {
        // @ts-ignore
        const results = map(val, (value) => trims(value));
        return omitEmpty ? reject(results, (val) => isRemove(val)) : results;
      }

      const results: any = reduce(
        keys(val),
        // @ts-ignore
        (prev, key) => ({ ...prev, [key]: trims(val[key]) }),
        {},
      );

      return omitEmpty ? omitBy(results, (val) => isRemove(val)) : results;
    };

    return trims(values);
  } catch (error) {
    return values;
  }
};

/**
 * @param { Promise } promise
 * @param { Object= } errorExt
 * @return { Promise }
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export const encryptData = (text: string, passphrase: string) =>
  CryptoJS.AES.encrypt(text, passphrase).toString();

export const decryptData = (encryptedText: string, passphrase: string) => {
  try {
    return CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return '';
  }
};

export function cn(...inputs: ArgumentArray) {
  return twMerge(classNames(inputs));
}


export const handleChangeFilterParams = ({
  pathname,
  name,
  currentFilters,
  value,
}: {
  pathname: string;
  name: string;
  value?: string | number | any;
  currentFilters?: Record<string, any>;
}) => {
  const newQueryObject = {
    ...currentFilters,
    [name]: value,
  };

  const queryValue = queryString.stringify(newQueryObject, {
    skipNull: true,
    skipEmptyString: true,
  });

  dispatchAction(navigate(`${pathname}?${queryValue}`));
};

export const parseQueryParams = ({
  request,
}: {
  request: LoaderFunctionArgs['request'];
  defaultValue?: Record<string, any>;
}) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams?.toString();
  const queryValue = queryString.parse(searchParams, {
    parseBooleans: true,
    parseNumbers: true,
  });

  return queryValue;
};

export const cleanValue = (value: any) => {
  let result = cloneDeep(value);

  if (isString(result)) result = trim(result);

  if (isArray(result)) {
    result = compact(result);

    result = map(result, (item) => cleanValue(item));
  }

  if (isObject(result)) {
    result = omitBy(result, (item) => {
      if (isNumber(item) || isBoolean(item)) return false;

      return isEmpty(item);
    });

    forEach(result, (value, key) => {
      set(result, key, cleanValue(value));
    });
  }

  return result;
};
