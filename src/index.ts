import { env, isDevEnv, isTestEnv } from "../env.ts"

import { app } from "./server.ts"

app.listen(env.PORT, () => {
  console.log("--- SERVER IS STARTING UP ---");

  console.log(`The server is listening on Port: ${env.PORT}`)
  console.log(`Environment: ${env.APP_STAGE}`)

  if (isDevEnv()) {
    console.log("Mode: 🛠️  DEVELOPMENT")
  } else if (isTestEnv()) {
    console.log("Mode: 🚀 TESTING")
  } else {
    console.log("Mode: 🌍 PRODUCTION")
  }
})






