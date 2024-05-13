import nodemailer, { Transporter } from "nodemailer"
import { NextApiRequest, NextApiResponse } from "next"
// import { setEmailData } from "@/lib/functions"
import { MailOptions } from "nodemailer/lib/sendmail-transport"
import { request } from "http"
import  type { EmailData } from "~/utils/types"

export default async function sendEmail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const getBaseUrl = () => {
        if (typeof window !== "undefined") return "" // browser should use relative url
        if (process.env.NEXTAUTH_URL) return `${process.env.NEXTAUTH_URL}` // SSR should use vercel url
        return `${process.env.NEXTAUTH_URL}:${process.env.PORT ?? 3000}` // dev SSR should use localhost
    }

    const {
        sendTo,
        cc,
        resetToken
     } = req.body as EmailData

    // console.log(sendTo, "EMAIL")
    // console.log(process.env.SMTP_SENDER_EMAIL)
    // console.log(process.env.SMTP_SENDER_PASSWORD)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_SENDER_EMAIL,
            pass: process.env.SMTP_SENDER_PASSWORD,
        }
    }) 

    // console.log(otherMailOptions)
    const mailOptions = {
        from: process.env.SMTP_SENDER_EMAIL,
        to: sendTo,
        cc: cc,
        subject: "Password Recovery",
        html: `
        Hello User,<br>
        <br>
        Please click the link to reset your password.  <a href='${getBaseUrl()}/forgotPassword/check?email=${sendTo[0]}&token=${resetToken}'>
        Click Here!</a>
        <br>
        <br>
        <br>
        Thank you 
        <br>
        -------------------------
        <br>
        <i>This message is intended only for the use of the person requesting</i>
        <br>
       
        `,
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await transporter.sendMail(mailOptions)
        res.status(200).json({
            message:
                "Email has been sent to your provided gmail.",
        })
    } catch (error) {
        // console.error("Error sending email:", details.user_email, details.default_password, error)
        // console.log(process.env.SMTP_SENDER_EMAIL)
        // console.log(process.env.SMTP_SENDER_PASSWORD)
        res.status(500).json({
            success: false,
            message: `Internal Server error, please try again`,

        })
    }
}