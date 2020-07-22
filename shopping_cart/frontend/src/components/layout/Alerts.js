import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from  'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message }  = this.props;
        const omitAlert = []

        if (error !== prevProps.error) {
           for (const err in error.msg) {
                if (omitAlert.includes(err)) {
                    continue;
                }

                alert.error(`${err}: ${error.msg[err]}`)
           }

        }

        if (message !== prevProps.message) {
            message.productCreated && alert.success(message.productCreated)
        }
    }

    render() {
        return (<Fragment />);
    }
}

Alerts.propTypes = {
    error: PropTypes.object,
    message: PropTypes.object
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));