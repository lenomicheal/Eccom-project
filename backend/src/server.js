const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend runnings' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


