// react:
import { default as React, createContext, useContext, } from 'react'; // base technology of our nodestrap components
// defaults:
const _defaultEnableRootValidation = false;
const _defaultEnableValidation = true;
const _defaultIsValid = undefined;
const _defaultInheritValidation = true;
/**
 * A react context for validation stuff.
 */
export const Context = createContext(/*defaultValue :*/ {
    enableValidation: _defaultEnableValidation,
    isValid: _defaultIsValid,
    atRoot: true,
});
Context.displayName = 'Validation';
// hooks:
export const usePropValidation = (props) => {
    // contexts:
    const valContext = useContext(Context);
    const atRoot = valContext.atRoot;
    const inheritValidation = (props.inheritValidation ?? _defaultInheritValidation);
    const enableValidation = atRoot ? (props.enableValidation ?? _defaultEnableRootValidation) : ((inheritValidation
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
        enableValidation,
        isValid,
        atRoot,
    };
};
export function ValidationProvider(props) {
    // fn props:
    const { atRoot, ...propValidation } = usePropValidation(props);
    if (atRoot) {
        propValidation.enableValidation = props.enableValidation ?? _defaultEnableValidation;
        propValidation.isValid = props.isValid ?? _defaultIsValid;
    } // if
    return (React.createElement(Context.Provider, { value: propValidation }, props.children));
}
export { ValidationProvider as default };
