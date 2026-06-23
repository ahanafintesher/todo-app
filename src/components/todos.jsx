"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { DeleteModal } from "./DeleteModal";
import { UpdateModal } from "./UpadateModal";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-600",
  completed: "bg-green-100 text-green-600",
};

function StatusBadge({ status }) {
  const color =
    statusColors[status?.toLowerCase()] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${color}`}>
      {status}
    </span>
  );
}

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          ToDo App
        </h1>
        <Link href="/add-task">
          <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition">
            + Add New
          </button>
        </Link>
      </div>

      {/* ── Desktop table (lg+) ── */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="text-left px-6 py-4 w-1/4">Task Name</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4 whitespace-nowrap w-[130px]">Status</th>
              <th className="text-left px-6 py-4 whitespace-nowrap w-[200px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-14 text-gray-400">
                  No tasks yet — add one to get started.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DeleteModal task={task} />
                      <UpdateModal task={task} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Tablet grid (sm–lg) ── */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
        {tasks.length === 0 ? (
          <p className="col-span-2 text-center py-14 text-gray-400">
            No tasks yet — add one to get started.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold text-gray-800 leading-snug">
                  {task.title}
                </h2>
                <StatusBadge status={task.status} />
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">
                {task.description}
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-auto">
                <DeleteModal task={task} />
                <UpdateModal task={task} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Mobile list (< sm) ── */}
      <div className="flex sm:hidden flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-center py-14 text-gray-400">
            No tasks yet — add one to get started.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-sm font-semibold text-gray-800 leading-snug">
                  {task.title}
                </h2>
                <StatusBadge status={task.status} />
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                {task.description}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <DeleteModal task={task} />
                <UpdateModal task={task} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}   