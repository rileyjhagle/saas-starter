"use client";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Form, useZodForm } from "@/components/application/form";
import { updateUserAction } from "@/layers/presentation/user/action";
import { UpdateUserSchema } from "@/layers/data-transfer/user/schema";
import toast from "react-hot-toast";
import { Controller } from "react-hook-form";
import { type User } from "@prisma/client";

export default function SettingsForm({
  id,
  email,
  name,
  bio,
  showEmail,
}: User) {
  const form = useZodForm({
    schema: UpdateUserSchema,
    defaultValues: {
      id,
      name,
      email: email ?? "",
      bio,
      showEmail,
    },
  });

  return (
    <Form
      form={form}
      handleSubmit={async (values) => {
        try {
          await updateUserAction(values);
          toast.success("User updated successfully");
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Failed to update user");
        }
      }}
    >
      <FieldGroup>
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>User Name</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Field>
              <Input
                {...form.register("name")}
                aria-label="User Name"
                name="name"
              />
            </Field>
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>User Bio</Subheading>
            <Text>
              This will be displayed on your public profile. Maximum 240
              characters.
            </Text>
          </div>
          <div>
            <Field>
              <Textarea
                {...form.register("bio")}
                aria-label="Organization Bio"
                name="bio"
              />
            </Field>
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>User Email</Subheading>
            <Text>This is how customers can contact you for support.</Text>
          </div>
          <div className="space-y-4">
            <Field>
              <Input
                {...form.register("email")}
                type="email"
                aria-label="User Email"
                name="email"
              />
            </Field>
            <CheckboxField>
              <Controller
                name="showEmail"
                control={form.control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Checkbox
                    id="showEmail"
                    onChange={(value) => {
                      onChange(value);
                    }}
                    onBlur={onBlur}
                    defaultChecked={value}
                  />
                )}
              ></Controller>
              <Label>Show email on public profile</Label>
            </CheckboxField>
          </div>
        </section>

        <Divider className="my-10" soft />
        <div className="flex justify-end gap-4">
          <Button disabled={!form.formState.isDirty} type="submit">
            Save changes
          </Button>
        </div>
      </FieldGroup>
    </Form>
  );
}
