"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  Card,
} from "@heroui/react";
import Link from "next/link";

import React from "react";
import { toast } from "react-hot-toast";

const AddTasksPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      // Collects only the 3 fields: title, description, and status
      const taskData = Object.fromEntries(formData.entries());

      console.log(taskData);

      const toastId = toast.loading("Adding task...");

      const res = await fetch(
        "https://todo-app-server-peach.vercel.app/api/tasks",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskData),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Task added successfully!", {
          id: toastId,
        });

        e.target.reset();
      } else {
        toast.error(data?.message || "Failed to add Task", {
          id: toastId,
        });
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Card>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 p-10 pb-0">
          Add Task
        </h1>
        <form className="p-10 space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-8">
            {/* Title Field */}
            <TextField name="title" isRequired>
              <Label>Title</Label>
              <Input
                placeholder="Enter Task Title"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            {/* Description Field */}
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea
                placeholder="Write Task Details..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>

            {/* Status Field */}
            <Select
              name="status"
              isRequired
              className="w-full"
              placeholder="Select status"
            >
              <Label>Status</Label>

              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="To Do" textValue="To Do">
                    To Do
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item id="In Progress" textValue="In Progress">
                    In Proress
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item id="Pending" textValue="Pending">
                    Pending
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outline"
            className="rounded-none w-full bg-blue-400 text-white"
          >
            Add Task
          </Button>

          <Link href={"/"}>
            <Button variant="outline" className="rounded-none w-full">
              Back To Home
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default AddTasksPage;
