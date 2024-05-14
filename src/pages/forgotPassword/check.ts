import { useSafePush, useSafeReplace } from "~/utils/safe-push"
import { api } from "~/utils/api"
import { useRouter } from "next/router"
import { useEffect } from "react"

const ResetPassCheck = () => {
    const router = useRouter()

    const { safePush } = useSafePush()
    const { safeReplace } = useSafeReplace()

    const queryEmail = String(router.query.email)
    const queryToken = String(router.query.token)

    // check if user exists and the token provided is still valid
    const { data: userData, refetch } = api.account.findOneEmailOrToken.useQuery({
        token: queryToken,
        email: queryEmail
    })

    useEffect(() => {
        const currentDate = new Date()

        console.log(userData)

        if (queryToken == null || queryToken == null) {
            safeReplace(`/user/login`)
        }

        if (userData) {
            const resetPassToken = userData?.reset_token
            const resetPassUntil = userData.reset_until

            if (resetPassToken != queryToken || (resetPassToken == null && resetPassUntil == null) || (currentDate > (resetPassUntil ?? currentDate))) {
                safePush('/forgotPassword/error')
            } else {
                safePush(`/forgotPassword?email=${queryEmail}&token=${queryToken}`)
            }
        } 
         
       
    }, [userData])
}

export default ResetPassCheck