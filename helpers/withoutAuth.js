import {getUserProfile} from "../api/user";
import {apiClient} from "../lib/axios";

export default function withoutAuth(getServerSidePropsFunc) {
    return async (ctx) => {
        const {token} = ctx.req.cookies
        if (token) {
            try {
                apiClient.setToken(token);
                await getUserProfile();
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            } catch (e) {
                if (e.response?.status === 401) {
                    ctx.res.setHeader(
                        'Set-Cookie',
                        'token=; path=/; max-age=0'
                    );
                    return {props:{}}
                }

                if (e.response?.status >= 500) {
                    return {
                        redirect: {
                            destination: '/500',
                            permanent: false,
                        }
                    }
                }

                return {
                    redirect: {
                        destination: '/service-unavailable',
                        permanent: false,
                    }
                }
            }

        }

        if (getServerSidePropsFunc) {
            const result = await getServerSidePropsFunc(ctx)
            return {
                ...result,
                props: {
                    ...result.props
                }
            }
        }

        return {props: {}};
    }
};