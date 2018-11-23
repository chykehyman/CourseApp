import express from 'express';
import compression from 'compression';


const app = express();
const port = process.env.PORT || 4000;

app.use(compression());
app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.json({ message: 'Api response' });
});

app.listen(port, () => console.log(`server started onjh port ${port}`));
