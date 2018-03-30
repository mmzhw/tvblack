import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect()(Login);
