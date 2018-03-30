import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import asyncComponent from './components/AsyncComponent';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux 和react-redux（关联react和redux）
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// reducers 状态树state和逻辑操作
import rootRedux from './reducers';

import './index.css';

const Login = asyncComponent(() => import('./models/Login'));

const routes = [
    {
        path: '/',
        component: Login
    },
    // {
    //     path: "/tacos",
    //     component: Tacos,
    //     routes: [
    //         {
    //             path: "/tacos/bus",
    //             component: Bus
    //         },
    //         {
    //             path: "/tacos/cart",
    //             component: Cart
    //         }
    //     ]
    // }
];

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes}/>
        )}
    />
);

// 生成状态树对象
const store = createStore(rootRedux);

// start 状态树应用到全局 通过Provider
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                {
                    routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
                }
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();

