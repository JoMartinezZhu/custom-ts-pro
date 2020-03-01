import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import ShowCount from '@components/ShowCount';
import CountOperation from '@components/CountOperation';
import { ArticleAPI } from '@services/index';

import styles from './index.scss';
// { history }: RouteComponentProps
function Home() {
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
            <ShowCount />
            <CountOperation />
            <Button onClick={getList}>get article list</Button>
        </div>
    );
}

export default Home;
