import { JSX } from "react";

export type DefaultSize = 'small' | 'medium' | 'large';
export type DefaultIntent = 'filled' | 'outlined' | 'text' | 'soft' | 'dashed' | 'softOutline';
export type DefaultColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type StaticElementProps<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];
