// ==UserScript==
// @name         🏆 LINUX DO OAuth 极简助手 - 面板集成版 (无自动点击)
// @namespace    https://github.com/TechnologyStar/linuxdo-oauth-helper
// @version      3.0.2
// @description  🎯 专为LINUX DO OAuth设计的三主题UI助手 - 简约白/紫色渐变/彩虹华丽 + 条形图统计 (已移除自动点击功能)
// @author       Premium UI Designer
// @match        https://connect.linux.do/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_download
// @license      MIT
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIyMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRTVFN0VCIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfkpA8L3RleHQ+PC9zdmc+
// @downloadURL https://update.greasyfork.org/scripts/544675/%F0%9F%8F%86%20LINUX%20DO%20OAuth%20%E6%9E%81%E7%AE%80%E5%8A%A9%E6%89%8B%20-%20%E9%9D%A2%E6%9D%BF%E9%9B%86%E6%88%90%E7%89%88.user.js
// @updateURL https://update.greasyfork.org/scripts/544675/%F0%9F%8F%86%20LINUX%20DO%20OAuth%20%E6%9E%81%E7%AE%80%E5%8A%A9%E6%89%8B%20-%20%E9%9D%A2%E6%9D%BF%E9%9B%86%E6%88%90%E7%89%88.meta.js
// ==/UserScript==
(function() {
    'use strict';
    // ================== 配置 ==================
    const CONFIG = {
        version: '3.2.0',
        github: 'https://github.com/TechnologyStar/linuxdo-oauth-helper',
        defaultSettings: {
            // 核心功能
            // autoClickApprove: false, // ❌ 已移除：自动点击授权
            saveLoginHistory: false,
            showNotifications: false,
            // 网站限制
            // restrictByWebsite: true,  // ❌ 已移除：默认开启限制：只对白名单网站自动授权
            // useRemoteWhitelist: true, // ❌ 已移除：默认启用远程白名单
            // remoteWhitelistUrl: 'https://raw.githubusercontent.com/TechnologyStar/linuxdo-oauth-helper/refs/heads/main/whitelist.json', // ❌ 已移除
            // remoteWhitelistTtlMs: 6 * 60 * 60 * 1000, // ❌ 已移除：远程名单缓存时长：6小时
            // whitelist: [],            // ❌ 已移除：本地额外白名单（可选，手动补充）
            // UI设置
            autoHidePanel: false,
            enablePageStyling: true,
            theme: 'light',
            uiTheme: 'minimal-white',
            // 高级功能
            autoExportData: false,
            checkForUpdates: true,
            enableAdvancedStats: false,
            enableDebugMode: false,
            showChartStats: true, // 显示图表统计
            showHourlyChart: false, // 显示小时统计
            showWebsiteStats: false, // 显示网站统计
            // 时间设置
            // autoClickDelay: 10, // ❌ 已移除：自动点击延迟
            notificationDuration: 3000,
            panelPosition: 'top-right'
        },
        selectors: {
            // approveButton: 'a.bg-red-500[href*="/oauth2/approve/"]', // ❌ 已移除：自动点击相关选择器
            declineButton: 'a.bg-blue-500[href*="/oauth2/decline/"]',
            userInfo: 'h1.text-2xl'
        },
        themes: {
            light: {
                primary: '#ffffff',
                secondary: '#f9fafb',
                accent: '#10b981',
                text: '#111827',
                border: '#e5e7eb'
            },
            dark: {
                primary: '#1f2937',
                secondary: '#111827',
                accent: '#34d399',
                text: '#f9fafb',
                border: '#374151'
            }
        },
        uiThemes: {
            'minimal-white': {
                name: '简约白',
                description: '极简白色设计，清爽简洁',
                icon: '⚪',
                colors: {
                    panelBg: '#ffffff',
                    panelBorder: '#e5e7eb',
                    triggerBg: '#ffffff',
                    accent: '#10b981',
                    text: '#111827',
                    textMuted: '#6b7280'
                }
            },
            'purple-gradient': {
                name: '紫色渐变',
                description: '基于OAuth页面的紫色渐变设计',
                icon: '🟣',
                colors: {
                    panelBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    panelBorder: 'rgba(255,255,255,0.2)',
                    triggerBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    accent: '#4c51bf',
                    text: '#ffffff',
                    textMuted: 'rgba(255,255,255,0.8)'
                }
            },
            'rainbow-fancy': {
                name: '彩虹华丽',
                description: '炫酷多彩动画设计，视觉冲击',
                icon: '🌈',
                colors: {
                    panelBg: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                    panelBorder: 'rgba(255,255,255,0.3)',
                    triggerBg: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                    accent: '#ff6b6b',
                    text: '#ffffff',
                    textMuted: 'rgba(255,255,255,0.9)'
                }
            }
        }
    };
    // ================== 工具函数 ==================
    class Utils {
        static log(message, type = 'info') {
            const settings = window.oauthHelper?.storage?.getSettings() || {};
            if (settings.enableDebugMode || type === 'error') {
                console.log(`%c[OAuth Helper] ${message}`,
                            type === 'error' ? 'color: red' : 'color: #10B981',
                            new Date().toLocaleTimeString()
                           );
            }
        }
        static formatDate(date) {
            return new Date(date).toLocaleString('zh-CN');
        }
        static generateId() {
            return Date.now() + '-' + Math.random().toString(36).substr(2, 6);
        }
        static debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }
        static formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        // ✅ 规范化：输入 URL 或 文本 → 纯域名（不带协议、不带路径、不带末尾/）
        static normalizeHost(input = '') {
            if (!input) return '';
            let s = String(input).trim();
            // 先去协议、末尾斜杠、路径
            s = s.replace(/^https?:\/\//i, '').replace(/\/+$/g, '');
            s = s.split('/')[0];
            return s.toLowerCase();
        }
        // ✅ 远程抓取文本（优先 GM_xmlhttpRequest，失败再用 fetch）
        static fetchText(url) {
            return new Promise((resolve, reject) => {
                if (typeof GM_xmlhttpRequest === 'function') {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url,
                        headers: { 'Cache-Control': 'no-cache' },
                        timeout: 15000,
                        onload: r => resolve(r.responseText),
                        onerror: e => reject(e && e.error || 'GM_xmlhttpRequest error'),
                        ontimeout: () => reject('GM_xmlhttpRequest timeout')
                    });
                } else {
                    fetch(url, { cache: 'no-store' })
                        .then(res => res.text())
                        .then(resolve)
                        .catch(err => reject(err?.message || 'fetch error'));
                }
            });
        }
        // ✅ 加载或刷新远程白名单（按行解析，忽略空行和 # 注释）
        // 结果会缓存到 Storage 的 remoteWhitelist / remoteWhitelistUpdatedAt
        static async loadRemoteWhitelist(storage, settings) {
            // ❌ 已移除：相关逻辑
            return []; // 返回空数组
        }
        // ✅ 判断 host 是否在 {远程 | 本地} 白名单（支持 *.example.com）
        static isHostAllowed(host, lists = []) {
            // ❌ 已移除：相关逻辑
            return true; // 默认允许
        }
        static exportToJSON(data, filename) {
            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
        static async importFromJSON(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                };
                reader.onerror = reject;
                reader.readAsText(file);
            });
        }
        // 生成条形图HTML
        static generateBarChart(data, options = {}) {
            const {
                maxHeight = 80,
                barColor = '#10b981',
                backgroundColor = '#f3f4f6',
                showValues = true,
                className = 'oauth-chart-bar'
            } = options;
            const maxValue = Math.max(...Object.values(data));
            if (maxValue === 0) return '<div class="oauth-chart-empty">📊 暂无统计数据</div>';
            return Object.entries(data).map(([label, value]) => {
                const percentage = (value / maxValue) * 100;
                const height = Math.max((percentage / 100) * maxHeight, 4); // 最小高度4px
                return `
                    <div class="oauth-chart-bar-container">
                        <div class="oauth-chart-bar-wrapper" style="height: ${maxHeight + 5}px;">
                            <div class="${className}"
                                 style="height: ${height}px; background: ${barColor};"
                                 data-value="${value}" data-label="${label}">
                                ${showValues && value > 0 ? `<span class="oauth-chart-value">${value}</span>` : ''}
                            </div>
                        </div>
                        <div class="oauth-chart-label" title="${label}: ${value}次">${label}</div>
                    </div>
                `;
            }).join('');
        }
        // 生成时间序列数据（最近7天）
        static generateTimeSeriesData(history) {
            const now = new Date();
            const last7Days = {};
            // 初始化最近7天
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                const dateKey = date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
                last7Days[dateKey] = 0;
            }
            // 统计每天的登录次数
            history.forEach(record => {
                const recordDate = new Date(record.timestamp);
                const dateKey = recordDate.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
                if (last7Days.hasOwnProperty(dateKey)) {
                    last7Days[dateKey]++;
                }
            });
            return last7Days;
        }
        // 生成小时统计数据（今天24小时）
        static generateHourlyData(history) {
            const today = new Date();
            const todayStr = today.toDateString();
            const hourlyData = {};
            // 初始化24小时
            for (let i = 0; i < 24; i++) {
                const hour = i.toString().padStart(2, '0') + ':00';
                hourlyData[hour] = 0;
            }
            // 统计今天各小时的登录次数
            history.forEach(record => {
                const recordDate = new Date(record.timestamp);
                if (recordDate.toDateString() === todayStr) {
                    const hour = recordDate.getHours().toString().padStart(2, '0') + ':00';
                    hourlyData[hour]++;
                }
            });
            return hourlyData;
        }
        // 生成网站统计数据
        static generateWebsiteStats(history) {
            const websites = {};
            history.forEach(record => {
                const website = record.website || '未知网站';
                websites[website] = (websites[website] || 0) + 1;
            });
            // 排序并取前5个
            const sortedWebsites = Object.entries(websites)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
            return sortedWebsites;
        }
        // 生成操作类型统计
        static generateActionStats(history) {
            const actions = {
                // '自动授权': 0, // ❌ 已移除：自动授权统计
                '手动授权': 0,
                '手动拒绝': 0
            };
            history.forEach(record => {
                // if (record.action === '自动授权') { // ❌ 已移除：自动授权判断
                //     actions['自动授权']++;
                // } else
                if (record.action === '手动授权') {
                    actions['手动授权']++;
                } else if (record.action === '手动拒绝') {
                    actions['手动拒绝']++;
                }
            });
            return actions;
        }
    }
    // ================== 存储管理 ==================
    class Storage {
        constructor() {
            this.prefix = 'loh_';
            this.initStorage();
        }
        initStorage() {
            const keys = ['settings', 'stats', 'history', 'metadata']; // ❌ 已移除：'remoteWhitelist', 'remoteWhitelistUpdatedAt'
            keys.forEach(key => {
                if (this.get(key) === null) {
                    this.set(key, this.getDefaultValue(key));
                }
            });
        }
        getDefaultValue(key) {
            const defaults = {
                settings: CONFIG.defaultSettings,
                stats: {
                    totalLogins: 0,
                    // autoClicks: 0, // ❌ 已移除：自动点击统计
                    manualClicks: 0,
                    sessionsCount: 0,
                    lastUpdate: null,
                    installDate: new Date().toISOString(),
                    totalUsageTime: 0,
                    declineCount: 0
                },
                history: [],
                metadata: {
                    version: CONFIG.version,
                    lastBackup: null,
                    migrationVersion: 1
                }
                // ❌ 已移除：remoteWhitelist 和 remoteWhitelistUpdatedAt 的默认值
            };
            return defaults[key] || {};
        }
        get(key, defaultValue = null) {
            try {
                return GM_getValue(this.prefix + key, defaultValue);
            } catch (error) {
                Utils.log(`读取存储失败: ${key}`, 'error');
                return defaultValue;
            }
        }
        set(key, value) {
            try {
                GM_setValue(this.prefix + key, value);
                Utils.log(`存储成功: ${key}`);
                return true;
            } catch (error) {
                Utils.log(`存储失败: ${key}`, 'error');
                return false;
            }
        }
        getSettings() {
            return { ...CONFIG.defaultSettings, ...this.get('settings', {}) };
        }
        updateSetting(key, value) {
            const settings = this.getSettings();
            settings[key] = value;
            this.set('settings', settings);
            Utils.log(`设置更新: ${key} = ${value}`);
        }
        addHistory(record) {
            const history = this.get('history', []);
            const newRecord = {
                id: Utils.generateId(),
                timestamp: new Date().toISOString(),
                ...record
            };
            history.unshift(newRecord);
            if (history.length > 200) { // 增加历史记录数量
                history.splice(200);
            }
            this.set('history', history);
            Utils.log('历史记录已保存');
            return newRecord;
        }
        getHistory() {
            return this.get('history', []);
        }
        clearHistory() {
            this.set('history', []);
            Utils.log('历史记录已清空');
        }
        updateStats(key, value = 1) {
            const stats = this.get('stats', this.getDefaultValue('stats'));
            stats[key] = (stats[key] || 0) + value;
            stats.lastUpdate = new Date().toISOString();
            this.set('stats', stats);
            Utils.log(`统计更新: ${key} +${value}`);
        }
        getStats() {
            return this.get('stats', this.getDefaultValue('stats'));
        }
        exportAllData() {
            const data = {
                settings: this.getSettings(),
                stats: this.getStats(),
                history: this.getHistory(),
                metadata: {
                    version: CONFIG.version,
                    exportDate: new Date().toISOString(),
                    dataSize: this.calculateDataSize()
                }
            };
            return data;
        }
        importAllData(data) {
            try {
                if (data.settings) this.set('settings', data.settings);
                if (data.stats) this.set('stats', data.stats);
                if (data.history) this.set('history', data.history);
                Utils.log('数据导入成功');
                return true;
            } catch (error) {
                Utils.log('数据导入失败: ' + error.message, 'error');
                return false;
            }
        }
        calculateDataSize() {
            let totalSize = 0;
            // ❌ 已移除：'remoteWhitelist', 'remoteWhitelistUpdatedAt' 的计算
            ['settings', 'stats', 'history', 'metadata'].forEach(key => {
                const data = this.get(key);
                if (data) {
                    totalSize += JSON.stringify(data).length;
                }
            });
            return totalSize;
        }
    }
    // ================== 页面信息提取 ==================
    class PageInfo {
        constructor() {
            this.extract();
        }
        extract() {
            try {
                const userEl = document.querySelector('h1.text-2xl');
                const userText = userEl ? userEl.textContent : '';
                const userMatch = userText.match(/你好，\s*$([^)]+)$\s*(\d+)级用户/);
                const systemEl = this.findTextElement('系统:');
                const system = systemEl ? systemEl.textContent.replace('系统:', '').trim() : '未知系统';
                // ✅ 正确从同一 <p> 内部取到 <a>
                const websiteEl = this.findTextElement('网站:');
                let website = '未知网站';
                let websiteUrl = '';
                if (websiteEl) {
                    const link = websiteEl.querySelector('a');
                    if (link) {
                        website = (link.textContent || '').trim();
                        websiteUrl = link.getAttribute('href') || '';
                    } else {
                        website = websiteEl.textContent.replace('网站:', '').trim();
                    }
                }
                // ✅ 归一化为纯域名（不带 https:// 且无末尾 /）
                const websiteHost = Utils.normalizeHost(websiteUrl || website);
                const descEl = this.findTextElement('描述:');
                const description = descEl ? descEl.textContent.replace('描述:', '').trim() : '无描述';
                this.info = {
                    user: {
                        name: userMatch ? userMatch[1] : '未知用户',
                        level: userMatch ? parseInt(userMatch[2]) : 0
                    },
                    system,
                    website,
                    websiteUrl,
                    description,
                    extractTime: new Date().toISOString(),
                    pageType: this.getPageType(),
                    url: window.location.href
                };
                Utils.log('页面信息提取完成');
            } catch (error) {
                Utils.log('页面信息提取失败', 'error');
                this.info = {
                    user: { name: '未知用户', level: 0 },
                    system: '未知系统',
                    website: '未知网站',
                    websiteUrl: '',
                    websiteHost,
                    description: '无描述',
                    extractTime: new Date().toISOString(),
                    pageType: this.getPageType(),
                    url: window.location.href
                };
            }
        }
        getPageType() {
            const path = window.location.pathname;
            if (path.includes('/oauth2/approve')) return 'oauth-approve';
            if (path.includes('/oauth2/decline')) return 'oauth-decline';
            if (path.includes('/oauth2/')) return 'oauth-other';
            return 'main';
        }
        findTextElement(text) {
            const elements = document.querySelectorAll('strong');
            for (const el of elements) {
                if (el.textContent.includes(text)) {
                    return el.parentElement;
                }
            }
            return null;
        }
        get() {
            return this.info;
        }
    }
    // ================== 点击跟踪管理器 ==================
    class ClickTracker {
        constructor(storage, settings) {
            this.storage = storage;
            this.settings = settings;
            this.hasTrackedManualClick = false;
            this.pageInfo = new PageInfo();
            Utils.log('点击跟踪管理器初始化');
            this.init();
        }
        async init() {
            await this.waitForButtons();
            this.addManualClickListeners();
        }
        async waitForButtons() {
            return new Promise((resolve) => {
                const checkButtons = () => {
                    // const approveBtn = document.querySelector(CONFIG.selectors.approveButton); // ❌ 已移除：自动点击相关按钮检查
                    const declineBtn = document.querySelector(CONFIG.selectors.declineButton);
                    if (/* approveBtn || */ declineBtn) { // ❌ 已移除：approveBtn 检查
                        Utils.log('找到授权按钮，准备添加监听器');
                        resolve();
                    } else {
                        setTimeout(checkButtons, 100);
                    }
                };
                checkButtons();
            });
        }
        addManualClickListeners() {
            // const approveBtn = document.querySelector(CONFIG.selectors.approveButton); // ❌ 已移除：自动点击相关按钮监听
            // if (approveBtn) {
            //     approveBtn.addEventListener('click', (e) => {
            //         Utils.log('检测到手动点击授权按钮');
            //         this.recordManualClick('手动授权', 'approve');
            //     });
            // }
            const declineBtn = document.querySelector(CONFIG.selectors.declineButton);
            if (declineBtn) {
                declineBtn.addEventListener('click', (e) => {
                    Utils.log('检测到手动点击拒绝按钮');
                    this.recordManualClick('手动拒绝', 'decline');
                });
            }
        }
        recordManualClick(action, type) {
            if (this.hasTrackedManualClick) {
                Utils.log('已记录过手动点击，跳过');
                return;
            }
            this.hasTrackedManualClick = true;
            if (this.settings.saveLoginHistory) {
                const pageInfo = this.pageInfo.get();
                this.storage.addHistory({
                    action: action,
                    system: pageInfo.system,
                    website: pageInfo.website,
                    description: pageInfo.description,
                    user: pageInfo.user,
                    clickType: 'manual',
                    buttonType: type,
                    pageType: pageInfo.pageType,
                    url: pageInfo.url
                });
                Utils.log(`手动点击历史已记录: ${action}`);
            }
            this.storage.updateStats('manualClicks');
            this.storage.updateStats('totalLogins');
            if (type === 'decline') {
                this.storage.updateStats('declineCount');
            }
            Utils.log(`手动点击统计已更新: ${action}`);
            if (this.settings.showNotifications) {
                this.showNotification(`${action}已记录`);
            }
        }
        showNotification(message) {
            if (typeof GM_notification === 'function') {
                GM_notification({
                    title: '🏆 OAuth助手',
                    text: message,
                    timeout: this.settings.notificationDuration
                });
            }
        }
        updateSettings(settings) {
            this.settings = settings;
        }
    }
    // ================== 自动点击管理器 ==================
    // ❌ 已移除：整个 AutoClickManager 类
    /*
    class AutoClickManager {
        constructor(storage, settings) {
            // ... 原有代码 ...
        }
        init() {
            // ... 原有代码 ...
        }
        async attemptAutoClick() {
            // ... 原有代码 ...
        }
        showNotification(message) {
            // ... 原有代码 ...
        }
        updateSettings(settings) {
            // ... 原有代码 ...
        }
    }
    */

    // ================== UI管理器 ==================
    class UIManager {
        constructor(storage) {
            this.storage = storage;
            this.settings = storage.getSettings();
            this.isVisible = false;
            this.currentTheme = this.settings.theme;
            this.currentUITheme = this.settings.uiTheme || 'minimal-white';
            this.init();
        }
        init() {
            this.addStyles();
            this.createUI();
            this.bindEvents();
            this.applyTheme();
            this.applyUITheme();
            Utils.log('UI管理器初始化完成');
        }
        addStyles() {
            const isOAuthPage = this.isOAuthPage();
            const enableStyling = this.settings.enablePageStyling;
            const uiTheme = CONFIG.uiThemes[this.currentUITheme];
            let css = `
                /* OAuth助手基础样式 */
                .oauth-helper {
                    position: fixed;
                    ${this.getPositionStyles()}
                    z-index: 10000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }
                .oauth-trigger {
                    width: 48px;
                    height: 48px;
                    background: ${uiTheme.colors.triggerBg};
                    border: 2px solid ${uiTheme.colors.panelBorder};
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    color: ${uiTheme.colors.text};
                    font-size: 20px;
                    ${this.currentUITheme === 'rainbow-fancy' ? 'animation: rainbow-rotate 4s ease-in-out infinite;' : ''}
                }
                .oauth-trigger:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'filter: brightness(1.1);' : ''}
                }
                .oauth-trigger.active {
                    transform: translateY(-1px) scale(1.02);
                    box-shadow: 0 8px 12px -2px rgba(0, 0, 0, 0.15);
                }
                .oauth-panel {
                    position: absolute;
                    ${this.getPanelPositionStyles()}
                    width: 400px;
                    background: ${uiTheme.colors.panelBg};
                    border: 2px solid ${uiTheme.colors.panelBorder};
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-12px) scale(0.95);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow: hidden;
                    max-height: 80vh;
                    backdrop-filter: blur(10px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'animation: rainbow-bg 6s ease-in-out infinite; background-size: 400% 400%;' : ''}
                }
                .oauth-panel.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                .oauth-header {
                    padding: 20px 24px;
                    background: ${this.currentUITheme === 'minimal-white' ? '#fafafa' : 'rgba(255,255,255,0.1)'};
                    border-bottom: 1px solid ${uiTheme.colors.panelBorder};
                    backdrop-filter: blur(5px);
                }
                .oauth-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: ${uiTheme.colors.text};
                    margin: 0;
                    ${this.currentUITheme === 'rainbow-fancy' ? 'background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow-text 3s ease-in-out infinite;' : ''}
                }
                .oauth-version {
                    font-size: 11px;
                    color: ${uiTheme.colors.textMuted};
                    margin-top: 4px;
                    font-weight: 500;
                }
                .oauth-content {
                    padding: 0;
                    max-height: calc(80vh - 100px);
                    overflow-y: auto;
                    background: ${this.currentUITheme === 'minimal-white' ? 'transparent' : 'rgba(255,255,255,0.05)'};
                }
                .oauth-content::-webkit-scrollbar {
                    width: 6px;
                }
                .oauth-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                .oauth-content::-webkit-scrollbar-thumb {
                    background: ${uiTheme.colors.textMuted};
                    border-radius: 3px;
                    opacity: 0.5;
                }
                .oauth-section {
                    padding: 18px 24px;
                    border-bottom: 1px solid ${uiTheme.colors.panelBorder};
                    backdrop-filter: blur(2px);
                }
                .oauth-section:last-child {
                    border-bottom: none;
                }
                .oauth-section-title {
                    font-size: 14px;
                    font-weight: 700;
                    color: ${uiTheme.colors.text};
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    ${this.currentUITheme === 'rainbow-fancy' ? 'text-shadow: 0 0 10px rgba(255,255,255,0.5);' : ''}
                }
                .oauth-switch-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 14px 16px;
                    background: ${this.currentUITheme === 'minimal-white' ? '#f9fafb' : 'rgba(255,255,255,0.1)'};
                    border-radius: 12px;
                    margin-bottom: 10px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'border: 1px solid rgba(255,255,255,0.2);' : ''}
                }
                .oauth-switch-item:hover {
                    background: ${this.currentUITheme === 'minimal-white' ? '#f3f4f6' : 'rgba(255,255,255,0.15)'};
                    transform: translateY(-1px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'box-shadow: 0 4px 15px rgba(0,0,0,0.1);' : ''}
                }
                .oauth-switch-info {
                    flex: 1;
                }
                .oauth-switch-label {
                    font-size: 14px;
                    color: ${uiTheme.colors.text};
                    font-weight: 600;
                    margin-bottom: 3px;
                }
                .oauth-switch-desc {
                    font-size: 12px;
                    color: ${uiTheme.colors.textMuted};
                    line-height: 1.4;
                }
                .oauth-switch {
                    position: relative;
                    width: 44px;
                    height: 24px;
                    background: ${this.currentUITheme === 'minimal-white' ? '#e5e7eb' : 'rgba(255,255,255,0.2)'};
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }
                .oauth-switch.active {
                    background: ${uiTheme.colors.accent};
                    ${this.currentUITheme === 'rainbow-fancy' ? 'box-shadow: 0 0 20px rgba(255,107,107,0.6);' : ''}
                }
                .oauth-switch-knob {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                .oauth-switch.active .oauth-switch-knob {
                    transform: translateX(20px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'box-shadow: 0 0 15px rgba(255,255,255,0.8);' : ''}
                }
                .oauth-btn {
                    background: ${this.currentUITheme === 'minimal-white' ? 'white' : 'rgba(255,255,255,0.1)'};
                    border: 1px solid ${uiTheme.colors.panelBorder};
                    color: ${uiTheme.colors.text};
                    font-size: 12px;
                    padding: 8px 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    margin-right: 8px;
                    margin-bottom: 6px;
                    backdrop-filter: blur(5px);
                    display: inline-block;
                }
                .oauth-btn:hover {
                    background: ${this.currentUITheme === 'minimal-white' ? '#f3f4f6' : 'rgba(255,255,255,0.2)'};
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .oauth-btn.primary {
                    background: ${uiTheme.colors.accent};
                    color: white;
                    border-color: ${uiTheme.colors.accent};
                    ${this.currentUITheme === 'rainbow-fancy' ? 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border: none;' : ''}
                }
                .oauth-btn.primary:hover {
                    ${this.currentUITheme === 'rainbow-fancy' ? 'filter: brightness(1.1); transform: translateY(-2px);' : 'filter: brightness(0.9);'}
                }
                .oauth-btn.danger {
                    border-color: #ef4444;
                    color: #ef4444;
                }
                .oauth-btn.danger:hover {
                    border-color: #dc2626;
                    color: #dc2626;
                    background: ${this.currentUITheme === 'minimal-white' ? '#fef2f2' : 'rgba(239,68,68,0.1)'};
                }
                .oauth-stat-card {
                    background: ${this.currentUITheme === 'minimal-white' ? '#f9fafb' : 'rgba(255,255,255,0.1)'};
                    border: 1px solid ${uiTheme.colors.panelBorder};
                    border-radius: 12px;
                    padding: 16px;
                    text-align: center;
                    margin-bottom: 10px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'border: 1px solid rgba(255,255,255,0.2);' : ''}
                }
                .oauth-stat-card:hover {
                    transform: translateY(-2px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'box-shadow: 0 8px 25px rgba(0,0,0,0.15);' : ''}
                }
                .oauth-stat-value {
                    font-size: 24px;
                    font-weight: 800;
                    color: ${uiTheme.colors.text};
                    margin-bottom: 6px;
                    ${this.currentUITheme === 'rainbow-fancy' ? 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;' : ''}
                }
                .oauth-stat-label {
                    font-size: 11px;
                    color: ${uiTheme.colors.textMuted};
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .oauth-stat-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 16px;
                }
                /* 条形图样式 */
                .oauth-chart-container {
                    background: ${this.currentUITheme === 'minimal-white' ? '#f9fafb' : 'rgba(255,255,255,0.1)'};
                    border: 1px solid ${uiTheme.colors.panelBorder};
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 16px;
                    backdrop-filter: blur(5px);
                    ${this.currentUITheme === 'rainbow-fancy' ? 'border: 1px solid rgba(255,255,255,0.2);' : ''}
                }
                .oauth-chart-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: ${uiTheme.colors.text};
                    margin-bottom: 12px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }
                .oauth-chart-bars {
                    display: flex;
                    align-items: end;
                    gap: 6px;
                    height: 100px;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }
                .oauth-chart-bar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    min-width: 0;
                }
                .oauth-chart-bar-wrapper {
                    position: relative;
                    display: flex;
                    align-items: end;
                    width: 100%;
                    margin-bottom: 8px;
                }
                .oauth-chart-bar {
                    width: 100%;
                    background: ${uiTheme.colors.accent};
                    border-radius: 4px 4px 0 0;
                    position: relative;
                    transition: all 0.3s ease;
                    min-height: 4px;
                    cursor: pointer;
                    ${this.currentUITheme === 'rainbow-fancy' ? 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4); box-shadow: 0 2px 8px rgba(255,107,107,0.3);' : ''}
                }
                .oauth-chart-bar:hover {
                    ${this.currentUITheme === 'rainbow-fancy' ? 'filter: brightness(1.1); box-shadow: 0 4px 12px rgba(255,107,107,0.4);' : 'filter: brightness(0.9);'}
                    transform: translateY(-1px);
                }
                .oauth-chart-value {
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 10px;
                    font-weight: 600;
                    color: ${uiTheme.colors.text};
                    background: ${this.currentUITheme === 'minimal-white' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)'};
                    padding: 2px 6px;
                    border-radius: 4px;
                    white-space: nowrap;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .oauth-chart-bar:hover .oauth-chart-value {
                    opacity: 1;
                }
                .oauth-chart-label {
                    font-size: 10px;
                    color: ${uiTheme.colors.textMuted};
                    font-weight: 500;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                }
                .oauth-chart-empty {
                    text-align: center;
                    color: ${uiTheme.colors.textMuted};
                    font-size: 12px;
                    padding: 40px 20px;
                    font-style: italic;
                }
                .oauth-history-item {
                    padding: 16px;
                    border-bottom: 1px solid ${uiTheme.colors.panelBorder};
                    font-size: 13px;
                    transition: all 0.3s ease;
                }
                .oauth-history-item:hover {
                    background: ${this.currentUITheme === 'minimal-white' ? '#f9fafb' : 'rgba(255,255,255,0.05)'};
                    padding-left: 20px;
                }
                .oauth-history-item:last-child {
                    border-bottom: none;
                }
                .oauth-history-title {
                    font-weight: 700;
                    color: ${uiTheme.colors.text};
                    margin-bottom: 6px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .oauth-history-detail {
                    color: ${uiTheme.colors.textMuted};
                    margin-bottom: 3px;
                    font-size: 12px;
                }
                .oauth-history-time {
                    color: ${uiTheme.colors.textMuted};
                    font-size: 10px;
                    font-weight: 500;
                }
                .oauth-history-badge {
                    font-size: 10px;
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .oauth-history-badge.auto {
                    background: ${this.currentUITheme === 'minimal-white' ? '#dbeafe' : 'rgba(59,130,246,0.2)'};
                    color: ${this.currentUITheme === 'minimal-white' ? '#1e40af' : '#93c5fd'};
                }
                .oauth-history-badge.manual {
                    background: ${this.currentUITheme === 'minimal-white' ? '#d1fae5' : 'rgba(34,197,94,0.2)'};
                    color: ${this.currentUITheme === 'minimal-white' ? '#065f46' : '#86efac'};
                }
                .oauth-empty {
                    text-align: center;
                    padding: 40px 20px;
                    color: ${uiTheme.colors.textMuted};
                    font-style: italic;
                    font-size: 12px;
                }
                .oauth-divider {
                    height: 1px;
                    background: ${uiTheme.colors.panelBorder};
                    margin: 16px 0;
                }
                .oauth-input, .oauth-select {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1px solid ${uiTheme.colors.panelBorder};
                    border-radius: 8px;
                    background: ${this.currentUITheme === 'minimal-white' ? 'white' : 'rgba(255,255,255,0.1)'};
                    color: ${uiTheme.colors.text};
                    font-size: 13px;
                    margin: 6px 0;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }
                .oauth-input:focus, .oauth-select:focus {
                    outline: none;
                    border-color: ${uiTheme.colors.accent};
                    ${this.currentUITheme === 'rainbow-fancy' ? 'box-shadow: 0 0 20px rgba(255,107,107,0.3);' : 'box-shadow: 0 0 0 3px rgba(16,185,129,0.1);'}
                }
                .oauth-ui-theme-selector {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 8px;
                    margin-top: 12px;
                }
                .oauth-ui-theme-option {
                    padding: 12px 8px;
                    border: 2px solid ${uiTheme.colors.panelBorder};
                    border-radius: 10px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: ${this.currentUITheme === 'minimal-white' ? 'white' : 'rgba(255,255,255,0.1)'};
                    backdrop-filter: blur(5px);
                }
                .oauth-ui-theme-option:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .oauth-ui-theme-option.active {
                    border-color: ${uiTheme.colors.accent};
                    background: ${this.currentUITheme === 'minimal-white' ? '#f0fdf4' : 'rgba(16,185,129,0.1)'};
                    ${this.currentUITheme === 'rainbow-fancy' ? 'box-shadow: 0 0 20px rgba(255,107,107,0.3);' : ''}
                }
                .oauth-ui-theme-icon {
                    font-size: 18px;
                    margin-bottom: 4px;
                }
                .oauth-ui-theme-name {
                    font-size: 11px;
                    font-weight: 600;
                    color: ${uiTheme.colors.text};
                }
                /* 动画效果 */
                @keyframes rainbow-rotate {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.1); }
                }
                @keyframes rainbow-bg {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes rainbow-text {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .oauth-highlight {
                    animation: pulse 1s ease-in-out 3;
                }
                .oauth-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
            `;
            // 只在OAuth页面且启用UI优化时添加页面美化样式
            if (isOAuthPage && enableStyling) {
                css += this.getOAuthPageStyles();
            }
            GM_addStyle(css);
        }
        getOAuthPageStyles() {
            const uiTheme = this.currentUITheme;
            switch (uiTheme) {
                case 'purple-gradient':
                    return `
                        /* 紫色渐变主题页面美化 */
                        body {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                            min-height: 100vh;
                        }
                        .bg-white {
                            background: rgba(255,255,255,0.95) !important;
                            backdrop-filter: blur(10px) !important;
                            border-radius: 20px !important;
                            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                            border: 1px solid rgba(255,255,255,0.2) !important;
                        }
                        .bg-red-500, .bg-blue-500 {
                            border-radius: 12px !important;
                            font-weight: 600 !important;
                            padding: 12px 24px !important;
                            transition: all 0.3s ease !important;
                            backdrop-filter: blur(5px) !important;
                        }
                        .bg-red-500 {
                            background: linear-gradient(135deg, #10b981, #059669) !important;
                            color: white !important;
                            border: none !important;
                        }
                        .bg-red-500:hover {
                            background: linear-gradient(135deg, #059669, #047857) !important;
                            transform: translateY(-2px) !important;
                            box-shadow: 0 10px 25px rgba(16,185,129,0.4) !important;
                        }
                        .bg-red-500::before {
                            content: '✓ ';
                            color: white;
                            font-weight: bold;
                        }
                        .bg-blue-500 {
                            background: rgba(239,68,68,0.9) !important;
                            color: white !important;
                            border: none !important;
                        }
                        .bg-blue-500:hover {
                            background: rgba(220,38,38,0.9) !important;
                            transform: translateY(-2px) !important;
                            box-shadow: 0 10px 25px rgba(239,68,68,0.4) !important;
                        }
                        .bg-blue-500::before {
                            content: '✕ ';
                            color: white;
                            font-weight: bold;
                        }
                        /* 权限说明框样式 */
                        .bg-white p:has(strong) {
                            background: linear-gradient(135deg, #fef3c7, #fde68a) !important;
                            padding: 16px !important;
                            border-radius: 12px !important;
                            border-left: 4px solid #f59e0b !important;
                            margin: 16px 0 !important;
                        }
                    `;
                case 'rainbow-fancy':
                    return `
                        /* 彩虹华丽主题页面美化 */
                        body {
                            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) !important;
                            background-size: 400% 400% !important;
                            animation: rainbow-bg 6s ease-in-out infinite !important;
                            min-height: 100vh !important;
                        }
                        .bg-white {
                            background: rgba(255,255,255,0.1) !important;
                            backdrop-filter: blur(20px) !important;
                            border-radius: 25px !important;
                            box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4) !important;
                            border: 2px solid rgba(255,255,255,0.3) !important;
                            position: relative !important;
                            overflow: hidden !important;
                        }
                        .bg-white::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
                            animation: shine 3s ease-in-out infinite;
                            pointer-events: none;
                        }
                        @keyframes shine {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        .bg-red-500, .bg-blue-500 {
                            border-radius: 15px !important;
                            font-weight: 700 !important;
                            padding: 14px 28px !important;
                            transition: all 0.4s ease !important;
                            backdrop-filter: blur(10px) !important;
                            position: relative !important;
                            overflow: hidden !important;
                        }
                        .bg-red-500 {
                            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4) !important;
                            background-size: 300% 300% !important;
                            animation: rainbow-button 4s ease-in-out infinite !important;
                            color: white !important;
                            border: none !important;
                            text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
                        }
                        .bg-red-500:hover {
                            transform: translateY(-3px) scale(1.05) !important;
                            box-shadow: 0 15px 35px rgba(255,107,107,0.6) !important;
                            filter: brightness(1.2) !important;
                        }
                        .bg-red-500::before {
                            content: '✨ ';
                            color: white;
                            font-weight: bold;
                        }
                        .bg-blue-500 {
                            background: linear-gradient(45deg, #ff6b6b, #ee5a24, #ff9ff3, #54a0ff) !important;
                            background-size: 300% 300% !important;
                            animation: rainbow-button-reverse 4s ease-in-out infinite !important;
                            color: white !important;
                            border: none !important;
                            text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
                        }
                        .bg-blue-500:hover {
                            transform: translateY(-3px) scale(1.05) !important;
                            box-shadow: 0 15px 35px rgba(255,107,107,0.6) !important;
                            filter: brightness(1.2) !important;
                        }
                        .bg-blue-500::before {
                            content: '💫 ';
                            color: white;
                            font-weight: bold;
                        }
                        @keyframes rainbow-button {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                        @keyframes rainbow-button-reverse {
                            0%, 100% { background-position: 100% 50%; }
                            50% { background-position: 0% 50%; }
                        }
                        /* 华丽的权限说明框 */
                        .bg-white p:has(strong) {
                            background: linear-gradient(45deg, rgba(255,215,0,0.3), rgba(255,165,0,0.3)) !important;
                            padding: 20px !important;
                            border-radius: 15px !important;
                            border: 2px solid rgba(255,215,0,0.5) !important;
                            margin: 20px 0 !important;
                            box-shadow: 0 8px 25px rgba(255,215,0,0.3) !important;
                            position: relative !important;
                            overflow: hidden !important;
                        }
                        .bg-white p:has(strong)::before {
                            content: '🔒';
                            position: absolute;
                            top: 10px;
                            right: 15px;
                            font-size: 20px;
                            animation: float 2s ease-in-out infinite;
                        }
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-5px); }
                        }
                    `;
                default: // minimal-white
                    return `
        /* 简约白主题页面美化 */
        body {
            background: #f9fafb !important;
        }
        .bg-red-500, .bg-blue-500 {
            background: white !important;
            color: #374151 !important;
            border: 2px solid #e5e7eb !important;
            transition: all 0.2s ease !important;
            position: relative !important;
        }
        .bg-red-500:hover, .bg-blue-500:hover {
            background: #f9fafb !important;
            border-color: #d1d5db !important;
            color: #111827 !important;
            transform: translateY(-1px) !important;
        }
        .bg-red-500::before {
            content: '✓ ';
            color: #10b981;
            font-weight: bold;
        }
        .bg-blue-500::before {
            content: '✕ ';
            color: #ef4444;
            font-weight: bold;
        }
        /* 简约白主题的信息框样式 - 保持简洁 */
        .bg-white p:has(strong) {
            background: white !important;
            padding: 16px !important;
            border-radius: 8px !important;
            border: 1px solid #e5e7eb !important;
            margin: 16px 0 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
    `;
            }
        }
        getPositionStyles() {
            const pos = this.settings.panelPosition;
            switch (pos) {
                case 'top-left': return 'top: 20px; left: 20px;';
                case 'bottom-right': return 'bottom: 20px; right: 20px;';
                case 'bottom-left': return 'bottom: 20px; left: 20px;';
                default: return 'top: 20px; right: 20px;';
            }
        }
        getPanelPositionStyles() {
            const pos = this.settings.panelPosition;
            switch (pos) {
                case 'top-left': return 'top: 56px; left: 0;';
                case 'bottom-right': return 'bottom: 56px; right: 0;';
                case 'bottom-left': return 'bottom: 56px; left: 0;';
                default: return 'top: 56px; right: 0;';
            }
        }
        isOAuthPage() {
            return window.location.pathname.includes('/oauth2/');
        }
        createUI() {
            const ui = document.createElement('div');
            ui.className = 'oauth-helper';
            ui.innerHTML = `
                <div class="oauth-trigger" id="oauthTrigger">
                    🏆
                </div>
                <div class="oauth-panel" id="oauthPanel">
                    <div class="oauth-header">
                        <div class="oauth-title">🏆 OAuth助手</div>
                        <div class="oauth-version">v${CONFIG.version} - 面板集成版 (无自动点击)</div>
                    </div>
                    <div class="oauth-content">
                        ${this.generateContent()}
                    </div>
                </div>
            `;
            document.body.appendChild(ui);
            this.ui = ui;
        }
        generateContent() {
            return `
                ${this.generateUIThemeHTML()}
                ${this.generateSettingsHTML()}
                ${this.generateAdvancedSettingsHTML()}
                ${this.generateStatsHTML()}
                ${this.generateHistoryHTML()}
                ${this.generateToolsHTML()}
            `;
        }
        generateUIThemeHTML() {
            return `
                <div class="oauth-section">
                    <div class="oauth-section-title">
                        <span>🎨</span>
                        <span>UI主题切换</span>
                    </div>
                    <div style="margin-bottom: 12px; font-size: 12px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted};">
                        选择你喜欢的界面风格，即时生效
                    </div>
                    <div class="oauth-ui-theme-selector">
                        ${Object.entries(CONFIG.uiThemes).map(([key, theme]) => `
                            <div class="oauth-ui-theme-option ${this.currentUITheme === key ? 'active' : ''}"
                                 data-theme="${key}">
                                <div class="oauth-ui-theme-icon">${theme.icon}</div>
                                <div class="oauth-ui-theme-name">${theme.name}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 8px; font-size: 11px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted}; text-align: center;">
                        当前：${CONFIG.uiThemes[this.currentUITheme].description}
                    </div>
                    <div style="margin-top: 12px;">
                        <button class="oauth-btn primary" id="toggleUITheme">🔄 快速切换主题</button>
                        <button class="oauth-btn" id="toggleTheme">🌓 颜色主题</button>
                    </div>
                </div>
            `;
        }
        generateSettingsHTML() {
            const settings = this.settings;
            return `
        <div class="oauth-section">
            <div class="oauth-section-title">
                <span>⚙️</span>
                <span>基础设置</span>
            </div>
            <!-- 原有：保存登录记录 -->
            <div class="oauth-switch-item">
                <div class="oauth-switch-info">
                    <div class="oauth-switch-label">保存登录记录</div>
                    <div class="oauth-switch-desc">记录所有授权操作的详细历史</div>
                </div>
                <div class="oauth-switch ${settings.saveLoginHistory ? 'active' : ''}" data-setting="saveLoginHistory">
                    <div class="oauth-switch-knob"></div>
                </div>
            </div>
            <!-- 原有：显示通知 -->
            <div class="oauth-switch-item">
                <div class="oauth-switch-info">
                    <div class="oauth-switch-label">显示通知</div>
                    <div class="oauth-switch-desc">操作完成后显示提示通知</div>
                </div>
                <div class="oauth-switch ${settings.showNotifications ? 'active' : ''}" data-setting="showNotifications">
                    <div class="oauth-switch-knob"></div>
                </div>
            </div>
            <!-- 原有：启用UI优化 -->
            <div class="oauth-switch-item">
                <div class="oauth-switch-info">
                    <div class="oauth-switch-label">启用UI优化</div>
                    <div class="oauth-switch-desc">美化OAuth页面按钮和样式</div>
                </div>
                <div class="oauth-switch ${settings.enablePageStyling ? 'active' : ''}" data-setting="enablePageStyling">
                    <div class="oauth-switch-knob"></div>
                </div>
            </div>
            <!-- ❌ 已移除：网站白名单限制 -->
            <!--
            <div class="oauth-switch-item">
                <div class="oauth-switch-info">
                    <div class="oauth-switch-label">网站白名单限制</div>
                    <div class="oauth-switch-desc">只对白名单网站自动授权（默认开启）。名单来源：GitHub远程 + 本地补充</div>
                </div>
                <div class="oauth-switch ${settings.restrictByWebsite ? 'active' : ''}" data-setting="restrictByWebsite">
                    <div class="oauth-switch-knob"></div>
                </div>
            </div>
            -->
            <!-- ❌ 已移除：操作按钮行 -->
            <!--
            <div style="display:flex;gap:8px;align-items:center;margin-top:8px;">
                <button class="oauth-btn" id="refreshRemoteWhitelist">🔄 立即刷新远程白名单</button>
                <button class="oauth-btn" id="addCurrentSiteToWhitelist">➕ 把当前网站加入本地白名单</button>
            </div>
            -->
        </div>
    `;
        }
        generateAdvancedSettingsHTML() {
            const settings = this.settings;
            return `
                <div class="oauth-section">
                    <div class="oauth-section-title">
                        <span>🔧</span>
                        <span>高级设置</span>
                    </div>
                    <div class="oauth-switch-item">
                        <div class="oauth-switch-info">
                            <div class="oauth-switch-label">自动隐藏面板</div>
                            <div class="oauth-switch-desc">点击外部区域自动关闭面板</div>
                        </div>
                        <div class="oauth-switch ${settings.autoHidePanel ? 'active' : ''}" data-setting="autoHidePanel">
                            <div class="oauth-switch-knob"></div>
                        </div>
                    </div>
                    <div class="oauth-switch-item">
                        <div class="oauth-switch-info">
                            <div class="oauth-switch-label">显示图表统计</div>
                            <div class="oauth-switch-desc">显示最近7天登录趋势条形图</div>
                        </div>
                        <div class="oauth-switch ${settings.showChartStats ? 'active' : ''}" data-setting="showChartStats">
                            <div class="oauth-switch-knob"></div>
                        </div>
                    </div>
                    <div class="oauth-switch-item">
                        <div class="oauth-switch-info">
                            <div class="oauth-switch-label">显示小时统计</div>
                            <div class="oauth-switch-desc">显示今日24小时登录分布图</div>
                        </div>
                        <div class="oauth-switch ${settings.showHourlyChart ? 'active' : ''}" data-setting="showHourlyChart">
                            <div class="oauth-switch-knob"></div>
                        </div>
                    </div>
                    <div class="oauth-switch-item">
                        <div class="oauth-switch-info">
                            <div class="oauth-switch-label">显示网站统计</div>
                            <div class="oauth-switch-desc">显示各网站授权次数排行</div>
                        </div>
                        <div class="oauth-switch ${settings.showWebsiteStats ? 'active' : ''}" data-setting="showWebsiteStats">
                            <div class="oauth-switch-knob"></div>
                        </div>
                    </div>
                    <div class="oauth-switch-item">
                        <div class="oauth-switch-info">
                            <div class="oauth-switch-label">调试模式</div>
                            <div class="oauth-switch-desc">在控制台显示详细运行日志</div>
                        </div>
                        <div class="oauth-switch ${settings.enableDebugMode ? 'active' : ''}" data-setting="enableDebugMode">
                            <div class="oauth-switch-knob"></div>
                        </div>
                    </div>
                    <div style="margin-top: 12px;">
                        <label style="font-size: 12px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted};">颜色主题</label>
                        <select class="oauth-select" id="themeSelect">
                            <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>浅色主题</option>
                            <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>深色主题</option>
                            <option value="auto" ${settings.theme === 'auto' ? 'selected' : ''}>自动切换</option>
                        </select>
                    </div>
                    <div style="margin-top: 8px;">
                        <label style="font-size: 12px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted};">面板位置</label>
                        <select class="oauth-select" id="positionSelect">
                            <option value="top-right" ${settings.panelPosition === 'top-right' ? 'selected' : ''}>右上角</option>
                            <option value="top-left" ${settings.panelPosition === 'top-left' ? 'selected' : ''}>左上角</option>
                            <option value="bottom-right" ${settings.panelPosition === 'bottom-right' ? 'selected' : ''}>右下角</option>
                            <option value="bottom-left" ${settings.panelPosition === 'bottom-left' ? 'selected' : ''}>左下角</option>
                        </select>
                    </div>
                </div>
            `;
        }
        generateStatsHTML() {
            const stats = this.storage.getStats();
            const history = this.storage.getHistory();
            const isOAuth = this.isOAuthPage();
            const uiTheme = CONFIG.uiThemes[this.currentUITheme];
            // 生成多种统计图表
            let chartsHTML = '';
            if (this.settings.showChartStats) {
                const timeSeriesData = Utils.generateTimeSeriesData(history);
                const chartBars = Utils.generateBarChart(timeSeriesData, {
                    maxHeight: 80,
                    barColor: uiTheme.colors.accent,
                    showValues: true,
                    className: 'oauth-chart-bar'
                });
                chartsHTML += `
                    <div class="oauth-chart-container">
                        <div class="oauth-chart-title">📈 最近7天登录统计</div>
                        <div class="oauth-chart-bars">
                            ${chartBars}
                        </div>
                    </div>
                `;
            }
            if (this.settings.showHourlyChart) {
                const hourlyData = Utils.generateHourlyData(history);
                const hourlyBars = Utils.generateBarChart(hourlyData, {
                    maxHeight: 60,
                    barColor: '#8b5cf6',
                    showValues: true,
                    className: 'oauth-chart-bar'
                });
                chartsHTML += `
                    <div class="oauth-chart-container">
                        <div class="oauth-chart-title">🕐 今日小时分布</div>
                        <div class="oauth-chart-bars">
                            ${hourlyBars}
                        </div>
                    </div>
                `;
            }
            if (this.settings.showWebsiteStats) {
                const websiteData = Utils.generateWebsiteStats(history);
                const websiteBars = Utils.generateBarChart(websiteData, {
                    maxHeight: 70,
                    barColor: '#f59e0b',
                    showValues: true,
                    className: 'oauth-chart-bar'
                });
                chartsHTML += `
                    <div class="oauth-chart-container">
                        <div class="oauth-chart-title">🌍 网站授权排行 (TOP 5)</div>
                        <div class="oauth-chart-bars">
                            ${websiteBars}
                        </div>
                    </div>
                `;
            }
            return `
                <div class="oauth-section">
                    <div class="oauth-section-title">
                        <span>📊</span>
                        <span>使用统计</span>
                    </div>
                    <div class="oauth-stat-grid">
                        <div class="oauth-stat-card">
                            <div class="oauth-stat-value">${stats.totalLogins}</div>
                            <div class="oauth-stat-label">总授权次数</div>
                        </div>
                        <div class="oauth-stat-card">
                            <div class="oauth-stat-value">${stats.sessionsCount || 0}</div>
                            <div class="oauth-stat-label">使用会话</div>
                        </div>
                    </div>
                    <div class="oauth-stat-grid">
                        <div class="oauth-stat-card">
                            <div class="oauth-stat-value">${stats.manualClicks || 0}</div>
                            <div class="oauth-stat-label">手动点击</div>
                        </div>
                        <div class="oauth-stat-card">
                            <div class="oauth-stat-value">${stats.declineCount || 0}</div>
                            <div class="oauth-stat-label">拒绝次数</div>
                        </div>
                    </div>
                    ${chartsHTML}
                    ${isOAuth ? '<div style="text-align: center; margin-top: 8px; color: ' + uiTheme.colors.textMuted + '; font-size: 11px;">🔐 当前页面：OAuth授权模式</div>' : '<div style="text-align: center; margin-top: 8px; color: ' + uiTheme.colors.textMuted + '; font-size: 11px;">🏠 当前页面：主页面模式</div>'}
                </div>
            `;
        }
        generateHistoryHTML() {
            const history = this.storage.getHistory().slice(0, 6);
            let historyHTML = '';
            if (history.length === 0) {
                historyHTML = '<div class="oauth-empty">📋 暂无授权记录<br><small>启用"保存登录记录"后将显示历史</small></div>';
            } else {
                historyHTML = history.map(record => `
                    <div class="oauth-history-item">
                        <div class="oauth-history-title">
                            ${record.system || '未知系统'}
                            <span class="oauth-history-badge ${record.clickType}">${record.clickType === 'auto' ? '自动' : '手动'}</span>
                        </div>
                        <div class="oauth-history-detail">🌍 网站: ${record.website || '未知网站'}</div>
                        <div class="oauth-history-detail">👤 用户: ${record.user?.name || '未知'} ${record.user?.level ? `(${record.user.level}级)` : ''}</div>
                        <div class="oauth-history-detail">⚡ 操作: ${record.action || '未知操作'}</div>
                        <div class="oauth-history-time">⏰ ${Utils.formatDate(record.timestamp)}</div>
                    </div>
                `).join('');
            }
            return `
                <div class="oauth-section">
                    <div class="oauth-section-title">
                        <span>📋</span>
                        <span>最近记录</span>
                    </div>
                    ${historyHTML}
                    ${history.length > 0 ? `
                        <div style="text-align: center; margin-top: 12px;">
                            <button class="oauth-btn" id="viewAllHistory">📋 查看全部记录 (${this.storage.getHistory().length})</button>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        generateToolsHTML() {
            const dataSize = Utils.formatBytes(this.storage.calculateDataSize());
            const stats = this.storage.getStats();
            const installDays = stats.installDate ?
                  Math.floor((new Date() - new Date(stats.installDate)) / (1000 * 60 * 60 * 24)) : 0;
            return `
                <div class="oauth-section">
                    <div class="oauth-section-title">
                        <span>🛠️</span>
                        <span>工具箱</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <button class="oauth-btn primary" id="exportData">💾 导出数据</button>
                        <button class="oauth-btn" id="importData">📂 导入数据</button>
                        <input type="file" id="importFile" accept=".json" style="display: none;">
                    </div>
                    <div style="margin-bottom: 12px;">
                        <button class="oauth-btn" id="clearHistory">🗑️ 清空记录</button>
                        <button class="oauth-btn danger" id="resetSettings">⚠️ 重置设置</button>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <button class="oauth-btn" id="showHelp">❓ 显示帮助</button>
                        <button class="oauth-btn" id="aboutScript">ℹ️ 关于脚本</button>
                    </div>
                    <div style="text-align: center; font-size: 10px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted}; line-height: 1.4;">
                        📊 数据大小: ${dataSize}<br>
                        🎨 当前主题: ${CONFIG.uiThemes[this.currentUITheme].name}<br>
                        📅 使用天数: ${installDays}天
                    </div>
                </div>
            `;
        }
        bindEvents() {
            const trigger = this.ui.querySelector('#oauthTrigger');
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePanel();
            });
            this.bindContentEvents();
            document.addEventListener('click', (e) => {
                if (!this.ui.contains(e.target) && this.isVisible) {
                    if (this.settings.autoHidePanel) {
                        this.hidePanel();
                    }
                }
            });
        }
        bindContentEvents() {
            // UI主题选择事件
            const themeOptions = this.ui.querySelectorAll('.oauth-ui-theme-option');
            themeOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    const theme = e.currentTarget.dataset.theme;
                    this.changeUITheme(theme);
                });
            });
            // 开关事件
            const switches = this.ui.querySelectorAll('.oauth-switch');
            switches.forEach(switchEl => {
                switchEl.addEventListener('click', (e) => {
                    const setting = e.currentTarget.dataset.setting;
                    const isActive = e.currentTarget.classList.contains('active');
                    this.toggleSetting(setting, !isActive);
                });
            });
            // 下拉选择事件
            const themeSelect = this.ui.querySelector('#themeSelect');
            if (themeSelect) {
                themeSelect.addEventListener('change', (e) => {
                    this.updateSetting('theme', e.target.value);
                    this.applyTheme();
                });
            }
            const positionSelect = this.ui.querySelector('#positionSelect');
            if (positionSelect) {
                positionSelect.addEventListener('change', (e) => {
                    this.updateSetting('panelPosition', e.target.value);
                    this.updatePosition();
                });
            }
            // 按钮事件
            this.bindButtonEvents();
        }
        bindButtonEvents() {
            const buttons = {
                exportData: () => this.exportData(),
                importData: () => this.ui.querySelector('#importFile').click(),
                clearHistory: () => this.clearHistory(),
                resetSettings: () => this.resetSettings(),
                showHelp: () => this.showHelp(),
                aboutScript: () => this.showAbout(),
                toggleUITheme: () => this.toggleUITheme(),
                toggleTheme: () => this.toggleTheme(),
                viewAllHistory: () => this.showAllHistory(),
                // ❌ 已移除：刷新远程白名单按钮
                // refreshRemoteWhitelist: async () => {
                //     try {
                //         const list = await Utils.loadRemoteWhitelist(this.storage, this.settings);
                //         this.showMessage(`✅ 远程白名单已刷新（${list.length} 条）`);
                //     } catch (e) {
                //         this.showMessage('❌ 刷新失败，请稍后重试', 'error');
                //     }
                // },
                // ❌ 已移除：把当前网站加入本地白名单按钮
                // addCurrentSiteToWhitelist: () => {
                //     const pi = new PageInfo().get();
                //     const host = Utils.normalizeHost(pi.websiteUrl || pi.website);
                //     if (!host) return this.showMessage('未识别到当前网站', 'error');
                //     const wl = Array.isArray(this.settings.whitelist) ? this.settings.whitelist.slice() : [];
                //     if (wl.includes(host)) {
                //         return this.showMessage('已在本地白名单', 'warning');
                //     }
                //     wl.push(host);
                //     this.updateSetting('whitelist', wl);
                //     this.refreshUI();
                //     this.showMessage(`已加入本地白名单：${host}`);
                // }
            };
            // 统一绑定每个按钮 id -> handler
            Object.entries(buttons).forEach(([id, handler]) => {
                const btn = this.ui.querySelector(`#${id}`);
                if (btn) {
                    btn.addEventListener('click', handler);
                }
            });
            // 维持原有的“导入文件”监听
            const importFile = this.ui.querySelector('#importFile');
            if (importFile) {
                importFile.addEventListener('change', (e) => {
                    this.importData(e.target.files[0]);
                    e.target.value = '';
                });
            }
        }
        changeUITheme(themeKey) {
            this.currentUITheme = themeKey;
            this.updateSetting('uiTheme', themeKey);
            // 重新创建UI
            this.recreateUI();
            this.showMessage(`UI主题已切换为: ${CONFIG.uiThemes[themeKey].name}`);
        }
        toggleUITheme() {
            const themes = Object.keys(CONFIG.uiThemes);
            const currentIndex = themes.indexOf(this.currentUITheme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            this.changeUITheme(nextTheme);
        }
        recreateUI() {
            // 移除当前UI
            if (this.ui) {
                this.ui.remove();
            }
            // 重新创建UI
            setTimeout(() => {
                this.addStyles();
                this.createUI();
                this.bindEvents();
                this.applyTheme();
                this.applyUITheme();
            }, 100);
        }
        togglePanel() {
            this.isVisible = !this.isVisible;
            const trigger = this.ui.querySelector('#oauthTrigger');
            const panel = this.ui.querySelector('#oauthPanel');
            trigger.classList.toggle('active', this.isVisible);
            panel.classList.toggle('show', this.isVisible);
            if (this.isVisible) {
                this.refreshUI();
            }
        }
        hidePanel() {
            if (this.isVisible) {
                this.togglePanel();
            }
        }
        toggleSetting(key, value) {
            Utils.log(`切换设置: ${key} = ${value}`);
            this.updateSetting(key, value);
            const switchEl = this.ui.querySelector(`[data-setting="${key}"]`);
            if (switchEl) {
                switchEl.classList.toggle('active', value);
            }
            if (window.oauthHelper) {
                window.oauthHelper.updateSettings();
            }
            // 特殊处理 - 需要重新创建UI的设置
            if (['enablePageStyling', 'showChartStats', 'showHourlyChart', 'showWebsiteStats'].includes(key)) {
                this.recreateUI();
            }
            this.showMessage(`${this.getSettingLabel(key)} ${value ? '已开启' : '已关闭'}`);
        }
        updateSetting(key, value) {
            this.settings[key] = value;
            this.storage.updateSetting(key, value);
        }
        getSettingLabel(key) {
            const labels = {
                // autoClickApprove: '自动点击授权', // ❌ 已移除：自动点击相关标签
                saveLoginHistory: '保存登录记录',
                showNotifications: '显示通知',
                autoHidePanel: '自动隐藏面板',
                enablePageStyling: 'UI优化',
                enableDebugMode: '调试模式',
                showChartStats: '图表统计',
                showHourlyChart: '小时统计',
                showWebsiteStats: '网站统计'
                // restrictByWebsite: '网站白名单限制' // ❌ 已移除：白名单限制标签
            };
            return labels[key] || key;
        }
        applyTheme() {
            const theme = this.settings.theme;
            let actualTheme = theme;
            if (theme === 'auto') {
                actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            this.ui.classList.toggle('dark', actualTheme === 'dark');
            this.currentTheme = actualTheme;
        }
        applyUITheme() {
            // UI主题通过CSS样式和recreateUI应用
        }
        toggleTheme() {
            const themes = ['light', 'dark', 'auto'];
            const currentIndex = themes.indexOf(this.settings.theme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            this.updateSetting('theme', nextTheme);
            this.applyTheme();
            this.refreshUI();
            const themeNames = { light: '浅色', dark: '深色', auto: '自动' };
            this.showMessage(`主题已切换为: ${themeNames[nextTheme]}`);
        }
        updatePosition() {
            // 移除当前UI
            if (this.ui) {
                this.ui.remove();
            }
            // 重新创建UI
            setTimeout(() => {
                this.createUI();
                this.bindEvents();
                this.applyTheme();
            }, 100);
        }
        exportData() {
            const data = this.storage.exportAllData();
            const filename = `oauth-helper-backup-${new Date().toISOString().split('T')[0]}.json`;
            Utils.exportToJSON(data, filename);
            this.showMessage('📊 数据导出成功');
        }
        async importData(file) {
            if (!file) return;
            try {
                const data = await Utils.importFromJSON(file);
                if (confirm('确定要导入数据吗？这将覆盖当前设置和记录。')) {
                    if (this.storage.importAllData(data)) {
                        this.settings = this.storage.getSettings();
                        this.refreshUI();
                        this.showMessage('📂 数据导入成功，请刷新页面');
                    } else {
                        this.showMessage('❌ 数据导入失败');
                    }
                }
            } catch (error) {
                Utils.log('导入数据失败: ' + error.message, 'error');
                this.showMessage('❌ 数据格式错误，导入失败');
            }
        }
        clearHistory() {
            if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
                this.storage.clearHistory();
                this.refreshUI();
                this.showMessage('🗑️ 历史记录已清空');
            }
        }
        resetSettings() {
            if (confirm('确定要重置所有设置吗？此操作不可恢复。')) {
                this.storage.set('settings', CONFIG.defaultSettings);
                this.settings = CONFIG.defaultSettings;
                this.currentUITheme = 'minimal-white';
                this.recreateUI();
                this.showMessage('⚠️ 设置已重置为默认值');
            }
        }
        showHelp() {
            const helpContent = `
                <div style="max-width: 500px; line-height: 1.6;">
                    <h3 style="margin-bottom: 16px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.text};">🏆 OAuth助手使用指南</h3>
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.accent};">🎨 主题切换</h4>
                        <p>• <strong>简约白</strong>：极简清爽的白色设计</p>
                        <p>• <strong>紫色渐变</strong>：基于OAuth页面的紫色渐变</p>
                        <p>• <strong>彩虹华丽</strong>：炫酷多彩的动态效果</p>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.accent};">⚙️ 主要功能</h4>
                        <p>• <strong>历史记录</strong>：保存所有授权操作记录</p>
                        <p>• <strong>条形图统计</strong>：可视化显示使用数据</p>
                        <p>• <strong>数据导入导出</strong>：备份和恢复个人数据</p>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.accent};">📊 统计图表</h4>
                        <p>• <strong>7天趋势</strong>：显示最近一周的登录分布</p>
                        <p>• <strong>小时分布</strong>：显示今日24小时使用情况</p>
                        <p>• <strong>网站排行</strong>：显示最常授权的网站TOP5</p>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.accent};">🛠️ 使用技巧</h4>
                        <p>• 点击面板外部可快速关闭设置面板</p>
                        <p>• 启用"自动隐藏面板"提升使用体验</p>
                        <p>• 定期导出数据做备份，防止数据丢失</p>
                        <p>• 启用调试模式可查看详细运行日志</p>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="oauth-btn primary" onclick="this.parentElement.parentElement.parentElement.remove()">关闭帮助</button>
                    </div>
                </div>
            `;
            this.showModal('帮助信息', helpContent);
        }
        showAbout() {
            const stats = this.storage.getStats();
            const aboutContent = `
                <div style="max-width: 450px; text-align: center; line-height: 1.6;">
                    <div style="margin-bottom: 20px;">
                        <h2 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.text}; margin: 0;">🏆 OAuth助手</h2>
                        <p style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted}; margin: 8px 0;">专为LINUX DO OAuth设计的极简助手 (无自动点击)</p>
                    </div>
                    <div style="margin-bottom: 20px; padding: 16px; background: ${CONFIG.uiThemes[this.currentUITheme].colors.panelBg}; border-radius: 12px; border: 1px solid ${CONFIG.uiThemes[this.currentUITheme].colors.panelBorder};">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
                            <div><strong>版本</strong><br>${CONFIG.version}</div>
                            <div><strong>主题</strong><br>${CONFIG.uiThemes[this.currentUITheme].name}</div>
                            <div><strong>总使用</strong><br>${stats.totalLogins}次</div>
                            <div><strong>安装日期</strong><br>${stats.installDate ? new Date(stats.installDate).toLocaleDateString('zh-CN') : '未知'}</div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.accent};">✨ 特色功能</h4>
                        <p style="font-size: 13px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted};">
                            🎨 三种精美UI主题<br>
                            📊 多维度条形图统计<br>
                            📋 完整历史记录<br>
                            🛠️ 数据导入导出<br>
                            🔧 丰富自定义选项
                        </p>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.accent};">💡 设计理念</h4>
                        <p style="font-size: 13px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted};">
                            简洁而不简单，功能丰富而不臃肿<br>
                            所有功能均集成在设置面板中<br>
                            无快捷键设计，纯鼠标操作<br>
                            可视化统计，数据一目了然
                        </p>
                    </div>
                    <div style="margin-top: 20px;">
                        <button class="oauth-btn primary" onclick="window.open('${CONFIG.github}', '_blank')">🌟 GitHub</button>
                        <button class="oauth-btn" onclick="this.parentElement.parentElement.parentElement.remove()">关闭</button>
                    </div>
                </div>
            `;
            this.showModal('关于脚本', aboutContent);
        }
        showAllHistory() {
            const history = this.storage.getHistory();
            if (history.length === 0) {
                this.showMessage('📋 暂无历史记录');
                return;
            }
            const historyContent = `
                <div style="max-width: 600px; max-height: 500px; overflow-y: auto;">
                    <h3 style="margin-bottom: 16px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.text};">📋 全部历史记录 (${history.length}条)</h3>
                    <div style="margin-bottom: 16px;">
                        <button class="oauth-btn danger" onclick="if(confirm('确定清空所有记录？')) { window.oauthHelper.ui.clearHistory(); this.parentElement.parentElement.parentElement.remove(); }">🗑️ 清空记录</button>
                        <button class="oauth-btn" onclick="window.oauthHelper.ui.exportData()">💾 导出记录</button>
                    </div>
                    <div style="border: 1px solid ${CONFIG.uiThemes[this.currentUITheme].colors.panelBorder}; border-radius: 8px; overflow: hidden;">
                        ${history.map((record, index) => `
                            <div style="padding: 12px; border-bottom: 1px solid ${CONFIG.uiThemes[this.currentUITheme].colors.panelBorder}; ${index % 2 === 0 ? `background: ${CONFIG.uiThemes[this.currentUITheme].colors.panelBg};` : ''}">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                    <strong style="color: ${CONFIG.uiThemes[this.currentUITheme].colors.text};">${record.system || '未知系统'}</strong>
                                    <span class="oauth-history-badge ${record.clickType}" style="font-size: 10px; padding: 2px 6px; border-radius: 8px; font-weight: bold;">${record.clickType === 'auto' ? '自动' : '手动'}</span>
                                </div>
                                <div style="font-size: 12px; color: ${CONFIG.uiThemes[this.currentUITheme].colors.textMuted}; line-height: 1.4;">
                                    🌍 ${record.website || '未知网站'}<br>
                                    👤 ${record.user?.name || '未知'} ${record.user?.level ? `(${record.user.level}级)` : ''}<br>
                                    ⚡ ${record.action || '未知操作'}<br>
                                    ⏰ ${Utils.formatDate(record.timestamp)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="text-align: center; margin-top: 16px;">
                        <button class="oauth-btn primary" onclick="this.parentElement.parentElement.remove()">关闭</button>
                    </div>
                </div>
            `;
            this.showModal('历史记录', historyContent);
        }
        showModal(title, content) {
            // 移除已存在的模态框
            const existingModal = document.querySelector('.oauth-modal');
            if (existingModal) {
                existingModal.remove();
            }
            const modal = document.createElement('div');
            modal.className = 'oauth-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                backdrop-filter: blur(5px);
            `;
            modal.innerHTML = `
                <div style="
                    background: ${CONFIG.uiThemes[this.currentUITheme].colors.panelBg};
                    border: 2px solid ${CONFIG.uiThemes[this.currentUITheme].colors.panelBorder};
                    border-radius: 16px;
                    padding: 24px;
                    margin: 20px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    backdrop-filter: blur(10px);
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow-y: auto;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                ">
                    ${content}
                </div>
            `;
            // 点击背景关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            document.body.appendChild(modal);
        }
        showMessage(message, type = 'info', duration = 3000) {
            const messageEl = document.createElement('div');
            messageEl.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: ${type === 'error' ? '#fee2e2' : type === 'warning' ? '#fef3c7' : '#dcfce7'};
                color: ${type === 'error' ? '#dc2626' : type === 'warning' ? '#d97706' : '#16a34a'};
                padding: 12px 16px;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 99999;
                font-size: 14px;
                font-weight: 600;
                border: 1px solid ${type === 'error' ? '#fecaca' : type === 'warning' ? '#fed7aa' : '#bbf7d0'};
                backdrop-filter: blur(5px);
                animation: slideIn 0.3s ease-out;
            `;
            messageEl.textContent = message;
            document.body.appendChild(messageEl);
            setTimeout(() => {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateX(100%)';
                setTimeout(() => messageEl.remove(), 300);
            }, duration);
        }
        refreshUI() {
            if (this.isVisible) {
                const content = this.ui.querySelector('.oauth-content');
                if (content) {
                    content.innerHTML = this.generateContent();
                    this.bindContentEvents();
                }
            }
        }
        updateSettings(newSettings) {
            this.settings = { ...this.settings, ...newSettings };
            this.refreshUI();
        }
    }
    // ================== 主入口 ==================
    class OAuthHelper {
        constructor() {
            this.storage = new Storage();
            this.settings = this.storage.getSettings();
            this.ui = null;
            this.clickTracker = null;
            // this.autoClickManager = null; // ❌ 已移除：自动点击管理器实例
            this.sessionStartTime = Date.now();
            Utils.log('OAuth助手初始化中...');
            this.init();
        }
        init() {
            // 更新会话统计
            this.storage.updateStats('sessionsCount');
            // 初始化UI
            this.ui = new UIManager(this.storage);
            // 初始化点击跟踪
            this.clickTracker = new ClickTracker(this.storage, this.settings);
            // ❌ 已移除：初始化自动点击（如果启用）
            // if (this.settings.autoClickApprove) {
            //     this.autoClickManager = new AutoClickManager(this.storage, this.settings);
            // }
            // 绑定页面卸载事件
            this.bindUnloadEvents();
            Utils.log('OAuth助手初始化完成');
            // 显示欢迎消息（仅第一次安装）
            this.showWelcomeMessage();
        }
        showWelcomeMessage() {
            const stats = this.storage.getStats();
            const isFirstRun = stats.totalLogins === 0 && stats.sessionsCount <= 1;
            if (isFirstRun) {
                setTimeout(() => {
                    this.ui.showMessage('🎉 欢迎使用OAuth助手！点击右上角图标开始使用', 'info', 5000);
                }, 1000);
            }
        }
        updateSettings() {
            this.settings = this.storage.getSettings();
            // 更新各个组件的设置
            if (this.clickTracker) {
                this.clickTracker.updateSettings(this.settings);
            }
            // ❌ 已移除：更新自动点击管理器设置
            // if (this.autoClickManager) {
            //     this.autoClickManager.updateSettings(this.settings);
            // }
            // ❌ 已移除：如果自动点击设置变化，重新初始化
            // if (this.settings.autoClickApprove && !this.autoClickManager) {
            //     this.autoClickManager = new AutoClickManager(this.storage, this.settings);
            // } else if (!this.settings.autoClickApprove && this.autoClickManager) {
            //     this.autoClickManager = null;
            // }
            if (this.ui) {
                this.ui.updateSettings(this.settings);
            }
            Utils.log('设置已更新');
        }
        bindUnloadEvents() {
            // 页面卸载时记录使用时间
            window.addEventListener('beforeunload', () => {
                const usageTime = Date.now() - this.sessionStartTime;
                this.storage.updateStats('totalUsageTime', Math.floor(usageTime / 1000));
            });
            // 页面可见性变化时的处理
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    // 页面隐藏时
                    const usageTime = Date.now() - this.sessionStartTime;
                    this.storage.updateStats('totalUsageTime', Math.floor(usageTime / 1000));
                } else {
                    // 页面显示时
                    this.sessionStartTime = Date.now();
                }
            });
        }
    }
    // ================== 启动脚本 ==================
    function startScript() {
        Utils.log('开始启动OAuth助手...');
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.oauthHelper = new OAuthHelper();
            });
        } else {
            window.oauthHelper = new OAuthHelper();
        }
    }
    // 立即启动
    startScript();
    // 注册GM菜单命令
    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('🏆 打开OAuth助手', () => {
            if (window.oauthHelper && window.oauthHelper.ui) {
                window.oauthHelper.ui.togglePanel();
            }
        });
        GM_registerMenuCommand('📊 导出数据', () => {
            if (window.oauthHelper && window.oauthHelper.ui) {
                window.oauthHelper.ui.exportData();
            }
        });
        GM_registerMenuCommand('🎨 切换主题', () => {
            if (window.oauthHelper && window.oauthHelper.ui) {
                window.oauthHelper.ui.toggleUITheme();
            }
        });
        GM_registerMenuCommand('❓ 显示帮助', () => {
            if (window.oauthHelper && window.oauthHelper.ui) {
                window.oauthHelper.ui.showHelp();
            }
        });
        GM_registerMenuCommand('ℹ️ 关于脚本', () => {
            if (window.oauthHelper && window.oauthHelper.ui) {
                window.oauthHelper.ui.showAbout();
            }
        });
    }
})();
