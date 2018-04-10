import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from '../public/LayoutWrapper';
import { message } from 'antd';
import yxFetch from '../../utils/fetch';
import { MESSAGE, REQ_URL } from '../../constants';
import Bookshelf from './Bookshelf';

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [], // 所有频道基本信息
        };
    }

    componentDidMount() {
        this.initChannel();
    }

    async initChannel() {
        const res = await yxFetch(REQ_URL.OTT_CHANNEL_DATA, { 'version': '1.0.0' });
        if (res.code === 0) {
            this.setState({
                channels: res.data,
            });
        } else {
            console.log(MESSAGE.GET_CHANNEL_ERROR, res);
            message.error(MESSAGE.GET_CHANNEL_ERROR);
        }
    }

    render() {
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div>
                    <Bookshelf
                        groups={this.state.channels}
                    />
                </div>
            </LayoutWrapper>
        );
    }
}

export default connect()(ChannelList);
