import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "../stores/ConfigStore";
import UserStore from "../stores/UserStore";
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
            payload: user
        });
    });
}

export function updateUser(user) {
    user.id = UserStore.id;
    return ajax({
        url: ConfigStore.apiLocation + "users",
        method: "PUT",
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
