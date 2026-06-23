"use client";
import { toast } from "react-hot-toast";

import {AlertDialog, Button} from "@heroui/react";

export function DeleteModal({ task }) {
    const { title, _id } = task

   

const handleDelete = async () => {
  const toastId = toast.loading("Deleting Task...");

  try {
   

    const res = await fetch(
      `https://todo-app-server-peach.vercel.app/api/tasks/${_id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("task deleted successfully!", {
        id: toastId,
      });
    } else {
      toast.error(data?.message || "Failed to delete task", {
        id: toastId,
      });
    }

    console.log(data);
  } catch (error) {
    console.log(error);

    toast.error("Something went wrong", {
      id: toastId,
    });
  }
};
  return (
    <AlertDialog>
      <Button variant="danger">Delete task</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete this task permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{title}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Task
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}