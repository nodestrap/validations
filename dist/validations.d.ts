import { default as React } from 'react';
/**
 * Validation was skipped because its not required. Neither success nor error shown.
 */
export declare type Uncheck = null;
/**
 * Validation was failed because the value did not meet the criteria.
 */
export declare type Error = false;
/**
 * Validation was successful and the value meet the criteria.
 */
export declare type Success = true;
export declare type Result = Uncheck | Error | Success;
/**
 * Contains validation props.
 */
export interface Validation {
    /**
     * `true`      : validation is enabled  - implements `isValid` prop.
     * `false`     : validation is disabled - equivalent as `isValid = null` (uncheck).
     */
    enableValidation: boolean;
    /**
     * `undefined` : *automatic* detect valid/invalid state.
     * `null`      : force validation state to *uncheck*.
     * `true`      : force validation state to *valid*.
     * `false`     : force validation state to *invalid*.
     */
    isValid?: Result;
}
/**
 * A react context for validation stuff.
 */
export declare const Context: React.Context<Validation>;
export declare const usePropValidation: (props: ValidationProps) => Validation;
export interface ValidationProps extends Partial<Validation> {
    /**
     * `undefined` : same as `true`.
     * `true`      : validation is enabled  - implements `isValid` prop.
     * `false`     : validation is disabled - equivalent as `isValid = null` (uncheck).
     */
    enableValidation?: boolean;
    /**
     * `undefined` : *automatic* detect valid/invalid state.
     * `null`      : force validation state to *uncheck*.
     * `true`      : force validation state to *valid*.
     * `false`     : force validation state to *invalid*.
     */
    isValid?: Result;
    /**
     * `undefined` : same as `true`.
     * `true`      : inherits `enableValidation` & `isValid` from parent (`ValidationProvider` context).
     * `false`     : independent `enableValidation` & `isValid`.
     */
    inheritValidation?: boolean;
    children?: React.ReactNode;
}
export declare function ValidationProvider(props: ValidationProps): JSX.Element;
export { ValidationProvider as default };
