declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

declare interface Context<T, P> {
    state: T;
    dispatch: P;
}

interface Window {
    reloadAuthorized: () => void;
}

declare const REACT_APP_ENV: 'dev' | 'dev' | 'pre' | false;

declare module 'dva-loading';
declare module 'storage';
