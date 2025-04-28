"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDOMParserOptions = exports.setSchemaValidator = exports.getContext = void 0;
var xmldom_1 = require("@xmldom/xmldom");
var context = {
    validate: undefined,
    dom: new xmldom_1.DOMParser()
};
function getContext() {
    return context;
}
exports.getContext = getContext;
function setSchemaValidator(params) {
    if (typeof params.validate !== 'function') {
        throw new Error('validate must be a callback function having one argument as xml input');
    }
    // assign the validate function to the context
    context.validate = params.validate;
}
exports.setSchemaValidator = setSchemaValidator;
function setDOMParserOptions(options) {
    if (options === void 0) { options = {}; }
    context.dom = new xmldom_1.DOMParser(options);
}
exports.setDOMParserOptions = setDOMParserOptions;
//# sourceMappingURL=api.js.map