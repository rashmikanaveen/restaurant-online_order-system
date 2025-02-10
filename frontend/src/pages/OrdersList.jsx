import React from "react";
import { useEffect, useState } from "react";
import { getAllOrders,updateOrderStatus } from "../actions/orderActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
import { io } from 'socket.io-client';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.getAllOrdersReducer);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders: ordersList,
  } = orderList;

  
  useEffect(() => {
    const socket = io('http://localhost:3000'); // Adjust the URL as needed

    

    socket.on('newOrder', (newOrder) => {
      console.log('Received new order:', newOrder);
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    });

    

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrders(ordersList);
  }, [ordersList]);

  const formatDate = (date) => {
    return date.toString().substring(0, 10);
  };

  //console.log(orders);

  const setDelivered=(id)=>{
    console.log(id)
    try{
      if(window.confirm('Are you sure you want to deliver this order?')){
        dispatch(updateOrderStatus(id))
      }
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div>
      {loadingOrders && <Loading />}
      {errorOrders && <Error error={errorOrders} />}

      <section className="pt-12   mt-6  lg:ml-60  xl:ml-48 md:mt-12 mx-auto ">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white table-auto ">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
              <th className="p-4 text-center text-sm font-medium text-white">
                  Status
                </th>
                <th className="p-4 text-center text-sm font-medium text-white">
                  foods
                </th>
                <th className="p-4 text-center text-sm font-medium text-white">
                  Order ID
                </th>
                {
                  /*
                  <th className="p-4 text-left text-sm font-medium text-white">
                  Email
                </th>
                 */
                }
                <th className="p-4 text-center text-sm font-medium text-white">
                  User ID
                </th>
                <th className="p-4 text-center text-sm font-medium text-white">
                  Amount
                </th>
                <th className="p-4 text-center text-sm font-medium text-white">
                  Date
                </th>
                
                
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {orders.map((order) => (
                <tr className="even:bg-blue-50" key={order._id}>
                  <td className="p-4 text-sm text-black">
                    {order.isDelivered ? (
                      <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                        Delivered
                      </dd>
                    ) : (
                      <button 
                      onClick={() => setDelivered(order._id)}
                      className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
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
                        Set Delivered
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-sm text-black">
                    <Link to={`/admin/orders/${order._id}`}>
                    <button
                      type="button"
                      
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      View Order
                    </button>
                    </Link>
                  </td>
                  
                  <td className="p-4 text-sm text-black ">{order._id}</td>
                  {/*<td className="p-4 text-sm text-black">{order.email}</td> */}
                  <td className="p-4 text-sm text-black">{order.userid}</td>
                  <td className="p-4 text-sm text-black">
                    {order.orderAmount}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {formatDate(order.createdAt)}
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrdersList;
