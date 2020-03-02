import { reloadAuthorized } from './Authorized';

export function getAuthority(str?: string): string | string[] {
    const authorityString =
        typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;

    let authority;
    try {
        if (authorityString) {
            authority = JSON.parse(authorityString);
        }
    } catch (e) {
        authority = authorityString;
    }
    if (typeof authority === 'string') {
        return [authority];
    }
    return authority;
}

export function setAuthority(authority: string | string[]): void {
    const proAuthority = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
    // auto reload
    reloadAuthorized();
}