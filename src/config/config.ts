import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default {
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor
    },
    proxy: proxy[REACT_APP_ENV || 'dev']
} as any;
