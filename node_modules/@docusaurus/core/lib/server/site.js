"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadSitePlugin = exports.reloadSite = exports.loadSite = exports.loadContext = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("@docusaurus/utils");
const combine_promises_1 = tslib_1.__importDefault(require("combine-promises"));
const config_1 = require("./config");
const clientModules_1 = require("./clientModules");
const plugins_1 = require("./plugins/plugins");
const htmlTags_1 = require("./htmlTags");
const siteMetadata_1 = require("./siteMetadata");
const i18n_1 = require("./i18n");
const translations_1 = require("./translations/translations");
const utils_2 = require("../utils");
const codegen_1 = require("./codegen/codegen");
const routes_1 = require("./routes");
/**
 * Loading context is the very first step in site building. Its params are
 * directly acquired from CLI options. It mainly loads `siteConfig` and the i18n
 * context (which includes code translations). The `LoadContext` will be passed
 * to plugin constructors.
 */
async function loadContext(params) {
    const { siteDir, outDir: baseOutDir = utils_1.DEFAULT_BUILD_DIR_NAME, locale, config: customConfigFilePath, } = params;
    const generatedFilesDir = path_1.default.resolve(siteDir, utils_1.GENERATED_FILES_DIR_NAME);
    const { siteVersion, loadSiteConfig: { siteConfig: initialSiteConfig, siteConfigPath }, } = await (0, combine_promises_1.default)({
        siteVersion: (0, siteMetadata_1.loadSiteVersion)(siteDir),
        loadSiteConfig: (0, config_1.loadSiteConfig)({
            siteDir,
            customConfigFilePath,
        }),
    });
    const i18n = await (0, i18n_1.loadI18n)(initialSiteConfig, { locale });
    const baseUrl = (0, utils_1.localizePath)({
        path: initialSiteConfig.baseUrl,
        i18n,
        options: params,
        pathType: 'url',
    });
    const outDir = (0, utils_1.localizePath)({
        path: path_1.default.resolve(siteDir, baseOutDir),
        i18n,
        options: params,
        pathType: 'fs',
    });
    const localizationDir = path_1.default.resolve(siteDir, i18n.path, i18n.localeConfigs[i18n.currentLocale].path);
    const siteConfig = { ...initialSiteConfig, baseUrl };
    const codeTranslations = await (0, translations_1.loadSiteCodeTranslations)({ localizationDir });
    return {
        siteDir,
        siteVersion,
        generatedFilesDir,
        localizationDir,
        siteConfig,
        siteConfigPath,
        outDir,
        baseUrl,
        i18n,
        codeTranslations,
    };
}
exports.loadContext = loadContext;
function createSiteProps(params) {
    const { plugins, routes, context } = params;
    const { generatedFilesDir, siteDir, siteVersion, siteConfig, siteConfigPath, outDir, baseUrl, i18n, localizationDir, codeTranslations: siteCodeTranslations, } = context;
    const { headTags, preBodyTags, postBodyTags } = (0, htmlTags_1.loadHtmlTags)(plugins);
    const siteMetadata = (0, siteMetadata_1.createSiteMetadata)({ plugins, siteVersion });
    const codeTranslations = {
        ...(0, translations_1.getPluginsDefaultCodeTranslations)({ plugins }),
        ...siteCodeTranslations,
    };
    (0, routes_1.handleDuplicateRoutes)(routes, siteConfig.onDuplicateRoutes);
    const routesPaths = (0, routes_1.getRoutesPaths)(routes, baseUrl);
    return {
        siteConfig,
        siteConfigPath,
        siteMetadata,
        siteVersion,
        siteDir,
        outDir,
        baseUrl,
        i18n,
        localizationDir,
        generatedFilesDir,
        routes,
        routesPaths,
        plugins,
        headTags,
        preBodyTags,
        postBodyTags,
        codeTranslations,
    };
}
// TODO global data should be part of site props?
async function createSiteFiles({ site, globalData, }) {
    return utils_2.PerfLogger.async('Create site files', async () => {
        const { props: { plugins, generatedFilesDir, siteConfig, siteMetadata, i18n, codeTranslations, routes, baseUrl, }, } = site;
        const clientModules = (0, clientModules_1.getAllClientModules)(plugins);
        await (0, codegen_1.generateSiteFiles)({
            generatedFilesDir,
            clientModules,
            siteConfig,
            siteMetadata,
            i18n,
            codeTranslations,
            globalData,
            routes,
            baseUrl,
        });
    });
}
/**
 * This is the crux of the Docusaurus server-side. It reads everything it needs—
 * code translations, config file, plugin modules... Plugins then use their
 * lifecycles to generate content and other data. It is side-effect-ful because
 * it generates temp files in the `.docusaurus` folder for the bundler.
 */
async function loadSite(params) {
    const context = await utils_2.PerfLogger.async('Load context', () => loadContext(params));
    const { plugins, routes, globalData } = await (0, plugins_1.loadPlugins)(context);
    const props = await createSiteProps({ plugins, routes, globalData, context });
    const site = { props, params };
    await createSiteFiles({
        site,
        globalData,
    });
    return site;
}
exports.loadSite = loadSite;
async function reloadSite(site) {
    // TODO this can be optimized, for example:
    //  - plugins loading same data as before should not recreate routes/bundles
    //  - codegen does not need to re-run if nothing changed
    return loadSite(site.params);
}
exports.reloadSite = reloadSite;
async function reloadSitePlugin(site, pluginIdentifier) {
    const { plugins, routes, globalData } = await (0, plugins_1.reloadPlugin)({
        pluginIdentifier,
        plugins: site.props.plugins,
        context: site.props,
    });
    const newProps = await createSiteProps({
        plugins,
        routes,
        globalData,
        context: site.props, // Props extends Context
    });
    const newSite = {
        props: newProps,
        params: site.params,
    };
    // TODO optimize, bypass useless codegen if new site is similar to old site
    await createSiteFiles({ site: newSite, globalData });
    return newSite;
}
exports.reloadSitePlugin = reloadSitePlugin;
