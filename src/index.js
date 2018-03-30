import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import asyncComponent from './components/AsyncComponent';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
        path: PATH.APP,
        exact: true,
        component: VideoList,
    }
];

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={ (props) => {
            // pass the sub-routes down to keep nesting
            let { isAuthenticated } = store.getState().login;
            if (isAuthenticated) {
                return (<route.component {...props} routes={route.routes} />);
            }
            return (<Redirect to={PATH.ROOT}/>);
        }}
    />
);

// start 状态树应用到全局 通过Provider
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path={PATH.ROOT} exact={true} component={Login}/>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();

