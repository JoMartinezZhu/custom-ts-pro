import { reloadAuthorized } from './Authorized';

export function getAuthority(str?: string): string | string[] {
    const authorityString = typeof str === 'undefined' ? localStorage.getItem(process.env.REACT_APP) : str;

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
    const proAuthority: string[] = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem(process.env.REACT_APP, JSON.stringify(proAuthority));
    reloadAuthorized();
}
