
import axios from 'axios';
import config from './config';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import { removeToken, removeUserInfo } from '@/store/authSlice'

const service = axios.create({
    baseURL: config.API_URL
});

const ApiService = {
    post(resource, params, header) {
        return new Promise((resolve, reject) => {
            service.post(resource, params, header)
                .then(response => {
                    // console.log('response', response.data)

                    // unauthorized error
                    if (response.data && response.data.code && response.data.code == "401") {
                        const router = useRouter();
                        const dispatch = useDispatch();

                        toast.error("Token Expired")
                        dispatch(removeToken());
                        dispatch(removeUserInfo());

                        router.push('/login');
                    }
                    resolve(response)
                }).catch(err => {
                    reject(err);
                    console.log('err', err)
                });
        })
    },
    get(resource, params, header) {
        return new Promise((resolve, reject) => {
            service.get(resource, params, header)
                .then(response => {
                    // console.log('response', response.data)

                    // unauthorized error
                    if (response.data && response.data.code && response.data.code == "401") {
                        const router = useRouter();
                        const dispatch = useDispatch();

                        toast.error("Token Expired")
                        dispatch(removeToken());
                        dispatch(removeUserInfo());

                        router.push('/login');
                    }
                    resolve(response)
                }).catch(err => {
                    reject(err);
                    console.log('err', err)
                });
        })
    },
}

export default ApiService