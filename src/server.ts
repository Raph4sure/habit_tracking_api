import express from 'express';

import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import hahabitRoutes from './routes/habitRoutes.ts'


const app = express()

// Health check endooint (direct on app)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timeStamp: new Date().toISOString(),
    service: 'Habit Tracker API'
  })
})


// Mounting Routes

app.use('api/auth', authRoutes)
app.use('/api/habits', hahabitRoutes)
app.use('/api/users', userRoutes)


export { app }
export default app
