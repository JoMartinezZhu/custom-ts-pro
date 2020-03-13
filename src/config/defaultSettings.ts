import { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
    /**
     * theme for nav menu
     */
    navTheme: MenuTheme;
    /**
     * primary color of ant design
     */
    primaryColor: string;
    /**
     * nav menu position: `sidemenu` or `topmenu`
     */
    layout: 'sidemenu' | 'topmenu';
    /**
     * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
     */
    contentWidth: ContentWidth;
    /**
     * sticky header
     */
    fixedHeader: boolean;
    /**
     * auto hide header
     */
    autoHideHeader: boolean;
    /**
     * sticky siderbar
     */
    fixSiderbar: boolean;
    menu: { locale: boolean };
    title: string;
    pwa: boolean;
    iconfontUrl: string;
    colorWeak: boolean;
}

export default {
    navTheme: 'dark',
    // 拂晓蓝
    primaryColor: '#1890ff',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    autoHideHeader: false,
    fixSiderbar: false,
    colorWeak: false,
    menu: {
        locale: true
    },
    title: 'Ant Design Pro',
    pwa: false,
    iconfontUrl: ''
} as DefaultSettings;
