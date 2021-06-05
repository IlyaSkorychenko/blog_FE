import {initializeStore} from "../store/store";

export default function withRedux(lowOrderFunction) {
    return async (ctx) => {
        const reduxStore = initializeStore();
        const { dispatch } = reduxStore;
        const result = await lowOrderFunction(ctx, dispatch, reduxStore);
        return {
            ...result,
            props: {
                ...result.props,
                initialReduxState: reduxStore.getState()
            }
        }
    }
};