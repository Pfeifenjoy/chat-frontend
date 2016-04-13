import UserStore from "../stores/UserStore";

export function requireAuth(nextState, replace) {
    if(!UserStore.authenticated) {
        replace({
            pathname: "/login",
            state: { nextPathname: nextState.location.pathname }
        });
    }
}
