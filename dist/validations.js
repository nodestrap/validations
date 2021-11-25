// react:
import { default as React, createContext, useContext, } from 'react'; // base technology of our nodestrap components
// defaults:
const _defaultEnableValidation = true;
const _defaultIsValid = undefined;
const _defaultInheritValidation = true;
/**
 * A react context for validation stuff.
 */
export const Context = createContext(/*defaultValue :*/ {
    enableValidation: _defaultEnableValidation,
    isValid: _defaultIsValid,
});
Context.displayName = 'Validation';
// hooks:
export const usePropValidation = (props) => {
    // contexts:
    const valContext = useContext(Context);
    const inheritValidation = (props.inheritValidation ?? _defaultInheritValidation);
    const enableValidation = ((inheritValidation
        ?
            valContext.enableValidation // inherit
        :
            true // independent
    )
        &&
            (props.enableValidation ?? _defaultEnableValidation));
    const isValid = (() => {
        if (!enableValidation)
            return null; // if validation was disabled => treat validity as `uncheck` (null)
        const contextIsValid = (inheritValidation
            ?
                valContext.isValid // inherit
            :
                undefined // independent
        );
        if (contextIsValid !== undefined)
            return contextIsValid; // if the context's validity was set other than `auto` (undefined) => use it
        return props.isValid; // otherwise => use the component's validity
    })();
    return {
        enableValidation: enableValidation,
        isValid: isValid,
    };
};
export function ValidationProvider(props) {
    return (React.createElement(Context.Provider, { value: {
            enableValidation: props.enableValidation ?? _defaultEnableValidation,
            isValid: props.isValid,
        } }, props.children));
}
export { ValidationProvider as default };
