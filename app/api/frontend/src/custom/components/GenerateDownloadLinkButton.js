import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';

class GenerateDownloadLinkButton extends Component {
    handleClick = () => {
        // const { push, record, showNotification } = this.props;
        // const updatedRecord = { ...record, is_approved: true };
        // fetch(`/comments/${record.id}`, { method: 'PUT', body: updatedRecord })
        //     .then(() => {
        //         showNotification('Comment approved');
        //         push('/comments');
        //     })
            .catch((e) => {
                console.error(e);
                showNotification('Error: download link was not generated', 'warning')
            });
    }

    render() {
        return <FlatButton label="Generate Download Link" onClick={this.handleClick} />;
    }
}

GenerateDownloadLinkButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction,
})(GenerateDownloadLinkButton);