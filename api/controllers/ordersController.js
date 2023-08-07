const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.order_get_all = async (req, resp, next) => {
    try {
        const docs = await Order.find({});
        const output = [];
        docs.map(async (doc) => {
            const product = await Product.findById(doc.productId);
            const productName = product ? product.name : 'Product Not found';
            const productUrl = `${req.protocol}://${req.get('host')}/products/${product._id}`;
            const orderUrl = `${req.protocol}://${req.get('host')}/orders/${doc._id}`;
            output.push({
                productId: doc.productId,
                orderId: doc._id,
                productName: productName,
                quantity: doc.quantity,
                orderUrl: orderUrl,
                productUrl: productUrl,
            });
        });

        resp.status(400).json({
            output: output
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({
            error: error,
            message: "Orders not retrieved"
        });
    }
}


exports.order_create_order = async (req, res, next) => {
    try {
        const { quantity, productId } = req.body;

        // Validate the productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid productId' });
        }

        let product;
        try {
            product = await Product.findById(productId);
        } catch (error) {
            // Handle the error when finding the product
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while finding the product' });
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: quantity,
            productId: productId,
        });

        const result = await order.save();
        const orderUrl = `${req.protocol}://${req.get('host')}/orders/${result._id}`;
        const productUrl = `${req.protocol}://${req.get('host')}/products/${product._id}`;

        res.status(201).json({
            message: 'Order stored',
            orderId: result._id,
            productUrl: productUrl,
            quantity: result.quantity,
            orderUrl: orderUrl,
        });
    } catch (error) {
        // Handle any other potential errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

exports.orders_get_order = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        const order = await Order.findById(orderId).populate('product', 'name');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const orderUrl = `${req.protocol}://${req.get('host')}/orders/${orderId}`;
        res.status(200).json({
            orderId: orderId,
            productName: order.productId.name,
            quantity: order.quantity,
            orderUrl: orderUrl
        });
    } catch (error) {
        res.status(500).json({ error: "Could not get order" });
        console.log(error);
    }
}


exports.order_delete_order = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid orderId' });
        }

        const order = await Order.deleteOne({ _id: orderId });

        if (order.deletedCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const OrdersUrl = `${req.protocol}://${req.get('host')}/orders`;
        res.status(200).json({
            message: 'Order Successfully removed',
            OrdersUrl: OrdersUrl
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete order' });
        console.log(error);
    }
}

