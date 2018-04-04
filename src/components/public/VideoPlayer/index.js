import React, { Component } from 'react';
import { connect } from 'react-redux';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: props.sources || [],
            controls: props.controls || true,
            width: props.width || '768',
            poster: props.poster || '',
        };
        this.player = null;
    }

    componentDidMount() {
        this.initPlayer();
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
            this.player = null;
        }
    }

    initPlayer() {
        this.player = videojs(this.refs.videoPlayer, { ...this.state }, () => { console.log('onPlayerReady', this); });
    }

    render() {
        return (
            <video ref='videoPlayer' className='video-js' style={{ margin: '0 auto' }}/>
        );
    }
}

export default connect()(VideoPlayer);
