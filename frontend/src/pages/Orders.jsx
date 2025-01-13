import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { use } from "react";
import { getUserOrders } from "../actions/orderActions";
import { getUserOrdersReducer } from "../reducers/orderReducer";

import Success from "../components/Success";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Order from "./Order"
import { useNavigate } from 'react-router-dom';
const Orders = () => {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = ordersState;
  const navigate = useNavigate();
  //console.log(orders);
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleOrderClick = (order_id) => {
    navigate(`/orders/${order_id}`);
  };

  const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  return (
    <section className="pt-28 sm:pt-24 md:pt-12 lg:pt-16 xl:pt-8 mt-6 lg:ml-52 md:ml-16 xl:ml-48 ">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 ">
        <div className="mx-auto max-w-5xl ">
          {/* <!-- Page title --> */}
          <div className="gap-4 sm:flex sm:items-center sm:justify-between ">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              My orders
            </h2>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0 ">
              <div >
                <label
                  
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select order type
                </label>
                <select id="order-type" defaultValue="All orders">
                  <option >All orders</option>

                  <option value="transit">In transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              
              <div >
                <label
                  
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select duration
                </label>
                <select id="duration" defaultValue="this week" >
                  <option >this week</option>
                  <option value="this month">this month</option>
                  <option value="last 3 months">the last 3 months</option>
                  <option value="lats 6 months">the last 6 months</option>
                  <option value="this year">this year</option>
                </select>
              </div>
            </div>
          </div>

          {loading && <Loading />}
          {error && <Error error="Something went worng" />}
          {orders &&
            sortedOrders.map((order) => {
              return (
                
                <div key={order._id} className="mt-6 flow-root sm:mt-8 shadow-md ">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="flex flex-col sm:flex-col md:flex-row  flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-full sm:w-1/4 lg:w-auto lg:flex-1  md:ml-6">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400 ">
                          Order ID:
                        </dt>
                        <dd >
                          <a href="#" className="hover:underline">
                            {order._id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 md:ml-16">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400 ">
                          Date:
                        </dt>
                        <dd>{formatDate(order.updatedAt)}</dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1  ">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Price:
                        </dt>
                        <dd >
                        Rs.{order.orderAmount}/-
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        {order.isDelivered?(
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <svg className="me-1 h-3 w-3" ariahidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                            </svg>
                            Delivered
                          </dd>
                        ):(
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            <svg
                              className="me-1 h-3 w-3"
                              ariahidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                              />
                            </svg>
                            In transit
                          </dd>
                        )}
                      </dl>

                      <div className="w-full md:w-auto md:ml-auto">
                        <a
                         
                          className="w-full inline-flex justify-center rounded-lg border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 dark:hover:text-white dark:focus:ring-blue-800 lg:w-auto"
                          onClick={() => handleOrderClick(order._id)}
                        >
                          View details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      
      
      
    </section>
  );
};

export default Orders;
