const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const express = require('express')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended:true }))
app.use(express.json());

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.use(express.static('/public'))

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
});