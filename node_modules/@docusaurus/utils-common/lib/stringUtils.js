"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePrefix = exports.addSuffix = exports.removeSuffix = exports.addPrefix = void 0;
/** Adds a given string prefix to `str`. */
function addPrefix(str, prefix) {
    return str.startsWith(prefix) ? str : `${prefix}${str}`;
}
exports.addPrefix = addPrefix;
/** Removes a given string suffix from `str`. */
function removeSuffix(str, suffix) {
    if (suffix === '') {
        // str.slice(0, 0) is ""
        return str;
    }
    return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}
exports.removeSuffix = removeSuffix;
/** Adds a given string suffix to `str`. */
function addSuffix(str, suffix) {
    return str.endsWith(suffix) ? str : `${str}${suffix}`;
}
exports.addSuffix = addSuffix;
/** Removes a given string prefix from `str`. */
function removePrefix(str, prefix) {
    return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}
exports.removePrefix = removePrefix;
//# sourceMappingURL=stringUtils.js.map