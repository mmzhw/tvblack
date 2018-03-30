import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { toLogin } from '../../action/index';
import styles from './index.module.css';
import md5 from 'md5';

class Login extends Component {
    handleSubmit(e) {
        e.preventDefault();
        let { history, dispatch } = this.props;
        let from = '/app';
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                let loginData = {
                    userName: values.userName,
                    passWord: md5(values.passWord)
                };
                dispatch(toLogin(loginData, history, from));
            }
        });
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        return (
            <div className={styles.loginWrapper}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={require('../../assets/logo.png')}/>
                    <span>CERNARIUS</span>
                </div>
                <form className={styles.formWrapper} onSubmit={this.handleSubmit.bind(this)}>

                    <Form.Item
                        {...formItemLayout}
                        label='账号:'>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '输入帐号' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label='密码:'>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: '输入密码' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button key='submit' type='primary' htmlType='submit'>登陆</Button>
                    </Form.Item>
                </form>
            </div>
        );
    }
}

export default connect()(Form.create()(Login));
