import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import ShowCount from '@components/ShowCount';
import CountOperation from '@components/CountOperation';
import { ArticleAPI } from '@services/index';

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
      <div>Home Page</div>
      <ShowCount />
      <CountOperation />
      <Button onClick={getList}>get article list</Button>
    </div>
  );
}

export default Home;
