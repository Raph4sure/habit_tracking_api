import { app } from './server.ts';

app.listen(3300, () => {
  console.log('Server Connected successfully on port 3300')
})














// Import the validated env from your file (let's assume it's named env.js)
// import { env, isDev } from './env.js'; 

// console.log("--- ROBOT STARTING UP ---");

// if (isDev()) {
//   console.log("Mode: 🛠️  DEVELOPMENT");
// } else {
//   console.log("Mode: 🚀 PRODUCTION");
// }

// console.log(`The server is listening on Port: ${env.PORT}`);
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