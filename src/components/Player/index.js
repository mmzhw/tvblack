import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.css';
import LayoutWrapper from '../public/LayoutWrapper';
import VideoPlayer from '../public/VideoPlayer';
import { Input, message } from 'antd';
import { handleVideoUrl } from '../../utils/tools';
import { PLAY_STATE, REQ_URL, WIDTH_DATA } from '../../constants';
import yxFetch from '../../utils/fetch';

const m3u8Parser = require('m3u8-parser');
const quality = ['流畅', '标清', '高清', '1080P'];

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSources: null,
            playState: PLAY_STATE.STATR,
        };
    }

    // 根据url解析各种码率的视频地址
    parseHlsList(url) {
        fetch(url, {}).then((res) => {
            return res.text();
        }).then((res) => {
            const parser = new m3u8Parser.Parser();
            parser.push(res);
            parser.end();
            let parsedManifest = parser.manifest;
            if (parsedManifest) {
                let hlsList = [];
                parsedManifest.playlists.forEach((item, index) => {
                    hlsList.push({
                        src: handleVideoUrl(item.uri),
                        type: 'application/x-mpegURL',
                        label: quality[index],
                        res: quality[index]
                    });
                });
                hlsList = hlsList.reverse();
                this.setState({
                    videoSources: hlsList,
                });
            }
        });
    }

    updataUrl(type, value) {
        if (type === 1) {
            this.parseHlsList(handleVideoUrl(value));
        } else {
            this.setState({
                videoSources: [{
                    src: handleVideoUrl(value),
                    label: '流畅',
                    res: '流畅'
                }],
            });
        }
    }

    // 转码
    transcoding() {
        yxFetch(REQ_URL.VIDEO_PROCESS, {
            videoDetailId: this.state.videoDetailId,
            originalURL: this.state.originalUrl
        }).then(res => {
            if (res.code === 0) {

            } else {
                message.error(res.errmsg);
            }
        });
    }

    render() {
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div className={styles.wrapper}>
                    <Input.Search
                        addonBefore='m3u8'
                        defaultValue={'《湮灭》终极预告_m3u8_240P_480P_720P_1080P_20180409.m3u8'}
                        enterButton='播放'
                        onSearch={this.updataUrl.bind(this, 1)}
                        style={{ width: WIDTH_DATA.PLAYER_WIDTH, marginBottom: 20 }}
                    />
                    <br/>
                    <Input.Search
                        addonBefore='其他'
                        defaultValue={'足协罚单阿兰肘击对手禁赛8场罚款5万6_mp4_240P_20180411.mp4'}
                        enterButton='播放'
                        onSearch={this.updataUrl.bind(this, 2)}
                        style={{ width: WIDTH_DATA.PLAYER_WIDTH, marginBottom: 20 }}
                    />
                    <div style={{ width: 500, marginBottom: 20 }}>
                        <VideoPlayer
                            videoSources={this.state.videoSources}
                            poster={this.state.poster}
                            playState={this.state.playState}
                            width={WIDTH_DATA.PLAYER_WIDTH}
                        />
                    </div>

                </div>
            </LayoutWrapper>

        );
    }
}

export default connect()(Player);
