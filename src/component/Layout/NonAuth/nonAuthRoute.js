import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function nonAuthRoute(Component) {
    return function nonAuthRoute(props) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter()

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { authToken, userInfo } = useSelector((state) => state.auth)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (authToken && userInfo.user_id) {
                router.push('/')
            }
        }, [authToken, router, userInfo])

        if (!authToken) {
            return <Component {...props} />
        }

        return null
    }
}