import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, AutoComplete, Icon, message, Select } from 'antd';
import styles from './index.module.css';
import ImgUpload from '../../public/ImgUpload';
import yxFetch from '../../../utils/fetch';
import { REQ_URL, PARAMETER_CATE } from '../../../constants';

class OptionVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            video: {},
            channels: [],
            category: [],
        };
        this.videoId = '';
    }

    componentDidMount() {
        let { cards, currentCardsIndex, currentVideoIndex } = this.props;
        let card = cards[currentCardsIndex] ? cards[currentCardsIndex] : {};
        let videos = card.videos ? card.videos : [];
        let video = videos[currentVideoIndex] ? videos[currentVideoIndex] : {};

        this.getCategory();
        this.getChannels();

        this.setState({
            imageUrl: video.imageUrl,
            video: video,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cards !== this.props.cards || nextProps.currentCardsIndex !== this.props.currentCardsIndex || nextProps.currentVideoIndex !== this.props.currentVideoIndex) {
            let { cards, currentCardsIndex, currentVideoIndex } = nextProps;
            let card = cards[currentCardsIndex] ? cards[currentCardsIndex] : {};
            let videos = card.videos ? card.videos : [];
            let video = videos[currentVideoIndex] ? videos[currentVideoIndex] : {};
            this.setState({
                imageUrl: video.imageUrl,
                video: video,
            });
        }
    }

    // 获取分类：电视剧之类
    async getChannels () {
        let res = await yxFetch(REQ_URL.GET_CHANNELS, { });
        if (res.code === 0) {
            this.setState({
                channels: res.data
            });
        } else {
            console.log('获取频道名称失败');
        }
    };

    // 获取标签：年代之类
    async getCategory () {
        let res = await yxFetch(REQ_URL.GET_CATEGORY, { });
        console.log(res);
        if (res.code === 0) {
            this.setState({
                category: res.data
            });
        } else {
            console.log('获取类别失败');
        }
    };

    // 实时根据输入搜索
    async handleInput(value) {
        value = value.trim();
        if (!value) {
            this.setState({
                sources: [],
                sourcesAutoComplete: [],
            });
            return;
        }

        let sources = [];
        let res = await yxFetch(REQ_URL.SEARCH_VIDEO_LISTS, {
            name: value,
            pageIndex: 1,
            pageSize: 10,
        });
        if (res.code === 0) {
            sources = res.data.data;
        } else {
            message.error('搜索错误');
        }

        let sourcesAutoComplete = '';
        if (sources && sources.length > 0) {
            sourcesAutoComplete = sources.map((source) => {
                return source.name;
            });
        }

        this.setState({
            sources: sources,
            sourcesAutoComplete: sourcesAutoComplete,
        });
    }

    // 处理选择的视频数据
    handleSelect(value) {
        let card = this.state.sources.filter((source) => {
            return source.name === value;
        });

        if (!card[0]) {
            return;
        }

        this.videoId = card[0].episodeId;
        this.props.form.setFieldsValue({
            title: card[0].name,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if (this.props.saveVideoData) {
                    values.imageUrl = this.state.imageUrl;
                    values.catagory = values.catagory.join(',');
                    values.year = values.year.join(',');
                    values.area = values.area.join(',');
                    values.videoId = this.videoId;
                    const result = await this.props.saveVideoData(values);
                    if (result) {
                        this.props.form.resetFields();
                    }
                }
            }
        });
    }

    uploadDone(imageUrl) {
        this.setState({
            imageUrl: imageUrl
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

        let { video } = this.state;

        return (
            <div className={styles.configVideo}>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item
                        {...formItemLayout}
                        label='功能'
                    >
                        <span className='ant-form-text'>视频配置</span>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='搜索'>

                        {getFieldDecorator('searchKey', {
                            initialValue: ''
                        })(
                            <AutoComplete
                                dataSource={this.state.sourcesAutoComplete}
                                placeholder='搜索视频'
                                onChange={this.handleInput.bind(this)}
                                onSelect={this.handleSelect.bind(this)}
                            >
                                <Input suffix={<Icon type='search' />}/>
                            </AutoComplete>
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='名称'>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入视频名称' }],
                            initialValue: video.title || ''
                        })(
                            <Input maxLength='20'/>
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label='频道'>
                        {getFieldDecorator('channelId', {
                            rules: [{ required: true, message: '请选择频道！' }],
                            initialValue: video.channelId ? video.channelId : ''
                        })(
                            <Select>
                                {this.state.channels.map((item, index) => (
                                    <Select.Option value={ item.channelId} key={index}>
                                        { item.channelName }
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    {
                        this.state.category.map((item, itemIndex) => {
                            return (
                                <Form.Item {...formItemLayout} label={item.cateName} key={itemIndex}>
                                    {getFieldDecorator(PARAMETER_CATE[item.cateId], {
                                        rules: [{ required: true, message: '请选择！' }],
                                        initialValue: video[PARAMETER_CATE[item.cateId]] ? video[PARAMETER_CATE[item.cateId]].split(',') : []
                                    })(
                                        <Select
                                            mode='tags'
                                            tokenSeparators={[',']}
                                        >
                                            {item.childs.map((child, childIndex) => (
                                                <Select.Option value={ child.cateId} key={childIndex}>
                                                    { child.cateName }
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            );
                        })
                    }

                    <Form.Item
                        {...formItemLayout}
                        label='封面图'
                    >
                        <ImgUpload
                            imageUrl={this.state.imageUrl}
                            width={250}
                            uploadDone={this.uploadDone.bind(this)}
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button key='submit' type='primary' htmlType='submit' style={{ marginRight: '20px' }}>保存</Button>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default connect()(Form.create()(OptionVideo));
