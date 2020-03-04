import React from 'react';
import { router as DvaRouter } from 'dva';
import { IRoute } from '../types';

const { Redirect } = DvaRouter;

interface IOpts {
    routes: IRoute[];
    extraProps?: object;
}

interface IGetRouteElementOpts {
    route: IRoute;
    index: number;
    opts: IOpts;
}

function wrapWrapper(Component: any, Wrapper: any) {
    return function(props: object) {
        return (
            <Wrapper {...props}>
                <Component {...props} />
            </Wrapper>
        );
    };
}

function renderRoutes(opts: IOpts) {
    return opts.routes ? (
        <DvaRouter.Switch>
            {opts.routes.map((route, index) =>
                getRouteElement({
                    route,
                    index,
                    opts
                })
            )}
        </DvaRouter.Switch>
    ) : null;
}

function getRouteElement({ route, index, opts }: IGetRouteElementOpts) {
    const routeProps = {
        key: route.key || index,
        exact: route.exact,
        strict: route.strict,
        sensitive: route.sensitive,
        path: route.path
    };
    if (route.redirect) {
        return <Redirect {...routeProps} from={route.path} to={route.redirect} />;
    } else {
        return (
            <DvaRouter.Route
                {...routeProps}
                render={(props: object) => {
                    return render({ route, opts, props });
                }}
            />
        );
    }
}

function render({ route, opts, props }: { route: IRoute; opts: IOpts; props: object }) {
    const routes = renderRoutes({
        ...opts,
        routes: route.routes || []
    });

    let { component: Component } = route;
    const { wrappers } = route;
    if (Component) {
        // route.wrappers
        if (wrappers) {
            let len = wrappers.length - 1;
            while (len >= 0) {
                Component = wrapWrapper(Component, wrappers[len]);
                len -= 1;
            }
        }

        const newProps = {
            ...props,
            ...opts.extraProps,
            route
        };
        return <Component {...newProps}>{routes}</Component>;
    } else {
        return routes;
    }
}

export default renderRoutes;
