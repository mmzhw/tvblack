import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './LayoutWrapper.module.css';
import { Layout, Breadcrumb, Icon, Dropdown, Menu } from 'antd';
import asyncComponent from '../AsyncComponent';
import storage from '../../utils/storage';
import { NAME, STORAGE_NAME } from '../../constants';
import { toLogout } from '../../action';
import { MENU_ITEMS } from '../../constants/Link';
import { checkIsMobile } from '../../utils/tools';

const MenuLeft = asyncComponent(() => import('./Menu'));
const { Header, Content, Footer } = Layout;

class LayoutWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: storage.get(STORAGE_NAME.USER_NAME) || '',
        };
    }

    // 登出
    logout() {
        let { history } = this.props;
        this.props.dispatch(toLogout(history, storage.get(STORAGE_NAME.USER_NAME), storage.get(STORAGE_NAME.ACCESS_TOKEN)));
    }

    render() {
        let breadcrumbs = this.props.match.url.split('/'); // 根据路径中/分割成数组做面包屑
        breadcrumbs.splice(0, 1);

        let menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.logout.bind(this)}>{NAME.LOG_OUT}</a>
                </Menu.Item>
            </Menu>
        );

        console.log(checkIsMobile());

        return (
            <Layout className={styles.wrapper}>
                <MenuLeft optionKey={breadcrumbs[0]} />
                <Layout>
                    <Header className={styles.header} >
                        {/* <Dropdown overlay={menu}>
                            <a className={styles.user}>
                                <Icon type='user' />
                                <span className={styles.userName}>{this.state.userName}</span>
                            </a>
                        </Dropdown>*/}
                    </Header>
                    <Content className={styles.content}>
                        <Breadcrumb className={styles.breadcrumbWrapper}>
                            {
                                breadcrumbs.map((item, index) => {
                                    let title = item;
                                    MENU_ITEMS.forEach((element) => {
                                        if (element.key === item) {
                                            title = element.name;
                                        }
                                    });
                                    return (
                                        <Breadcrumb.Item key={index}>{title}</Breadcrumb.Item>
                                    );
                                })
                            }
                        </Breadcrumb>
                        <div className={styles.pageContent}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer className={styles.footer}>{NAME.COPY_RIGHT}</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect()(LayoutWrapper);
