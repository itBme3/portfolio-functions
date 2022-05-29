import * as functions from "firebase-functions"
import * as express from "express"
import { validate } from "./middleware"

import { sendContactMessage } from "./handle-contact-forms"
import * as cookieParser from "cookie-parser"
// import * as cors from "cors"; 

const app = express()
// app.use(cors)
app.use(cookieParser())

app.post("/contact", validate, async (req: any, res: any) => {
  try {
    const messageResponse = await sendContactMessage(req.body)
    return res
      .status(messageResponse === "success" ? 200 : 500)
      .send(messageResponse)
  } catch (err) {
    res.status(500).send(null)
  }
})

app.get("/test", (req: any, res: any) => {
  return res.send("test")
})
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const api = functions.https.onRequest(app)
