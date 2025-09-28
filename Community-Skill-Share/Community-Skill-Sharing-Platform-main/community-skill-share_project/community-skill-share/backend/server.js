const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Simple route
app.get('/', (req, res) => res.send('Community Skill-Sharing API'));

// Socket.IO - basic
io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
  socket.on('chatMessage', (payload) => {
    // broadcast to room
    io.to(payload.room).emit('chatMessage', payload);
  });
  socket.on('disconnect', () => console.log('client disconnected', socket.id));
});

// Mongoose connect
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillshare';
mongoose.connect(MONGO)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Basic models (example)
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  bio: String,
});
const WorkshopSchema = new mongoose.Schema({
  title: String,
  description: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  seats: Number,
  price: Number,
});
const User = mongoose.model('User', UserSchema);
const Workshop = mongoose.model('Workshop', WorkshopSchema);

// Basic API routes (extend these)
app.get('/api/workshops', async (req, res) => {
  const workshops = await Workshop.find().populate('host', 'name email');
  res.json(workshops);
});

app.post('/api/workshops', async (req, res) => {
  const w = new Workshop(req.body);
  await w.save();
  res.status(201).json(w);
});

// Stripe placeholder route
app.post('/api/create-checkout-session', async (req, res) => {
  // NOTE: Add actual Stripe integration. This is a placeholder to show where to call stripe.checkout.sessions.create()
  res.json({ message: 'create-checkout-session placeholder - add Stripe secret key and implementation' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
