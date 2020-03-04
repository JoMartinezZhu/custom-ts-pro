import React from 'react';
import { router as DvaRouter } from 'dva';
const { Route, Switch } = DvaRouter;
import { RouteConfig } from 'react-router-config';

function renderRoutes(routes: RouteConfig[] | undefined, extraProps = {}, switchProps = {}) {
    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={props =>
                        route.render ? (
                            route.render({ ...props, ...extraProps, route: route })
                        ) : (
                            <route.component {...props} {...extraProps} route={route} />
                        )
                    }
                />
            ))}
        </Switch>
    ) : null;
}

export default renderRoutes;
