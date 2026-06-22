"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

import { DeleteModal } from "./DeleteModal";
import { UpdateModal } from "./UpadateModal";
// import { UpdateModal } from "./UpadateModal";


export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner></LoadingSpinner>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
          ToDo App
        </h1>

        <Link href="/add-facilities">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-medium transition whitespace-nowrap">
            + Add New
          </button>
        </Link>
      </div>

     
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-4">Task Name</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4">Status</th>
              
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No Tasks Found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 text-gray-700 font-medium">
                    {task.title}
                  </td>
                  <td className="px-6 py-5 text-gray-700 font-medium">
                    {task.description}
                    
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex items-center gap-3">
                    <DeleteModal task={task}></DeleteModal>
                    <UpdateModal task={task}></UpdateModal>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      <div className="lg:hidden flex flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No facilities found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <span className="text-gray-700 font-semibold text-sm whitespace-nowrap ml-2">
                  {task.description}
                </span>
                </div>
                <span className="inline-block mt-1 bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    {task.status}
                    
                  </span>
                
              </div>

              

              <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                {/* <UpdateModal></UpdateModal> */}
                <DeleteModal task={task}></DeleteModal>
                <UpdateModal task={task}></UpdateModal>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}