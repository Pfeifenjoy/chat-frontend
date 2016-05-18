import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "../stores/ConfigStore";
import { ajax } from "../util/ajax";


export function login(username, password) {
    return ajax({
        url: ConfigStore.apiLocation + "users/login",
        method: "POST",
        data: { username, password }
    })
    .done(user => {
        dispatcher.dispatch({
            type: constants.USER_LOGIN,
            payload: { username, token: user.token }
        });
    });
}

export function updateUser(user) {
    return ajax({
        url: ConfigStore.apiLocation + "users",
        method: "GET",
        data: user
    })
    .done(user => {
        dispatcher.dispatch({
            type: constants.USER_UPDATE,
            payload: user
        })
        return user;
    })
}

export function register(username, password) {
    return ajax({
        url: ConfigStore.apiLocation + "users",
        method: "POST",
        data: { username, password }
    })
    .done(user => { console.log(user); })
    .done(login.bind(null, username, password))
}

export function logout() {
    dispatcher.dispatch({
        type: constants.USER_LOGOUT
    });
}

export function searchUser(query) {
    return ajax({
        url: ConfigStore.apiLocation + "users/search",
        method: "GET",
        data: {
            query
        }
    });
}
