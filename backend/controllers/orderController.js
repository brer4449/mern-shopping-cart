const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // destructuring from req.body
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  // checking to see if orderItems has something in it
  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error("No order items")
    return
  } else {
    const order = new Order({
      orderItems, user: req.user._id,
       shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
});

export {
  addOrderItems
}