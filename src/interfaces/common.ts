/* eslint-disable @typescript-eslint/no-explicit-any */

import { IIndustry } from "./industry";

export type AnyType = any;

export interface INormalFilter {
  page?: number;
  limit?: number;
  q?: string;
  isAll?: string;
}

export interface IListResponse<T> {
  items: T[];
  total: number;
  status: number;
  message: string;
  error: boolean;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
  message: string;
}

export interface IDefaultData {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AnyObject = Record<string, any>;

export type CreateData<T> = Omit<T, keyof IDefaultData>;

export interface IDefaultFilter {
  q?: string;
  page?: number;
  limit?: number;
}


export interface OptionType {
  value: string;
  label: string;
}



export interface MultiSelectProps {
  value: IIndustry[]; 
  onChange: (selected: { id: number }[]) => void;
}

export interface IProvince {
  name: string;
  code:number;
}

