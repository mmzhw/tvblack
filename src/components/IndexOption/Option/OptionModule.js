import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Switch, Input, Select, Button, Popconfirm } from 'antd';
import styles from './index.module.css';
import { ASSEMBLY_NUM, MESSAGE } from '../../../constants';

class OptionModule extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if (this.props.saveModuleData) {
                    values.isEnable = values.isEnable ? 1 : 0;
                    values.layoutId = Number(values.layoutId);
                    values.number = Number(values.number);
                    const result = await this.props.saveModuleData(values);
                    if (result) {
                        this.props.form.resetFields();
                    }
                }
            }
        });
    }

    render() {
        let formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        let tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 2,
            }
        };

        let { getFieldDecorator } = this.props.form;
        let { cards, currentCardsIndex } = this.props;
        let card = cards[currentCardsIndex] ? cards[currentCardsIndex] : {};

        let numLimit = [];
        if (card.layoutId === 1) {
            numLimit = ASSEMBLY_NUM.VERTICAL;
        } else if (card.layoutId === 2) {
            numLimit = ASSEMBLY_NUM.TRANSVERSE;
        } else {
            numLimit = ASSEMBLY_NUM.BANNER;
        }

        return (
            <div className={styles.configModule}>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item
                        {...formItemLayout}
                        label='功能'
                    >
                        <span className='ant-form-text'>模块配置</span>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='标题'>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题名称' }],
                            initialValue: card.title || ''
                        })(
                            <Input maxLength='20'/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label='状态'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isEnable', {
                            valuePropName: 'checked',
                            initialValue: Boolean(card.isEnable),
                        })(
                            <Switch />
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='模板类型'
                    >
                        {getFieldDecorator('layoutId', {
                            rules: [{ required: true, message: '请选择模板类型' }],
                            initialValue: card.layoutId ? String(card.layoutId) : '0'
                        })(
                            <Select

                                onChange={this.props.changeModule}>
                                <Select.Option value='0'>banner</Select.Option>
                                <Select.Option value='1'>竖图</Select.Option>
                                <Select.Option value='2'>横图</Select.Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='视频个数'
                    >
                        {getFieldDecorator('number', {
                            initialValue: card.number ? String(card.number) : '0'
                        })(
                            <Select
                                onChange={this.props.changeNum}>
                                {
                                    numLimit && numLimit.map((item, index) => {
                                        return (<Select.Option key={index} value={index}>{index}</Select.Option>);
                                    })
                                }
                            </Select>
                        )}

                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='链接'>
                        {getFieldDecorator('url', {
                            initialValue: card.url
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button key='submit' type='primary' htmlType='submit' style={{ marginRight: '20px' }}>保存</Button>
                        <Popconfirm title={MESSAGE.DELETE_SURE} onConfirm={() => this.props.deleteModuleData()}> <Button type='primary'>删除</Button></Popconfirm>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default connect()(Form.create()(OptionModule));
