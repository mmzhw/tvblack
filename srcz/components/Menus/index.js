import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {
    Link,
} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const allKeys = ['sub1', 'sub-video', 'App', 'sub-live', 'channel', 'ott', 'tv-live'];

class YXMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            currentPage: 1,
            pageSize: 20,
            openKeys: allKeys
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            mode: nextProps.mode ? 'vertical' : 'inline',
            openKeys: nextProps.mode ? [] : allKeys
        });
    }

    render() {
        return (
            <Menu mode={this.state.mode} openKeys={this.state.openKeys}>
                <SubMenu
                    key='channel'
                    title={<span><Icon type='bars' /><span className='nav-text'>频道管理</span></span>}
                >
                    <Menu.Item key='channel-list'><Link to='/'>APP频道配置</Link></Menu.Item>
                    <Menu.Item key='channel-town'><Link to='/'>新城镇频道配置</Link></Menu.Item>
                    <Menu.Item key='channel-app-pc'><Link to='/'>PC频道配置</Link></Menu.Item>
                </SubMenu>

            </Menu>
        );
    }
}

export default YXMenu;
