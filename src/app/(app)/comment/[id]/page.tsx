// REVIEWED - 01

import { ArrowLeftIcon, CornerDownRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getComment } from "@/actions/comments";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { PageCommentItem } from "../item";

const Navigation = function Navigation({
  on,
  parent,
}: {
  on: { title: string; link: string };
  parent: { title: string; link: string } | null;
}) {
  return (
    <ul className="grid max-w-96 grid-cols-1 items-center gap-5 md:grid-cols-2 lg:max-w-2xl">
      <li className="flex items-center justify-start">
        <Button
          variant="ghost"
          className="max-w-full p-0 text-muted-foreground hover:bg-transparent"
          asChild>
          <Link href={on.link}>
            <ArrowLeftIcon />
            <p className="truncate">
              Commented on <span className="text-foreground">{on.title}</span>
            </p>
          </Link>
        </Button>
      </li>
      {parent ? (
        <li className="flex items-center justify-start">
          <Button
            variant="ghost"
            className="max-w-full p-0 text-muted-foreground hover:bg-transparent">
            <CornerDownRightIcon />
            <p className="truncate">
              Replying to{" "}
              <span className="text-foreground">{parent.title}</span>
            </p>
          </Button>
        </li>
      ) : null}
    </ul>
  );
};

export default async function CommentPage(props: {
  params: Promise<{ id: string }>;
}) {
  // eslint-disable-next-line react/destructuring-assignment
  const params = await props.params;

  const comment = await getComment(parseInt(params.id, 10));

  if (
    !comment.data ||
    typeof comment.data.on.value === "number" ||
    typeof comment.data.parent === "number" ||
    comment.data.status !== "approved" ||
    comment.error
  )
    return redirect("/");

  return (
    <main className="relative">
      <Container className="relative h-24 w-full max-w-7xl lg:h-32">
        <div className="absolute left-5 top-0 h-full w-px bg-input lg:left-7" />
      </Container>
      <Separator className="mb-3 lg:mb-6" />
      <Container className="max-w-7xl">
        <Navigation
          on={{
            title:
              comment.data.on.relationTo === "diary-entries"
                ? comment.data.on.value.title
                : comment.data.on.value.title,
            link:
              comment.data.on.relationTo === "diary-entries"
                ? `/humans-but-from-gaza/${comment.data.on.value.id}`
                : `/blog/${comment.data.on.value.id}`,
          }}
          parent={
            comment.data.parent
              ? {
                  title: comment.data.parent.content,
                  link: `/comment/${comment.data.parent.id}`,
                }
              : null
          }
        />
      </Container>
      <Separator className="mb-12 mt-3 lg:mb-24 lg:mt-6" />
      <Container className="max-w-7xl">
        <PageCommentItem comment={comment.data} />
      </Container>
      <Footer />
    </main>
  );
}
