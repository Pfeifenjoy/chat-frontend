import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

/**
 * A container for internationalization.
 * Works like a key value store.
 */
class I18n extends EventEmitter {
    constructor() {
        super();
        //initial container for all words
        this.data = {

        }
    }

    /**
    * Get a word by a specific key.
    * If no word is found the key will be returned.
    * Therefore use speaking keys (at best englisch words).
    */
    getWord(key) {
        return this.data[key] || key;
    }

    handleActions(action) {
        switch(action.type) {
            case constants.I18N_WORD_UPDATE: {
                this.data[action.payload.key] = action.payload.value;
                break;
            }
            case constants.I18n_WORDS_UPDATE: {
                Object.assign(this.data, action.payload);
                break;
            }
        }
        this.emit("change");
    }
}


let i18n = new I18n;
dispatcher.register(i18n.handleActions.bind(i18n));

export default i18n;
