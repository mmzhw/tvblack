import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popconfirm, Divider, Button, Table, Select } from 'antd';
import { MESSAGE, REQ_URL } from '../../constants';
import yxFetch from '../../utils/fetch';
import LayoutWrapper from '../public/LayoutWrapper';
import styles from './index.module.css';
import ImgUpload from '../public/ImgUpload';

class AdOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [], // 列表数据
            position: [{ id: 1, name: '左上' }],
        };

        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '图片',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: 100,
            render: (text, record, index) => {
                return (
                    <ImgUpload
                        imageUrl={text}
                        width={100}
                        uploadDone={this.uploadDone.bind(this, index)}
                    />
                );
            }
        }, {
            title: '广告名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => {
                text = text || '直播';
                return text;
            }
        }, {
            title: '状态',
            dataIndex: 'isEnable',
            key: 'isEnable',
            render: (text, card, index) => {
                return (
                    <span style={{ color: text ? 'green' : 'grey' }} >{text ? '已启用' : '未启用'}</span>
                );
            }
        }, {
            title: '位置',
            dataIndex: 'position',
            key: 'position',
            width: 150,
            render: (text, card, index) => {
                return (
                    <Select style={{ width: '100%' }}>
                        {this.state.position.map((item, index) => (
                            <Select.Option value={ item.id} key={index}>
                                { item.name }
                            </Select.Option>
                        ))}
                    </Select>
                );
            }
        }, {
            title: '操作',
            render: (text, card, index) => {
                return (
                    <span>
                        {
                            card.isEnable ? (
                                <a onClick={() => { this.updateEnable(card, index); }} style={{ color: 'grey' }}>禁用</a>
                            ) : (
                                <a onClick={() => { this.updateEnable(card, index); }} style={{ color: 'green' }}>启用</a>
                            )
                        }
                        <Divider type='vertical' />
                        <Popconfirm title={MESSAGE.DELETE_SURE} onConfirm={() => this.deletePage([index])}> <a>删除</a></Popconfirm>
                    </span>
                );
            }
        }];
    }

    async componentDidMount() {
        let res = await yxFetch(REQ_URL.OTT_OTHER_LIST, { type: 2, version: '1.0.0' });
        if (res.code === 0) {
            this.setState({
                cards: res.data.cards,
            });
        } else {
            console.error(res.errmsg);
        }
    }

    uploadDone(index, imageUrl) {
        let cards = this.state.cards.concat();
        cards[index].imageUrl = imageUrl;
        console.log(cards);
    }

    // 修改单个广告启用状态
    updateEnable(card, index) {
        let cards = this.state.cards;
        cards[index].isEnable = card.isEnable ? 0 : 1;
        this.modifyReqData(cards);
    }

    // 删除接口
    deletePage(indexs) {
        let cards = this.state.cards.concat();
        indexs.map((index) => {
            delete cards[index];
            return true;
        });
        this.modifyReqData(cards);
    }

    // 请求更新数据
    async modifyReqData(cards) {
        this.setState({
            cards: cards
        });
    }

    addCard() {
        let cards = this.state.cards.concat();
        cards.push({
            title: '',
            isEnable: 0,
            position: 1,
            imageUrl: '',
        });
        this.setState({
            cards: cards
        });
    }

    render() {
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div className={styles.wrapper}>
                    <Table
                        dataSource={this.state.cards}
                        columns={this.columns}
                        pagination={false}
                        rowKey={'id'}
                    />
                    <Button type='dashed' className={styles.addButton} onClick={this.addCard.bind(this)}>+</Button>

                </div>
            </LayoutWrapper>
        );
    }
}

export default connect()(AdOption);
