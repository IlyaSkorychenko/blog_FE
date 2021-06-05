import {apiClient} from "../lib/axios";
import {getProfileAsync} from "../store/profile/action";

export default function withAuth(getServerSidePropsFunc) {
    return async (ctx, dispatch, reduxStore) => {
        const {token} = ctx.req.cookies
        if (token) {
            try {
                apiClient.setToken(token);
                await dispatch(getProfileAsync());
                if (getServerSidePropsFunc) {
                    const result = await getServerSidePropsFunc({ctx, dispatch, reduxStore})
                    return {
                        ...result,
                        props: {
                            token,
                            ...result.props
                        }
                    }
                }
                return {props: {token}}
            } catch (e) {
                if (e.response?.status === 401) {
                    ctx.res.setHeader(
                        'Set-Cookie',
                        'token=; path=/; max-age=0'
                    );
                    return {
                        redirect: {
                            destination: '/login',
                            permanent: false,
                        }
                    }
                }

                if (e.response?.status >= 500) {
                    return {
                        redirect: {
                            destination: '500',
                            permanent: false,
                        }
                    }
                }

                return {
                    redirect: {
                        destination: 'service-unavailable',
                        permanent: false,
                    }
                }
            }
        }
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
};