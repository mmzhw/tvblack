import React, { Component } from 'react';
import { Layout, Icon, Alert } from 'antd';
import {
    Link,
    Route
} from 'react-router-dom';
import YXBreadcrunb from '../components/Breadcrumb';
import YXMenu from '../components/Menus';
import style from './style.css';

const { Content, Sider } = Layout;

class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let MainContent = this.props.content;
        return (
            <Layout className={style.layout}>
                <Sider className={style.sidebar}
                       trigger={null}
                       collapsible
                       collapsed={this.state.collapsed}>
                    <div className={style.logo}>
                        <Link className={style['to-home']} to='/'>
                            <img src={require('../assets/logo.png')} alt='logo'/>
                            <span>Cernarius</span>
                        </Link>
                    </div>
                    <div className={style.menu}>
                        <YXMenu selectedMenu={this.props.selectedMenu} mode={this.state.collapsed}/>
                    </div>
                </Sider>
                <Layout className={this.state.collapsed ? style['main-content-collapsed'] : style['main-content']}>
                    {( /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) )
                        ? '' : <Alert message='请使用google chrome浏览器使用系统' banner closable/>}
                    <div className={style['header']}>
                        <div className={style['header-button']} onClick={this.toggle}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                        </div>
                    </div>
                    <div style={{ padding: '0 24px 24px' }}>
                        <Route render={({ location, match }) => {
                            return ( <YXBreadcrunb location={location} match={match} routes={this.props.routes}/> );
                        }}/>
                        <Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: '#FFF' }}>
                            <MainContent {...this.props}/>
                        </Content>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;

