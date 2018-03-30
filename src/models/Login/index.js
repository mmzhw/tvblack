import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { Form, Input, Button, Row } from 'antd';
import { toLogin } from '../../action';
import styles from './index.module.css';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswdChange = this.handlePasswdChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            userName: event.target.value
        });
    }

    handlePasswdChange(event) {
        this.setState({
            passWord: event.target.value
        });
    }

    handleLogin() {
        const { history, dispatch } = this.props;
        const loginData = {
            userName: this.state.userName,
            passWord: md5(this.state.passWord)
        };
        const from = this.props.location.state ? this.props.location.state.from.pathname : '/';
        dispatch(toLogin(loginData, history, from));
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={require('../../assets/logo.png')}/>
                    <span>CERNARIUS</span>
                </div>
                <form className={styles.formWrapper}>
                    <FormItem hasFeedback>
                        <Input size='large' value={this.state.userName} onPressEnter={this.handleLogin}
                            placeholder='输入帐号' onChange={this.handleNameChange}/>
                    </FormItem>
                    <FormItem hasFeedback>
                        <Input size='large' value={this.state.passWord} type='password' onPressEnter={this.handleLogin}
                            placeholder='输入密码' onChange={this.handlePasswdChange}/>
                    </FormItem>
                    <Row>
                        <Button type='primary' size='large' onClick={this.handleLogin}>登录</Button>
                    </Row>
                </form>
            </div>
        );
    }
}

export default connect()(Login);
