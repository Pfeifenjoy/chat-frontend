import $ from "jquery";
import UserStore from "../stores/UserStore";

/**
 * An ajax function which makes authenticated calls.
 */
export function ajax(request) {
    request.data = request.data || {};
    request.data.token = UserStore.token;
    return $.ajax(request);
}
