// In-memory orders storage (for demonstration purposes)
// In production, replace this with calls to your database.
let orders = [];

const getOrders = (req, res) => {
    res.json({ success: true, orders });
};

const createOrder = (req, res) => {
    const orderData = req.body;
    // Create a unique id (here using timestamp, but you can use UUIDs)
    orderData._id = new Date().getTime().toString();
    orders.push(orderData);
    res.status(201).json({ success: true, order: orderData });
};

const updateOrder = (req, res) => {
    const orderId = req.params.id;
    const updatedData = req.body;
    let orderFound = false;
    orders = orders.map(order => {
        if (order._id === orderId) {
            orderFound = true;
            return { ...order, ...updatedData, _id: orderId };
        }
        return order;
    });
    if (!orderFound) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.json({ success: true, order: updatedData });
};

const deleteOrder = (req, res) => {
    const orderId = req.params.id;
    const initialLength = orders.length;
    orders = orders.filter(order => order._id !== orderId);
    if (orders.length === initialLength) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.json({ success: true, message: 'Order deleted.' });
};

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };
