"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddRecordForm, { validationSchema } from "./form";
import { api as trpc } from "@/trpc/react";
import { useZodForm, SubmitButton } from "@/components/application/form";

function AddRecordButton() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useZodForm({
    schema: validationSchema,
    defaultValues: {
      name: "",
    },
  });
  const utils = trpc.useUtils().post;
  const mutation = trpc.post.create.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      setIsOpen(false);
    },
  });
  async function handleSubmit(values: { name: string }) {
    await mutation.mutateAsync(values);
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add Record
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Record</DialogTitle>
        <DialogBody>
          <AddRecordForm form={form} handleSubmit={handleSubmit} />
        </DialogBody>
        <DialogActions>
          <SubmitButton form={form}>Add Record</SubmitButton>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AddRecordButton;
