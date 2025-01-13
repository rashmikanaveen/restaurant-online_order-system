import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserOrders } from "../actions/orderActions";

import Success from "../components/Success";
import Error from "../components/Error";
import Loading from "../components/Loading";
import jsPDF from 'jspdf';
const Order = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = ordersState;
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  //const subtotal = order.orderAmount;

  //const total = order.orderAmount;
  const order = orders ? orders.find((e) => e._id === orderId) : null;

  const handleDownloadBill = () => {
    const doc = new jsPDF();
    const storeName = "EatEase"; // Store name
    const orderDate = new Date(order.updatedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString();

    doc.setFontSize(20); // Increase font size for store name
    doc.text(storeName, 10, 20); // Store name at the top with increased font size

    doc.setFontSize(12); // Reset font size for other text
    doc.text(`Order ID: ${order._id}`, 10, 40); // Adjust y-coordinate to create gap
    doc.text(`Date: ${formattedDate}`, 10, 50);
    doc.text(`Time: ${formattedTime}`, 10, 60);
    doc.text(`Price: Rs.${order.orderAmount}/-`, 10, 70);
    doc.text(`Status: ${order.isDelivered? 'Delivered':'In transit'}`, 10, 80);
    doc.text('Items:', 10, 90);

    let yOffset = 100;
    order.orderItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} (${item.variant}) - Rs.${item.price} x ${item.quantity} = ${item.prices[item.variant]}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save(`bill_${order._id}.pdf`);
  };

  //console.log(order);
  


  return (
    <div className="lg:ml-52 md:ml-16 xl:ml-48">
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {order ? (
        <div className="pt-28 md:pt-0">
        
      <div className="h-screen  pt-12 pb-1">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pt-0">
          <div className="rounded-lg md:w-2/3">
            <ul className="flex flex-col space-y-4">
              {order.orderItems.map((item) => (
                <li
                  key={item._id + item.variant}
                  className="flex flex-col sm:flex-row sm:justify-between items-center border p-4 rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                    <img
                      src={item.image}
                      alt="product-image"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="mt-4 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-lg text-gray-700">
                        {item.variant}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <p className="text-sm sm:text-base text-balance">
                        {item.quantity} * {item.prices[item.variant]} ={" "}
                        {item.price}
                      </p>
                      
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-2xl md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">Rs.{order.orderAmount.toFixed(2)}</p>
            </div>

            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">Rs.{order.orderAmount.toFixed(2)}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            

            <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleDownloadBill}
          >
            Download Bill
          </button>
          </div>
        </div>
      </div>
    </div>
      ) : (
        !loading && <p>Order not found</p>
      )}
    </div>
    
  );
  
};

export default Order;
