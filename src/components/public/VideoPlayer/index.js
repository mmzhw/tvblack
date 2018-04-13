import React, { Component } from 'react';
import { connect } from 'react-redux';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import 'videojs-flash';
import 'videojs-contrib-hls';

import 'videojs-resolution-switcher';
import 'videojs-resolution-switcher/lib/videojs-resolution-switcher.css';

import './newVideo.css';
import { PLAY_STATE } from '../../../constants';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: props.controls || true,
            width: props.width || '768',
            autoplay: true,
            // sources: props.videoSources,
            poster: props.poster || require('../../../assets/none.png'),
        };
        this.player = null;
    }

    componentDidMount() {
        this.initPlayer();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playState === PLAY_STATE.STATR) {
            this.player.play();
        } else if (nextProps.playState === PLAY_STATE.PAUSE) {
            this.player.pause();
        }
        if (nextProps.videoSources !== this.props.videoSources) {
            this.player.updateSrc(nextProps.videoSources);
            // if (this.player) {
            //     this.setState({
            //         sources: nextProps.videoSources
            //     });
            //     this.player.src(nextProps.videoSources);
            // }
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
            this.player = null;
        }
    }

    initPlayer() {
        let { ...option } = this.state;
        option.html5 = {
            hls: { withCredentials: false },
            hlsjsConfig: {
                debug: true
            }
        };

        option.techOrder = ['html5', 'flash'];

        option.plugins = {
            videoJsResolutionSwitcher: {
                ui: true,
                default: 'high',
                dynamicLabel: true
            }
        };

        let videoSources = this.props.videoSources;

        this.player = videojs(this.refs.videoPlayer, option, () => {
            let player = this.player;
            player.updateSrc(videoSources);

            player.on('resolutionchange', function() {
                console.info('Source changed to %s', player.src());
            });
        });
    }

    render() {
        return (
            <video ref='videoPlayer' className='video-js vjs-default-skin' style={{ margin: '0 auto' }}/>
        );
    }
}

export default connect()(VideoPlayer);
