const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

const OrderController = {
    getOrders: async(req, res) => {
        try {
            const orders = await Order.find();
            return res.status(200).json(orders);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    getOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            return res.status(200).json(order);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    createOrder: async(req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            const cart = await Cart.findById(user.cart);
            const products = req.body.products
            const newOrder = new Order({
                userId: user.id,
                products: products,
            });
            await newOrder.save();
            return res.status(200).json(newOrder);
        }
        catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    updateOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if(req.body.userId) {
                order.userId = req.body.userId;
            }
            if(req.body.products) {
                order.products = req.body.products;
            }
            if(req.body.address) {
                order.address = req.body.address;
            }
            if(req.body.status) {
                order.status = req.body.status;
            }
            if(req.body.paymentType) {
                order.paymentType = req.body.paymentType;
            }
            await order.save();
            return res.status(200).json(order);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }

}

module.exports = OrderController;