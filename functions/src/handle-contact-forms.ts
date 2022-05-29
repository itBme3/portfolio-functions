import * as functions from "firebase-functions"
import * as sgMail from "@sendgrid/mail"
import "dotenv/config"
const apiKey = process.env.SENDGRID_KEY || functions.config().sendgrid.apiKey
sgMail.setApiKey(apiKey)

export const sendContactMessage = async (data: {
  name: string
  email: string
  message: string
}) => {
  const { message, email, name } = data
  const msg = {
    personalizations: [
      {
        to: [
          {
            name: "Bobby Moynihan",
            email: "b.3.moynihan@gmail.com",
          },
        ],
      },
    ],
    from: {
      email: "bobby@gigfirm.com",
      name: "Frontend Dev Portfolio",
    },
    subject: `CONTACT SUBMISSION: ${name} (${email})`,
    text: `${name} ( ${email} ) \n\n${message}`,
    reply_to: { email, name },
  }
  return sgMail
    .send(msg)
    .then(() => {
      return "success"
    })
    .catch((error) => {
      console.error(error.response.body)
      return error.response.body
    })
}
