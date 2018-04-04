import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { PATH } from '../../constants/Link';
import { Link } from 'react-router-dom';
import { REQ_URL } from '../../constants';
import yxFetch from '../../utils/fetch';
import LayoutWrapper from '../public/LayoutWrapper';

// todo 根据实际字段修改需要展示的内容
export const videoListColumns = [{
    title: 'ID',
    dataIndex: 'id',
}, {
    title: '标题',
    dataIndex: 'title',
}, {
    title: '用户昵称',
    dataIndex: 'nickName',
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
        this.fetchVideoList(1, 3);
    }

    async fetchVideoList(page, type) {
        // todo 测试数据
        let res = await yxFetch(REQ_URL.GET_VIDEO_LIST, {
            offset: 5,
            limit: 5,
            type: type,
        });
        if (res.code === 0) {
            this.setState({
                dataSources: res.data.videoShortVos,
            });
        }
    }

    render() {
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div>
                    <Table
                        dataSource={this.state.dataSources}
                        columns={videoListColumns}
                        rowKey={record => record.id}
                    />
                </div>
            </LayoutWrapper>
        );
    }
}

export default connect()(VideoList);
