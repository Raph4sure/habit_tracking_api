import express from 'express';

const app = express()

app.get('/habit', (req, res) => {
  res.json({ message: 'Habit fetched' })
})

export { app }
