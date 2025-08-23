"use client";

// REVIEWED - 01

import {
  ArrowRightLeftIcon,
  BookCheckIcon,
  BookOpenIcon,
  CheckCheckIcon,
  CookieIcon,
  HeartHandshakeIcon,
  PenLineIcon,
  ShieldCheckIcon,
  UserPenIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, Fragment, PropsWithChildren } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const menus = [
  {
    label: "Pages",
    links: [
      {
        icon: BookOpenIcon,
        href: "/a-human-but-from-gaza",
        label: "A Human But From Gaza",
      },
      {
        icon: PenLineIcon,
        href: "/humans-but-from-gaza",
        label: "Humans But From Gaza",
      },
      {
        icon: UserPenIcon,
        href: "/about-us",
        label: "About Us",
      },
      {
        icon: HeartHandshakeIcon,
        href: "/support-us",
        label: "Support Us",
      },
    ],
  },
  {
    label: "Policies",
    links: [
      {
        icon: BookCheckIcon,
        href: "/acceptable-use-policy",
        label: "Acceptable Use Policy",
      },
      {
        icon: CookieIcon,
        href: "/cookie-policy",
        label: "Cookie Policy",
      },
      {
        icon: ShieldCheckIcon,
        href: "/privacy-policy",
        label: "Privacy Policy",
      },
      {
        icon: ArrowRightLeftIcon,
        href: "/returns-policy",
        label: "Returns Policy",
      },
      {
        icon: CheckCheckIcon,
        href: "/terms-of-service",
        label: "Terms of Service",
      },
    ],
  },
];

const SidebarMenuMainItem = function SidebarMenuMainItem({
  item,
  children,
}: PropsWithChildren & {
  item: { icon: ElementType; href: string; label: string };
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem className="group-data-[collapsible_=_icon]:flex group-data-[collapsible_=_icon]:justify-center">
      <SidebarMenuButton
        asChild
        tooltip={item.label}
        isActive={pathname.startsWith(item.href)}
        onClick={() => setOpenMobile(false)}
        className="relative overflow-visible text-muted-foreground hover:bg-sidebar hover:text-sidebar-primary active:bg-sidebar active:font-medium active:text-sidebar-primary data-[active_=_true]:bg-sidebar data-[active_=_true]:text-sidebar-primary data-[active_=_true]:after:absolute data-[active_=_true]:after:-left-2 data-[active_=_true]:after:top-0 data-[active_=_true]:after:h-full data-[active_=_true]:after:w-px data-[active_=_true]:after:bg-sidebar-primary group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_2rem)] group-data-[collapsible_=_icon]:!p-0 group-data-[collapsible_=_icon]:data-[active_=_true]:after:-left-4">
        <Link href={item.href}>
          {item.icon ? (
            <div className="flex aspect-square size-5 items-center justify-center group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_2rem)]">
              <item.icon className="!size-5 stroke-[1.5]" />
            </div>
          ) : null}
          <span>{item.label}</span>
          {children}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const SidebarMainMenu = function SidebarMainMenu() {
  return (
    <Fragment>
      {menus.map((menu) => (
        <SidebarGroup key={menu.label}>
          <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>
          <SidebarMenu className="gap-1.5 group-data-[collapsible_=_icon]:gap-1">
            {menu.links.map((link) => (
              <SidebarMenuMainItem key={link.href} item={link} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
      <div />
    </Fragment>
  );
};
