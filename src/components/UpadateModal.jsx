"use client";

import { Pencil } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import {
  Button,
  Select,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextField,
  TextArea,
} from "@heroui/react";

// Define the 3 status options
const statuses = ["To Do", "In Progress", "Done"];

// Changed prop name from 'facility' to 'item' (or 'task') for better context
export function UpdateModal({ tasks }) {
  const { status, _id } = tasks || {};

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    
    // Extract ONLY the 3 required fields
    const dataToSend = {
      
      status: formData.get("status"),
    };

    

   try {
  // fetch রিজলভ হওয়ার পর res.ok চেক করার জন্য .then() ব্যবহার করা হয়েছে
  const promise = fetch(`http://localhost:5000/api/tasks/${_id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  }).then(async (res) => {
    if (!res.ok) {
      // সার্ভার এরর (4xx, 5xx) হলে থ্রো করবে, যাতে toast.promise এটি ধরতে পারে
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update");
    }
    return res;
  });

  // toast.promise নিজেই সাকসেস বা এরর মেসেজ দেখাবে
  const res = await toast.promise(promise, {
    loading: "Updating...",
    success: "Updated successfully!",
    error: (err) => err.message || "Failed to update", // ডাইনামিক এরর মেসেজ দেখাবে
  });

  const data = await res.json();
  console.log(data);
  
} catch (error) {
  console.error("Update failed:", error);
  // এখানে আর toast.error দেওয়ার দরকার নেই, কারণ toast.promise ইতিমধ্যে ইউজারকে এরর মেসেজ দেখিয়েছে।
}
  return (
    <Modal>
      <Button
        variant="outline"
        className="rounded-xl border border-default-200 hover:bg-default-100"
      >
        <Pencil className="size-4" />
        Edit Status
      </Button>

      <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
        <Modal.Container placement="center">
          {/* Reduced max-width since the form is much smaller now */}
          <Modal.Dialog className="w-full max-w-2xl rounded-3xl overflow-hidden border border-default-200 bg-background shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="border-b border-default-100 px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Pencil className="size-5" />
                </div>
                <div>
                  <Modal.Heading className="text-2xl font-bold">
                    Edit Item
                  </Modal.Heading>
                  <p className="text-sm text-default-500 mt-1">
                    Update the title, description, and status.
                  </p>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="max-h-[80vh] overflow-y-auto bg-default-50/40">
              <Surface
                variant="default"
                className="rounded-none bg-transparent shadow-none"
              >
                <form id="update-form" className="space-y-6 p-8" onSubmit={onSubmit}>
                  <div className="space-y-6">
                    
                   

                    {/* 2. Status Field */}
                    <div>
                      <Select
                        defaultValue={status}
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
                            {statuses.map((s) => (
                              <ListBox.Item key={s} id={s} textValue={s}>
                                {s}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                   

                  </div>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="border-t border-default-100 px-8 py-5">
              <div className="flex w-full justify-end gap-3">
                <Button
                  slot="close"
                  variant="secondary"
                  className="rounded-xl"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="update-form"
                  className="rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  Update
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}