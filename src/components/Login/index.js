import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { toLogin } from '../../action/index';
import styles from './index.module.css';
import md5 from 'md5';
import { PATH } from '../../constants/Link';
import { NAME } from '../../constants';

class Login extends Component {
    // 处理登陆请求
    handleSubmit(e) {
        e.preventDefault();
        let { history, dispatch } = this.props;
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                let loginData = {
                    userName: values.userName,
                    passWord: md5(values.passWord)
                };
                dispatch(toLogin(loginData, history, PATH.VIDEOS));
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
                    <span>{NAME.PROJECT_NAME}</span>
                </div>
                <form className={styles.formWrapper} onSubmit={this.handleSubmit.bind(this)}>

                    <Form.Item
                        {...formItemLayout}
                        label={NAME.USER_NAME}>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: NAME.USER_NAME_MSG }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={NAME.PASS_CODE}>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: NAME.PASS_CODE_MSG }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button key='submit' type='primary' htmlType='submit'>{NAME.LOG_IN}</Button>
                    </Form.Item>
                </form>
            </div>
        );
    }
}

export default connect()(Form.create()(Login));
