"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.ValidationProvider = exports.usePropValidation = exports.Context = void 0;
// react:
const react_1 = __importStar(require("react")); // base technology of our nodestrap components
// defaults:
const _defaultEnableValidation = true;
const _defaultIsValid = undefined;
const _defaultInheritValidation = true;
/**
 * A react context for validation stuff.
 */
exports.Context = (0, react_1.createContext)(/*defaultValue :*/ {
    enableValidation: _defaultEnableValidation,
    isValid: _defaultIsValid,
});
exports.Context.displayName = 'Validation';
// hooks:
const usePropValidation = (props) => {
    // contexts:
    const valContext = (0, react_1.useContext)(exports.Context);
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
exports.usePropValidation = usePropValidation;
function ValidationProvider(props) {
    return (<exports.Context.Provider value={{
            enableValidation: props.enableValidation ?? _defaultEnableValidation,
            isValid: props.isValid,
        }}>
            {props.children}
        </exports.Context.Provider>);
}
exports.ValidationProvider = ValidationProvider;
exports.default = ValidationProvider;
