import { Form, type UseZodForm } from "@/components/application/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/ui/fieldset";
import { z } from "zod";
import { type SubmitHandler } from "react-hook-form";

export const validationSchema = z.object({
  name: z.string().min(1),
});

function AddRecordForm({
  form,
  handleSubmit,
}: {
  form: UseZodForm<{ name: string }>;
  handleSubmit: SubmitHandler<{
    name: string;
  }>;
}) {
  return (
    <>
      <Form form={form} handleSubmit={handleSubmit}>
        <Fieldset className="pt-4">
          <Legend>Record Details</Legend>
          <Text>Provide the subject and details of your new record.</Text>
          <FieldGroup className="">
            <Field>
              <Label>name</Label>
              <Input {...form.register("name")} />
              <ErrorMessage>{form.formState.errors.name?.message}</ErrorMessage>
            </Field>
            {/* <Field>
              <Label>Text</Label>
              <Textarea {...form.register("text")} />
              <ErrorMessage>{form.formState.errors.text?.message}</ErrorMessage>
            </Field> */}
          </FieldGroup>
        </Fieldset>
      </Form>
    </>
  );
}

export default AddRecordForm;
