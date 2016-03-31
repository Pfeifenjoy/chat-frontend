import React, {Component} from "react";
import NotifyStore from "../stores/NotifyStore";
import {deleteNotify} from "../actions/NotifyActions";
import MaxMinStore from "../stores/MaxMinStore";


/**
 * A notification bar which shows at the top of the Page.
 * it can contain Notifications.
 */
export default class NotificationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: NotifyStore.notifications
        }
    }

    componentWillMount() {
        NotifyStore.on("notificationChange", () => {
            this.setState({notifications: NotifyStore.notifications});
        });

        MaxMinStore.on('update', this.forceUpdate.bind(this));
    }

    render() {
        const notifications = this.state.notifications.map(notification => {
            return <li className="Notification" key={notification.id} data-id={notification.id}>
                    <h3>{notification.title}</h3>
                    <button className="btn btn-danger" onClick={this.deleteNotification.bind(this)}>Delete</button>
                    <div className="clear"></div>
                </li>;
        });

        let className = "NotificationBar " + (MaxMinStore.getState().minified ? 'maximized' : 'minimized');
        return <ul className={className}>
                {notifications}
            </ul>;
    }

    deleteNotification(oEvent) {
        let id = oEvent.target.parentElement.dataset.id;
        deleteNotify(id);
    }
}
