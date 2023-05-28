import * as express from 'express';
import path from 'path';
const cors = require('cors');

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
