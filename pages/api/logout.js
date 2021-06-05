import {apiClient} from "../../lib/axios";

export default async (req, res) => {
    try {
        apiClient.setToken(req.cookies.token);
        apiClient.instance.post('auth/logout/');
        res.setHeader(
            'Set-Cookie',
            'token=; path=/; max-age=0'
        );
        res.status(200);
        res.json({});
    }
    catch (error) {
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
