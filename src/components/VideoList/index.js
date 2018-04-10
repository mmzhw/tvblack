import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { PATH } from '../../constants/Link';
import { Link } from 'react-router-dom';
import { MESSAGE, REQ_URL, VIDEOS_PAGE_SIZE } from '../../constants';
import yxFetch from '../../utils/fetch';
import LayoutWrapper from '../public/LayoutWrapper';
import { message } from 'antd';

// todo 根据实际字段修改需要展示的内容
const videoListColumns = [{
    title: 'ID',
    dataIndex: 'episodeId',
}, {
    title: '标题',
    dataIndex: 'name',
}, {
    title: '操作',
    render: (text, record, index) => {
        return (
            <Button key={index} type='primary'>
                <Link to={`${PATH.VIDEOS}/${record.id}`}>详情</Link>
            </Button>
        );
    }
}];

class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSources: [],
        };
    }

    componentDidMount() {
        // todo 初始化获取数据
        this.fetchVideoList(1);
    }

    async fetchVideoList(pageIndex) {
        // todo 测试数据
        let res = await yxFetch(REQ_URL.SEARCH_VIDEO_LISTS, {
            pageIndex: pageIndex,
            pageSize: VIDEOS_PAGE_SIZE,
        });
        if (res.code === 0) {
            this.setState({
                dataSources: res.data.data,
                total: res.data.records,
            });
        } else {
            console.log(MESSAGE.GET_VIDEO_LIST, res);
            message.error(MESSAGE.GET_VIDEO_LIST);
        }
    }

    render() {
        const pagination = {
            showQuickJumper: true,
            pageSize: VIDEOS_PAGE_SIZE,
            total: this.state.total,
        };
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div>
                    <Table
                        dataSource={this.state.dataSources}
                        columns={videoListColumns}
                        pagination={pagination}
                        rowKey={record => record.episodeId}
                        onChange={(pagination) => { this.fetchVideoList(pagination.current); }}
                    />
                </div>
            </LayoutWrapper>
        );
    }
}

export default connect()(VideoList);
