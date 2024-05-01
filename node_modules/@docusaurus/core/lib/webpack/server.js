"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const webpack_merge_1 = tslib_1.__importDefault(require("webpack-merge"));
const utils_1 = require("@docusaurus/utils");
const webpackbar_1 = tslib_1.__importDefault(require("webpackbar"));
const copy_webpack_plugin_1 = tslib_1.__importDefault(require("copy-webpack-plugin"));
const base_1 = require("./base");
async function createServerConfig(params) {
    const { props } = params;
    const baseConfig = await (0, base_1.createBaseConfig)({
        props,
        isServer: true,
        // Minification of server bundle reduces size but doubles bundle time :/
        minify: false,
    });
    const outputFilename = 'server.bundle.js';
    const serverBundlePath = path_1.default.join(props.outDir, outputFilename);
    const config = (0, webpack_merge_1.default)(baseConfig, {
        target: `node${utils_1.NODE_MAJOR_VERSION}.${utils_1.NODE_MINOR_VERSION}`,
        entry: {
            main: path_1.default.resolve(__dirname, '../client/serverEntry.js'),
        },
        output: {
            filename: outputFilename,
            libraryTarget: 'commonjs2',
            // Workaround for Webpack 4 Bug (https://github.com/webpack/webpack/issues/6522)
            globalObject: 'this',
        },
        plugins: [
            // Show compilation progress bar.
            new webpackbar_1.default({
                name: 'Server',
                color: 'yellow',
            }),
            await createStaticDirectoriesCopyPlugin(params),
        ].filter(Boolean),
    });
    return { config, serverBundlePath };
}
exports.default = createServerConfig;
async function createStaticDirectoriesCopyPlugin({ props }) {
    const { outDir, siteDir, siteConfig: { staticDirectories: staticDirectoriesOption }, } = props;
    // The staticDirectories option can contain empty directories, or non-existent
    // directories (e.g. user deleted `static`). Instead of issuing an error, we
    // just silently filter them out, because user could have never configured it
    // in the first place (the default option should always "work").
    const staticDirectories = (await Promise.all(staticDirectoriesOption.map(async (dir) => {
        const staticDir = path_1.default.resolve(siteDir, dir);
        if ((await fs_extra_1.default.pathExists(staticDir)) &&
            (await fs_extra_1.default.readdir(staticDir)).length > 0) {
            return staticDir;
        }
        return '';
    }))).filter(Boolean);
    if (staticDirectories.length === 0) {
        return undefined;
    }
    return new copy_webpack_plugin_1.default({
        patterns: staticDirectories.map((dir) => ({
            from: dir,
            to: outDir,
            toType: 'dir',
        })),
    });
}
