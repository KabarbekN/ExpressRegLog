const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/registration', (req, res) => {
    res.render('registration');
})
app.get('/login', (req, res) => {
    res.render('login');
})

app.use('/api/v1/register', require('./routes/register'));
app.use('/api/v1/login', require('./routes/login'));
app.use('/api/v1/users', require('./routes/api/user'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


