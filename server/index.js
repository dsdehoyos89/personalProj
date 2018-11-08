require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const session = require('express-session');

const authCtrl = require('./controllers/authCtrl')



const { addDream, getDream, getUser, shareDream, getPublicDreams, addRating } = require('./controllers/controller')


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 56
    }
}));





const port = process.env.SERVER_PORT || 4000;

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err));

authCtrl(app);

//DREAM ENDPOINTS
app.post('/api/dreams', addDream);
app.get('/api/dreams/:id', getDream);
app.put('/api/dreams', shareDream);
app.get('/api/publicDreams', getPublicDreams);
// app.put('/api/ratings', addRating)
// app.get('/api/user', getUser);


//getUser Endpoint 
app.get("/api/getUser", (req, res) => {
    // console.log('req.user in index.js endpoint', req.user)rs
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send({ message: "Please login" });
    }
});


function authenticated(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);

    }
}

//LOGIN ENPOINT
// app.get('/login', (req,res,next)=>{
//     if(req.query.path){
//         app.locals.pathRedirect = req.query.path;
//     }
//     next();
//     },
//     passport.authenticate('auth0'),
//     (req,res) => {
//         app.locals.pathRedirect ?
//         res.redirect(`${process.env.AUTH_PATH}#/${app.locals.pathRedirect}`):
//         res.redirent(`${process.env.AUTH_PATH}`)
//         app.locals.pathRedirect=null

// });

//USER ENPOINTS
// app.post('/api/user', addUser);

// app.get('/api/logout', logout)



app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})