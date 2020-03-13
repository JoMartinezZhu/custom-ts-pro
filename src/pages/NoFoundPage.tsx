import { Button, Result } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'dva/router';

const NoFoundPage: React.FC<RouteComponentProps> = props => (
    <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的地址不存在."
        extra={
            <Button
                type="primary"
                onClick={() => {
                    props.history.push('/');
                }}
            >
                首页
            </Button>
        }
    />
);

export default NoFoundPage;
