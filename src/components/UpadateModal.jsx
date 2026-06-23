"use client";

import { useState } from "react";
import { Pencil } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { Button, Select, Label, ListBox, Modal, Surface } from "@heroui/react";

const statuses = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

export function UpdateModal({ task }) {
  const { _id } = task || {};

  const [selectedStatus, setSelectedStatus] = useState(
    () => task?.status || "",
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!_id) {
      toast.error("Task ID is missing!");
      return;
    }

    const dataToSend = { status: selectedStatus };
    console.log(dataToSend);

    try {
      const promise = fetch(`http://localhost:5000/api/tasks/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to update");
        }
        return res;
      });

      const res = await toast.promise(promise, {
        loading: "Updating...",
        success: "Updated successfully!",
        error: (err) => err.message || "Failed to update",
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

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
                    Update the status.
                  </p>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="max-h-[80vh] overflow-y-auto bg-default-50/40">
              <Surface
                variant="default"
                className="rounded-none bg-transparent shadow-none"
              >
                <form
                  id="update-form"
                  className="space-y-6 p-8"
                  onSubmit={onSubmit}
                >
                  <div className="space-y-6">
                    <div>
                      <Select
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        className="w-full"
                      >
                        <Label>Status</Label>

                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            {statuses.map((status) => (
                              <ListBox.Item
                                key={status.value}
                                id={status.value}
                                textValue={status.label}
                              >
                                {status.label}
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
                <Button slot="close" variant="secondary" className="rounded-xl">
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
