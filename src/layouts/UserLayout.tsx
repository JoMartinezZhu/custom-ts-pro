import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import React from 'react';
import { connect, router as DvaRouter } from 'dva';
import { ConnectProps, IConnectState } from '@models/connect';
import styles from './UserLayout.module.less';

export interface UserLayoutProps extends ConnectProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
    const {
        route = {
            routes: []
        }
    } = props;
    const { routes = [] } = route;
    const {
        children,
        location = {
            pathname: ''
        }
    } = props;

    const { breadcrumb } = getMenuData(routes);
    const title = getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        ...props
    });
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <DvaRouter.Link to="/">
                                <img
                                    alt="logo"
                                    className={styles.logo}
                                    src="https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg"
                                />
                                <span className={styles.title}>Ant Design</span>
                            </DvaRouter.Link>
                        </div>
                        <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                    </div>
                    {children}
                </div>
                <DefaultFooter />
            </div>
        </>
    );
};

export default connect(({ settings }: IConnectState) => ({ ...settings }))(UserLayout);
