import React, { Component } from "react";
import i18n from "../stores/i18n";

/**
 * A component wich manages i18n updates.
 * It can also be used to access i18n data.
 */
export default class I18NComponent extends Component {
    componentWillMount() {
        //handle i18n changes
        this.handleI18n = () => {
            this.forceUpdate();
        }

        //register listeners
        i18n.on("change", this.handleI18n);
    }
    componentWillUnmount() {
        //clean up listeners
        i18n.removeListener("change", this.handleI18n);
    }
    getWord(key) {
        //delegate to i18n
        return i18n.getWord(key);
    }
}
