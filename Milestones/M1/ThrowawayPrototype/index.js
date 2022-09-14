import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('hello csc648');
});
app.listen(3000, () => 
console.log('Example app listening on port 3000!'),
);