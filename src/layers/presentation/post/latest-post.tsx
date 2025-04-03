"use client";

import { api } from "@/trpc/react";
import { Form, useZodForm } from "@/components/application/form";
import { CreatePostSchema } from "@/layers/data-transfer/post/schema";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Each form should have a corresponding server-side action for handling saving the form data
import { createPostAction } from "./action";
import toast from "react-hot-toast";
import { Link } from "@/components/ui/link";
import { TextLink } from "@/components/ui/text";

// LatestPost React Component
export function LatestPost() {
  // Load the most recent post from the API
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  // Setup data fetching utilities to reload the data after a post is created
  const trpcUtils = api.useUtils();

  // Setup our form for submitting new posts to the backend
  const form = useZodForm({
    // Use the create post schema to validate the data in the form
    schema: CreatePostSchema,
  });

  // Render the component
  return (
    <div className="w-full max-w-xs">
      {/* If latest post has been fetched, let's display it */}
      {latestPost ? (
        <p>
          Your most recent post:{" "}
          <TextLink className="truncate" href={`/posts/${latestPost.id}`}>
            {latestPost.name}
          </TextLink>
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      {/* Form for creating new posts */}
      <Form
        className="mt-10 flex flex-col gap-2"
        // Pass in the form we setup in the component
        form={form}
        // Handle the form being submitted when the user clicks submit
        handleSubmit={async (values) => {
          // Try to create the post using the createPostAction
          try {
            await createPostAction(values);
            // If the post is created successfully, invalidate the cache
            // to reload the current page and show 'the new latest' post
            await trpcUtils.post.invalidate();
            // Show a success message to the user
            toast.success("Post created");
            // Reset the fields in the form
            form.reset();
          } catch (error) {
            // If there was an error creating the post, log the error
            if (error instanceof Error) {
              console.error(error.message);
            }
            // Show an error message to the user so they know it failed
            toast.error("Failed to create post");
          }
        }}
      >
        {/* Field groups handle the layout of the form ui for us */}
        <FieldGroup>
          {/* Create a field with an input and a label */}
          <Field>
            <Label htmlFor="name">Post Title</Label>
            {/* Register the input with the form so the submit function knows which field this input is (i.e. name) */}
            <Input
              {...form.register("name")}
              id="name"
              type="text"
              placeholder="Title"
            />
          </Field>
        </FieldGroup>
        {/* Our submit button to handle when the user is ready to save the form */}
        <Button
          // Handle disabling the button during submit or when the form is not dirty
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          type="submit"
        >
          {/* Show different text based on the form's state of submitting */}
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
