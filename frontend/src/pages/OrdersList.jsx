import React from "react";
import { useEffect, useState } from "react";
import { getAllOrders } from "../actions/orderActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

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
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrders(ordersList);
  }, [ordersList]);


  const formatDate = (date) => {
    return date.toString().substring(0, 10);

  }

  console.log(orders);

  return (
    <div>
      {loadingOrders && <Loading />}
      {errorOrders && <Error error={errorOrders} />}

      <section className="pt-12   mt-6  lg:ml-60  xl:ml-52 md:mt-12">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white table-auto ">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Order ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  User ID
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Amount
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Date
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  foods
                </th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {orders.map((order) => (
                <tr className="even:bg-blue-50" key={order._id}>
                  <td className="p-4 text-sm text-black">{order._id}</td>
                  <td className="p-4 text-sm text-black">{order.email}</td>
                  <td className="p-4 text-sm text-black">{order.userid}</td>
                  <td className="p-4 text-sm text-black">{order.orderAmount}</td>
                  <td className="p-4 text-sm text-black">{formatDate(order.createdAt)}</td>
                  <td className="p-4 text-sm text-black">{order.isDelivered?'yes':'not yet'}</td>
                  <td className="p-4 text-sm text-black">
                    <button>view</button>
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
