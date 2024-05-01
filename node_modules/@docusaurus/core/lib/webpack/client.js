"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuildClientConfig = exports.createStartClientConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const logger_1 = tslib_1.__importDefault(require("@docusaurus/logger"));
const webpack_merge_1 = tslib_1.__importDefault(require("webpack-merge"));
const webpackbar_1 = tslib_1.__importDefault(require("webpackbar"));
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const react_loadable_ssr_addon_v5_slorber_1 = tslib_1.__importDefault(require("react-loadable-ssr-addon-v5-slorber"));
const html_webpack_plugin_1 = tslib_1.__importDefault(require("html-webpack-plugin"));
const base_1 = require("./base");
const ChunkAssetPlugin_1 = tslib_1.__importDefault(require("./plugins/ChunkAssetPlugin"));
const utils_1 = require("./utils");
const CleanWebpackPlugin_1 = tslib_1.__importDefault(require("./plugins/CleanWebpackPlugin"));
// When building, include the plugin to force terminate building if errors
// happened in the client bundle.
class ForceTerminatePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('client:done', (stats) => {
            if (stats.hasErrors()) {
                const errorsWarnings = stats.toJson('errors-warnings');
                logger_1.default.error(`Client bundle compiled with errors therefore further build is impossible.\n${(0, utils_1.formatStatsErrorMessage)(errorsWarnings)}`);
                process.exit(1);
            }
        });
    }
}
async function createBaseClientConfig({ props, hydrate, minify, }) {
    const baseConfig = await (0, base_1.createBaseConfig)({ props, isServer: false, minify });
    return (0, webpack_merge_1.default)(baseConfig, {
        // Useless, disabled on purpose (errors on existing sites with no
        // browserslist config)
        // target: 'browserslist',
        entry: path_1.default.resolve(__dirname, '../client/clientEntry.js'),
        optimization: {
            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            runtimeChunk: true,
        },
        plugins: [
            new webpack_1.default.DefinePlugin({
                'process.env.HYDRATE_CLIENT_ENTRY': JSON.stringify(hydrate),
            }),
            new ChunkAssetPlugin_1.default(),
            // Show compilation progress bar and build time.
            new webpackbar_1.default({
                name: 'Client',
            }),
        ],
    });
}
// client config when running "docusaurus start"
async function createStartClientConfig({ props, minify, poll, }) {
    const { siteConfig, headTags, preBodyTags, postBodyTags } = props;
    const clientConfig = (0, webpack_merge_1.default)(await createBaseClientConfig({
        props,
        minify,
        hydrate: false,
    }), {
        watchOptions: {
            ignored: /node_modules\/(?!@docusaurus)/,
            poll,
        },
        infrastructureLogging: {
            // Reduce log verbosity, see https://github.com/facebook/docusaurus/pull/5420#issuecomment-906613105
            level: 'warn',
        },
        plugins: [
            // Generates an `index.html` file with the <script> injected.
            new html_webpack_plugin_1.default({
                template: path_1.default.join(__dirname, '../templates/dev.html.template.ejs'),
                // So we can define the position where the scripts are injected.
                inject: false,
                filename: 'index.html',
                title: siteConfig.title,
                headTags,
                preBodyTags,
                postBodyTags,
            }),
        ],
    });
    return { clientConfig };
}
exports.createStartClientConfig = createStartClientConfig;
// client config when running "docusaurus build"
async function createBuildClientConfig({ props, minify, bundleAnalyzer, }) {
    // Apply user webpack config.
    const { generatedFilesDir } = props;
    const clientManifestPath = path_1.default.join(generatedFilesDir, 'client-manifest.json');
    const config = (0, webpack_merge_1.default)(await createBaseClientConfig({ props, minify, hydrate: true }), {
        plugins: [
            new ForceTerminatePlugin(),
            // Remove/clean build folders before building bundles.
            new CleanWebpackPlugin_1.default({ verbose: false }),
            // Visualize size of webpack output files with an interactive zoomable
            // tree map.
            bundleAnalyzer && new webpack_bundle_analyzer_1.BundleAnalyzerPlugin(),
            // Generate client manifests file that will be used for server bundle.
            new react_loadable_ssr_addon_v5_slorber_1.default({
                filename: clientManifestPath,
            }),
        ].filter((x) => Boolean(x)),
    });
    return { config, clientManifestPath };
}
exports.createBuildClientConfig = createBuildClientConfig;
