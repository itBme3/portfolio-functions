export const validate = async (request: any, response: any, next: any) => {
  const whitelist = [
    "frntend-developer.netlify.app",
"master--frntend-developer.netlify.app",
    "us-central1-frontend-dev-portfolio.cloudfunctions.net"
  ]
  const referrer =
    typeof request.header("Referrer") === "string"
      ? request.header("Referrer")
      : ""
  const host = request.header("host")
  console.log({ host })
  if (
    host.indexOf("localhost:") === 0 ||
    whitelist.includes(host) ||
    (referrer.indexOf > -1 &&
      whitelist
        .map((accepted_referrer) => `https://${accepted_referrer}`)
        .includes(referrer.split("://")[1].split("/")[0]))
  ) {
    next()
  } else {
    return response
      .status(400)
      .send(`referrer ${request.header("Host")} not accepted.`)
  }
}
