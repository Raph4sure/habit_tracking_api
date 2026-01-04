import { env, isDevEnv, isTestEnv } from "../env.ts"

import { app } from "./server.ts"

app.listen(env.PORT, () => {
  console.log("--- SERVER IS STARTING UP ---");

  console.log(`The server is listening on Port: ${env.PORT}`)
  console.log(`Environment: ${env.APP_STAGE}`)

  if (isDevEnv()) {
    console.log("Mode: 🛠️  DEVELOPMENT")
  } else if (isTestEnv()) {
    console.log("Mode: 🧪 TESTING")
  } else {
    console.log("Mode: 🌍 PRODUCTION")
  }
})






// console.log(`Database Location: ${env.DATABASE_URL}`);

// // This proves Zod turned the string "3000" into a real number
// console.log(`Port Type: ${typeof env.PORT}`);

// "scripts": {
//     "dev": "cross-env APP_STAGE=dev node --watch src/index.ts",
//     "start": "cross-env APP_STAGE=production node src/index.ts",
//     "test": "cross-env APP_STAGE=test vitest run",
//     "test:watch": "cross-env APP_STAGE=test vitest",
//     "test:coverage": "cross-env APP_STAGE=test vitest run --coverage"
//   },
