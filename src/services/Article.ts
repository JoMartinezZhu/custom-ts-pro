import http from './http';

export const getArticleList = (data = { pageNo: 1 }) => {
    return http.get('/bd/org/list', data);
};
