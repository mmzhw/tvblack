import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import Layout from './models/layout';
import Login from './models/Login';
import VideoManage from './models/VideoManage';
import storage from './utils/storage';

import './index.css';

const history = createHistory();
let middleware = [routerMiddleware(history), ReduxThunk];

const routes = [
    {
        path: '/app',
        exact: true,
        component: VideoManage,
        breadcrumbName: '视频管理'
    },
];
const RouteConfig = () => (
    <Router>
        <Switch>
            <Route exact path='/login' component={Login}/>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(match) => {
                        const accessToken = storage.get('user') && storage.get('user').accessToken;
                        if (!accessToken) {
                            return (
                                <Redirect to={{
                                    pathname: '/login',
                                    state: { from: match.location }
                                }}/>
                            );
                        } else {
                            return (
                                <Layout routes={routes} match={match} content={route.component}
                                        selectedMenu={route.activeMenu && route.activeMenu(match)}/>
                            );
                        }
                    }}
                />
            ))}
        </Switch>
    </Router>
);
const mapStateToProps = state => {
    const { userInfo } = state;
    const {
        isAuthenticated
    } = {
        isAuthenticated: false
    };
    return {
        userInfo,
        isAuthenticated
    };
};
const App = connect(mapStateToProps)(RouteConfig);
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(...middleware)
);
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
