import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Pagination, Button } from 'antd';
import { ArticleAPI } from '@services/index';

import styles from './index.scss';

function Home({ history }: RouteComponentProps) {
    const getList = async () => {
        try {
            const res = await ArticleAPI.getArticleList();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className={styles.home}>Home Page</div>
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
            <Button onClick={getList}>get article list</Button>
        </div>
    );
}

export default Home;
