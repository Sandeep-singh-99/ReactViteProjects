import express from 'express';

const app = express();

const PORT = process.env.PORT || 5001;
import userRouter from './router/user.route.js';
import postRouter from './router/post.route.js'


app.use(express.json());

app.use('/api/v1/user', userRouter);

app.use('/api/v1/post', postRouter);


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});