const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const apiUser = require('./routes/apiUser');
const apiAccount = require('./routes/apiAccount');
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', apiUser);
app.use('/api/v1/account', apiAccount)
app.use('/admin', adminRouter);
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})