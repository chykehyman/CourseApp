import express from 'express';
import path from 'path';
import compression from 'compression';


const app = express();
const port = process.env.PORT || 4000;

app.use(compression());
app.use(express.static('build'));

app.get('/api', (request, response) => {
  response.json({
    status: 'Success',
    message: 'Welcome to CourseApp API'
  });
});

app.all('/api*', (request, response) => {
  response.status(404).json({
    status: 'Failed',
    message: 'API route does not exist. Redirect to /api'
  });
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));
