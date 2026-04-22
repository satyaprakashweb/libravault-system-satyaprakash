const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory "database"
let users = [
  { email: 'admin@libravault.edu', password: 'admin123', name: 'Librarian Admin', role: 'Head Librarian' },
  { email: 'lib@libravault.edu', password: 'lib123', name: 'Ranjit Kumar', role: 'Senior Librarian' }
];

let books = [
  { id: 1, title: 'Physics Vol. III', author: 'Halliday & Resnick · 2023', isbn: '978-0-471-32-0', category: 'Science', totalCopies: 6, availableCopies: 4, cover: '🔬', coverColor: '#2e3d6f' },
  { id: 2, title: 'Advanced Calculus', author: 'Tom Apostol · 2022', isbn: '978-0-201-00-7', category: 'Mathematics', totalCopies: 4, availableCopies: 1, cover: '🧮', coverColor: '#5c2e5c' },
  { id: 3, title: 'Data Structures & Algorithms', author: 'Cormen · 2024', isbn: '978-0-262-04-6', category: 'Computer Science', totalCopies: 8, availableCopies: 0, cover: '💻', coverColor: '#2e5c3d' }
];

// --- API ENDPOINTS ---

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Authentication
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  const { email, password, name, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  const newUser = { email, password, name, role };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

// Books API
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.json({ success: true, book: newBook });
});

// Start the server
app.listen(PORT, () => {
  console.log(`LibraVault Backend server is running on http://localhost:${PORT}`);
});
