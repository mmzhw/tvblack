import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, message, Avatar, Icon, Modal } from 'antd';
import yxFetch from '../../utils/fetch';
import { MESSAGE, NAME, REQ_URL, WIDTH_DATA } from '../../constants';
import { handleImgUrl, handleVideoUrl } from '../../utils/tools';
import LayoutWrapper from '../public/LayoutWrapper';
import { FORM_DATA, VIDEO_DETAIL_KEY } from './videoKey';
import VideoPlayer from '../public/VideoPlayer';
import styles from './index.module.css';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};

class VideoDetailClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSources: null,
            videoId: props.match.params.id,
            avatar: '', // 头像地址
            videoVisable: false, // 视频播放框是否显示
        };
    }

    async componentDidMount() {
        let res = await yxFetch(REQ_URL.GET_VIDEO_DETAIL, {
            id: this.state.videoId,
        });
        if (res.code === 0 && res.data) {
            FORM_DATA.forEach((item) => {
                let key = Object.keys(item)[0]; // 默认数组对象只有一个属性，只是为了映射
                this.props.form.setFields({ [key]: { value: res.data[key] }});
            });
            this.setState({
                videoSources: [{
                    src: handleVideoUrl(res.data.playUrl),
                    label: '普通',
                    res: '普通'
                }],
                avatar: handleImgUrl(res.data.avatar),
                poster: handleImgUrl(res.data.picUrl) || require('../../assets/none.png'),
            });
        } else {
            console.log(MESSAGE.GET_VIDEO_FAILED, res);
            message.error(MESSAGE.GET_VIDEO_FAILED);
        }
    }

    handleSubmit() {

    }

    controlVideoModal = (state) => {
        this.setState({
            videoVisable: state,
        });
    }

    getFormContentDiv(key) {
        // todo 根据字段修改显示div内哦让那个
        let content = '';
        switch (key) {
            case VIDEO_DETAIL_KEY.ID:
                content = (<Input disabled={true} />);
                break;
            case VIDEO_DETAIL_KEY.AVATAR: // 图片处理
                content = (<Avatar size={'large'} shape={'square'} src={this.state.avatar}/>);
                break;
            case VIDEO_DETAIL_KEY.PLAY_URL: // 视频url
                content = (
                    <div>
                        <a onClick={this.controlVideoModal.bind(this, true)} className={styles.playerWrapper}>
                            <Icon type='caret-right'/>
                            <img src={this.state.poster} width='100' alt={NAME.COVER_MAP}/>
                        </a>
                        <Modal
                            visible={this.state.videoVisable}
                            title={NAME.VIDEO_PRE}
                            width={WIDTH_DATA.VIDEO_MODAL}
                            onCancel={this.controlVideoModal.bind(this, false)}
                            footer={null}
                            destroyOnClose={true}
                        >
                            <VideoPlayer
                                videoSources={this.state.videoSources}
                                poster={this.state.poster}
                                width={WIDTH_DATA.VIDEO_WRAPPER}
                            />
                        </Modal>
                    </div>
                );
                break;
            default:
                content = (<Input disabled={true} />);
                break;
        }
        return content;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let self = this;

        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <Form onSubmit={this.handleSubmit}>
                    {
                        FORM_DATA.map((item, index) => {
                            let key = Object.keys(item)[0]; // 默认数组对象只有一个属性，只是为了映射
                            let content = self.getFormContentDiv(key);
                            return (
                                <Form.Item
                                    {...formItemLayout}
                                    key={index}
                                    label={item[key]}
                                >
                                    {getFieldDecorator(key, {
                                        rules: [{ required: false }],
                                    })(content)}
                                </Form.Item>
                            );
                        })
                    }

                </Form>
            </LayoutWrapper>
        );
    }
}

const VideoDetail = Form.create()(VideoDetailClass);

export default connect()(VideoDetail);
