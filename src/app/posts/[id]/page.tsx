import {
  CalendarIcon,
  ChevronLeftIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Subheading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Code, Text } from "@/components/ui/text";
import { type RouterOutputs } from "@/trpc/react";
import { getPostAction } from "@/layers/presentation/post/action";
import { notFound } from "next/navigation";

type PostByIdOutput = RouterOutputs["post"]["byId"];

function PostItem(props: { post: PostByIdOutput }) {
  const { post } = props;
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-4">
        <Heading>{post.name}</Heading>
        <Badge color="lime">{"New"}</Badge>
      </div>

      <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <UserCircleIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
            <span>FrostyDog</span>
          </span>
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
            <span>{post.updatedAt.toLocaleDateString("en-us")}</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Button plain>
            <TrashIcon></TrashIcon>
          </Button>
          {/* <EditButton post={post}>Edit</EditButton> */}
        </div>
      </div>

      <Text className="break-all py-4">{}</Text>

      <Subheading className="text-2xl/10" level={3}>
        Raw data:
      </Subheading>
      <Code className="max-w-xl overflow-x-scroll text-wrap">
        {JSON.stringify(post, null, 2)}
      </Code>
    </div>
  );
}

export default async function PostPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  const [post, error] = await getPostAction({ id: Number(id) });

  if (error) {
    // Handle the error, e.g., update state or display an error message
    return notFound();
  }

  return (
    <div className="">
      <div className="">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Posts
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        {post ? <PostItem post={post} /> : null}
      </div>
    </div>
  );
}
