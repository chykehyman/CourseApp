import express from 'express';
import path from 'path';
import compression from 'compression';


const app = express();
const port = process.env.PORT || 4000;

app.use(compression());
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/api', (req, res) => {
  res.json({ message: 'Api response' });
});

app.listen(port, () => console.log(`server started on port ${port}`));
