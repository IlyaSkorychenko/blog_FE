import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import { Provider } from 'react-redux'
import { useStore } from '../store/store'
import {apiClient} from "../lib/axios";

export default function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState);
    apiClient.setToken(pageProps.token || '');

    return (
        <Provider store={store}>
                <Layout {...pageProps}>
                    <Component {...pageProps} />
                </Layout>
        </Provider>
    );
};