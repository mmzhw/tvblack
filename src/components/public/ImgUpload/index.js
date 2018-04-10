import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';
import yxFetch from '../../../utils/fetch';
import { REQ_URL } from '../../../constants';
import { handleImgUrl } from '../../../utils/tools';

// 组件参数
// imageUrl：默认图片地址
// width：图片显示宽度
// uploadDone：返回图片地址

class ImgUpload extends Component {
    constructor(props) {
        super(props);

        this.text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            this.text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        this.state = {
            loading: false,
            imageUrl: props.imageUrl || '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imageUrl !== this.props.imageUrl) {
            this.setState({
                imageUrl: nextProps.imageUrl || '',
            });
        }
    }

    beforeUpload(file) {
        this.setState({
            loading: true,
        });
        const key = `back-${Date.now()}-${this.text}`;
        yxFetch(REQ_URL.UPLOAD_TOKEN, {
            bucket: 'dx-image-test',
            key,
            expires: 3600
        }).then((res) => {
            if (res.code === 0) {
                let formData = new window.FormData();
                formData.append('file', file.file);
                formData.append('token', res.data);
                formData.append('key', key);
                fetch(REQ_URL.QINIU, {
                    method: 'post',
                    mode: 'cors',
                    body: formData
                }).then(json => {
                    return json.json();
                }).then((data) => {
                    this.props.uploadDone(data.key);
                    this.setState({
                        imageUrl: handleImgUrl(data.key),
                        loading: false,
                    });
                });
            } else {
                message.error('鉴权失败');
            }
        });
    }

    render() {
        return (
            <Upload
                name='avatar'
                listType='picture-card'
                showUploadList={false}
                customRequest={this.beforeUpload.bind(this)}
            >
                {this.state.imageUrl ? (
                    <img src={handleImgUrl(this.state.imageUrl)} style={{ width: this.props.width || '100%' }} alt='' />
                ) : (
                    <div>
                        <Icon type={this.state.loading ? 'loading' : 'plus'} />
                        <div className='ant-upload-text'>Upload</div>
                    </div>
                )}
            </Upload>
        );
    }
}

export default connect()(ImgUpload);
