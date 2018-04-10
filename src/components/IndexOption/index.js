import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from '../public/LayoutWrapper';
import LeftMenu from './LeftMenu';
import Preview from './Preview';
import OptionModule from './Option/OptionModule';
import OptionVideo from './Option/OptionVideo';
import styles from './index.module.css';
import yxFetch from '../../utils/fetch';
import { MESSAGE, REQ_URL } from '../../constants';
import { message, Button } from 'antd';

class IndexOption extends Component {
    constructor(props) {
        super(props);
        let parm = props.location.search.replace(/\?/g, '');
        this.state = {
            cards: [], // 所有信息
            currentVideos: [], // 当前模块的视频数据集合
            currentCardsIndex: parseInt(parm, 10) || 0, // 当前卡片位置
            currentVideoIndex: 0, // 当前视频位置
        };
        this.temVideos = []; // 临时的视频信息，用于切换数目的时候
    }

    async componentDidMount() {
        const res = await yxFetch(REQ_URL.GET_INDEX_OPTION, {});
        if (res.code === 0) {
            this.setState({
                cards: res.data.cards || [],
            });
        } else {
            console.log(MESSAGE.GET_CHANNEL_ERROR, res);
            message.error(MESSAGE.GET_CHANNEL_ERROR);
        }
    }

    // 增加空卡片
    addCard() {
        let cards = this.state.cards.concat();
        cards.push({
            layoutId: 0,
            sort: 0,
            title: '',
            isEnable: 0,
            number: 0,
            videos: [],
        });
        this.setState({
            cards: cards,
            currentCardsIndex: cards.length - 1,
        });
    }

    // 切换当前卡片信息
    changeItem(index) {
        this.setState({
            currentCardsIndex: index,
        });
    }

    // 修改视频数目
    changeNum(num) {
        if (!this.temVideos) {
            this.temVideos = this.state.cards[this.state.currentCardsIndex].videos.concat();
        }

        let newVideos = [];
        for (let i = 0; i < num; i++) {
            if (this.temVideos[i]) {
                newVideos.push(this.temVideos[i]);
            } else {
                newVideos.push({
                    name: '',
                    imageUrl: '',
                });
            }
        }
        let cards = this.state.cards.concat();
        cards[this.state.currentCardsIndex].videos = newVideos;
        this.setState({
            cards: cards,
        });
    }

    // 切换当前卡片的模板类型
    changeModule(type) {
        let cards = this.state.cards.concat();
        cards[this.state.currentCardsIndex].layoutId = Number(type);
        this.setState({
            cards: cards,
        });
    }

    // 删除当前卡片
    deleteModuleData() {
        let cards = this.state.cards.concat();
        cards.splice(this.state.currentCardsIndex, 1);
        this.setState({
            currentCardsIndex: this.state.currentCardsIndex - 1 < 0 ? 0 : this.state.currentCardsIndex - 1,
        });
        this.updateReq(cards);
    }

    // 保存修改后的卡片信息
    saveModuleData(values) {
        let cards = this.state.cards.concat();
        cards[this.state.currentCardsIndex] = {
            ...cards[this.state.currentCardsIndex],
            ...values,
        };
        return this.updateReq(cards);
    }

    // 保存修改后的视频信息
    saveVideoData(values) {
        let cards = this.state.cards.concat();
        cards[this.state.currentCardsIndex].videos[this.state.currentVideoIndex] = {
            ...cards[this.state.currentCardsIndex].videos[this.state.currentVideoIndex],
            ...values
        };
        return this.updateReq(cards);
    }

    // 更新数据
    async updateReq(cards) {
        this.setState({
            cards: cards,
        });
        const res = await yxFetch(REQ_URL.SAVE_INDEX_OPTION, {
            cards: cards
        });
        if (res.code === 0) {
            message.success(MESSAGE.SAVE_SUCCESS);
            return true;
        } else {
            console.log(MESSAGE.GET_CHANNEL_ERROR, res);
            message.error(MESSAGE.GET_CHANNEL_ERROR);
            return false;
        }
    }

    // 切换当前修改的视频
    editVideo(index) {
        this.setState({
            currentVideoIndex: index,
        });
    }

    async publish() {
        const res = await yxFetch(REQ_URL.PUBLISH_INDEX, {});
        if (res.code === 0) {
            message.info(MESSAGE.PUBLISH_SUCCESS);
        } else {
            console.log(MESSAGE.PUBLISH_ERROR, res);
            message.error(MESSAGE.PUBLISH_ERROR);
        }
    }

    render() {
        let { cards, currentCardsIndex, currentVideoIndex } = this.state;
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <Button type='danger' className={styles.publish} onClick={this.publish}>发布更新</Button>
                        <LeftMenu
                            cards={cards}
                            currentCardsIndex={currentCardsIndex}
                            changeItem={this.changeItem.bind(this)}
                            addCard={this.addCard.bind(this)}
                        />
                    </div>
                    <div className={styles.right}>
                        <Preview
                            cards={cards}
                            currentCardsIndex={currentCardsIndex}
                            currentVideoIndex={currentVideoIndex}
                            editVideo={this.editVideo.bind(this)}
                        />
                        <div className={styles.option}>
                            {
                                cards[currentCardsIndex] ? (
                                    <OptionModule
                                        cards={cards}
                                        currentCardsIndex={currentCardsIndex}
                                        changeNum={this.changeNum.bind(this)}
                                        changeModule={this.changeModule.bind(this)}
                                        deleteModuleData={this.deleteModuleData.bind(this)}
                                        saveModuleData={this.saveModuleData.bind(this)}
                                    />
                                ) : ''
                            }
                            {
                                cards[currentCardsIndex] && cards[currentCardsIndex].videos && cards[currentCardsIndex].videos[currentVideoIndex] ? (
                                    <OptionVideo
                                        cards={cards}
                                        currentCardsIndex={currentCardsIndex}
                                        currentVideoIndex={currentVideoIndex}
                                        saveVideoData={this.saveVideoData.bind(this)}
                                    />
                                ) : (<div style={{ flex: 1 }}/>)
                            }

                        </div>

                    </div>
                </div>
            </LayoutWrapper>
        );
    }
}

export default connect()(IndexOption);
