import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from '../public/LayoutWrapper';

class ChannelList extends Component {
    constructor(props) {
        super(props);
        console.log('ChannelList props', props);
    }

    render() {
        return (
            <LayoutWrapper
                match={this.props.match}
                history={this.props.history}
            >
                <div>Channel</div>
            </LayoutWrapper>
        );
    }
}

export default connect()(ChannelList);
