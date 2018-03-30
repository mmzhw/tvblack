import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from '../Head';

class VideoList extends Component {
    constructor(props) {
        super(props);
        console.log('videolist props', props);
    }

    render() {
        return (
            <div>
                <Head/>
                成功
            </div>
        );
    }
}

export default connect()(VideoList);
