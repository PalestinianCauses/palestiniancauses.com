// REVIEWED - 01

import { Fragment } from "react";

import { SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

import { SidebarMainMenu } from "./menu";
import { WebsiteSwitcher } from "./website-switcher";

export const SidebarContentPreFetch = async function SidebarContentPreFetch() {
  const response = await actionSafeExecute(
    payload.find({
      collection: "rooms",
      select: {
        id: true,
        user: true,
        name: true,
        slug: true,
        information: { photograph: true },
        links: true,
      },
      depth: 1,
    }),
    messages.actions.room.serverError,
  );

  if (!response.data || response.error) return null;

  return (
    <Fragment>
      <SidebarHeader>
        <WebsiteSwitcher roomList={response.data.docs} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainMenu roomList={response.data.docs} />
      </SidebarContent>
    </Fragment>
  );
};
