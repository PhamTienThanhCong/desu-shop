const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
var paypal = require('paypal-rest-sdk');

const categoryRoute = require("./routes/Category");
const productRoute = require("./routes/Product");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");
const chatRoute = require("./routes/Chat");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AY-1IurK4tN0mv18nYE-3s44jVwsRku4uJ9Bnq2F4KcSFq_XJTBZFBCNaewZyS-RxoIDSSdrViUDIboO',
    'client_secret': 'EMnMwfIbscWaHqe3cJAzrr-WNWTI3iyBX-dC6mcSwwBbYKMNUCY6MWeZKIhVQoOf8Ukg11OoKxutiL42'
  });

dotenv.config();
const app = express();
// connect mongodb
mongoose.connect(process.env.MONGODB_URL, () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Connected to MongoDB");
    } else {
        console.log("Error connecting to MongoDB " + mongoose.connection.readyState);
    }
})
mongoose.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan())

//routers
app.use('/v1/category', categoryRoute);
app.use('/v1/product', productRoute);
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/cart',cartRoute);
app.use('/v1/order', orderRoute);
app.use('/v1/chat', chatRoute);

app.post('/pay', cors(),(req, res) => {
    try{const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3006/success",
            "cancel_url": "http://localhost:8000/cancel"
        },
        "transactions": [{
            
            "amount": {
                "currency": "USD",
                "total": req.body.total
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.json(payment.links[i].href);
                }
            }

        }
    });}
    catch(err){
        console.log(err)
    }

});
app.get('/success',cors(),async (req, res) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.redirect('http://localhost:3006');
        }
    });
});

app.get('/cancel',(req,res) => res.send('Cancelled (Đơn hàng đã hủy)'));

let port = 8000;
app.listen(port, () => console.log('server is running in port ' + port));