import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

import { getAllUsers } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
import { deleteUserAction } from "../actions/adminActions";
import {getNumberOfOrdersGivenUser} from '../actions/adminActions';
const UsersList = () => {
  const [allUsers, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordersCount, setOrdersCount] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        //console.log(users);
        setUsers(users);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (date) => {
    return date.toString().substring(0, 10);
  };

  const deleteUser =  (id) => {
        try {
          if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUserAction(id);
          }
          
          
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        const fetchOrdersCount = async () => {
          const counts = {};
          for (const user of allUsers) {
            const count = await getNumberOfOrdersGivenUser(user._id);
            counts[user._id] = count;
          }
          setOrdersCount(counts);
        };
    
        if (allUsers.length > 0) {
          fetchOrdersCount();
        }
      }, [allUsers]);


      
  

  
  

  return (
    <div>
      <section className="pt-12   mt-6  lg:ml-60  xl:ml-52 md:mt-12">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white table-auto ">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Number of Orders
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Joined At
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {allUsers.map((user) => (
                <tr className="even:bg-blue-50" key={user._id}>
                <td className="p-4 text-sm text-black">{user.name}</td>
                <td className="p-4 text-sm text-black">{user.email}</td>
                <td className="p-4 text-sm text-black">{ordersCount[user._id] || 0}</td>
                <td className="p-4 text-sm text-black">{formatDate(user.createdAt)}</td>
                <td className="p-4">
                  
                  <button className="mr-4" title="Delete"
                  onClick={() => deleteUser(user._id)}
                  >
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 fill-red-500 hover:fill-red-700"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      />
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Add your user list rendering logic here */}
    </div>
  );
};

export default UsersList;
