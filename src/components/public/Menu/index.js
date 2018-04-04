import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { MENU_ITEMS, PATH } from '../../../constants/Link';
import { NAME } from '../../../constants';
const { Sider } = Layout;

class MenuLeft extends Component {
    state = {
        collapsed: false,
    };

    // 收缩侧边栏
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                className={styles.wrapper}
            >
                <div className={styles.logo}>
                    <Link to={PATH.ROOT}>
                        <img src={require('../../../assets/logo.png')} alt='logo' />
                        <span style={{ display: this.state.collapsed ? 'none' : 'inline-block' }}>{NAME.PROJECT_NAME}</span>
                    </Link>
                </div>
                <Menu theme='dark' defaultSelectedKeys={[this.props.optionKey]} mode='vertical'>
                    {
                        MENU_ITEMS.map((item) => {
                            return (
                                <Menu.Item key={item.key}>
                                    <Link to={item.url}>
                                        <Icon type={item.iconType} />
                                        <span>{item.name}</span>
                                    </Link>
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            </Sider>
        );
    }
}

export default connect()(MenuLeft);
