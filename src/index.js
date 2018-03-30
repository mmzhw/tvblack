import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import asyncComponent from './components/AsyncComponent';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux 和react-redux（关联react和redux）
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// reducers 状态树state和逻辑操作
import root from './reducers';

import './index.css';
import { PATH } from './constants';

const Login = asyncComponent(() => import('./components/Login'));
const VideoList = asyncComponent(() => import('./components/VideoList'));

// 生成状态树对象
const store = createStore(
    root,
    applyMiddleware(thunk)
);

const routes = [
    {
        path: PATH.ROOT,
        exact: true,
        component: Login
    },
    {
        path: PATH.APP,
        exact: true,
        component: VideoList,
    }
];

const requireAuth = (nextState, replaceState) => {
    console.log('nextState:', nextState);
    console.log('replaceState:', replaceState);
    console.log('store:', store);
    console.log('this:', this);
};

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        onEnter={requireAuth}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

// start 状态树应用到全局 通过Provider
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();

