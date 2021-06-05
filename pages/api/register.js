import {apiClient} from "../../lib/axios";

export default async (req, res) => {
    const cookieMaxAge = 60 * 60 * 24 * 30;
    try {
        const {data: {token}} = await apiClient.instance.post('auth/register', req.body,
            {headers: {'User-Agent': req.headers['user-agent']}});
        res.setHeader(
            'Set-Cookie',
            `token=${token}; HttpOnly; path=/; max-age=${cookieMaxAge}`
        );
        res.status(200);
        res.json({token});
    } catch (error) {
        if (error.response?.status) {
            res.status(error.response.status)
        } else {
            res.status(500)
        }

        if (error.response?.data) {
            res.json(error.response.data)
        } else {
            res.json()
        }
    }
};
