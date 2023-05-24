import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'

export default function authRoute(Component, redirect = '/login', roleFlag = false, roleId = []) {
    return function authRoute(props) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter()

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { authToken, userInfo } = useSelector((state) => state.auth)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (redirect) {
                if (authToken == null && authToken == undefined) {
                    router.push('/login')
                } else if (roleFlag && !roleId.includes(userInfo.role_id)) {
                    router.push(redirect)
                }
            }

        }, [authToken, userInfo, router])

        if (authToken) {
            return <Component {...props} />
        }

        return null
    }
}