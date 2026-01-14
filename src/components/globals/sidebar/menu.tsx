"use client";

// REVIEWED - 09

import {
  ArrowRightLeftIcon,
  BookCheckIcon,
  BookCopyIcon,
  BookOpenIcon,
  BookTextIcon,
  BrainIcon,
  BriefcaseBusinessIcon,
  BriefcaseIcon,
  CheckCheckIcon,
  CookieIcon,
  FileStackIcon,
  FileTextIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  MessagesSquareIcon,
  Package2Icon,
  PenLineIcon,
  ShieldCheckIcon,
  UserPenIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ElementType,
  Fragment,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRoom } from "@/hooks/use-room";
import { Room } from "@/payload-types";

const policies = [
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

export const icons: Record<string, ElementType> = {
  about: BookCopyIcon,
  experience: BriefcaseIcon,
  education: GraduationCapIcon,
  qualification: FileStackIcon,
  skills: BrainIcon,
  services: BriefcaseBusinessIcon,
  packages: Package2Icon,
  contact: MessagesSquareIcon,
};

const SidebarMenuMainItem = function SidebarMenuMainItem({
  isRoom,
  item,
  children,
  activeItemHash,
  setActiveItemHash,
}: PropsWithChildren & {
  isRoom?: boolean;
  item: { icon: ElementType | undefined; href: string; label: string };
  activeItemHash?: string | null;
  // eslint-disable-next-line no-unused-vars
  setActiveItemHash?: (hash: string) => void;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = isRoom
    ? activeItemHash === item.href
    : pathname.includes(item.href);

  return (
    <SidebarMenuItem className="group-data-[collapsible_=_icon]:flex group-data-[collapsible_=_icon]:justify-center">
      <SidebarMenuButton
        asChild
        tooltip={item.label}
        isActive={isActive}
        onClick={() => {
          if (isRoom) if (setActiveItemHash) setActiveItemHash(item.href);

          setOpenMobile(false);
        }}
        className="relative overflow-visible text-muted-foreground hover:bg-sidebar hover:text-sidebar-primary active:bg-sidebar active:font-medium active:text-sidebar-primary data-[active_=_true]:bg-sidebar data-[active_=_true]:text-sidebar-primary data-[active_=_true]:after:absolute data-[active_=_true]:after:-left-2 data-[active_=_true]:after:top-0 data-[active_=_true]:after:h-full data-[active_=_true]:after:w-px data-[active_=_true]:after:bg-sidebar-primary group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_2rem)] group-data-[collapsible_=_icon]:!p-0 group-data-[collapsible_=_icon]:data-[active_=_true]:after:-left-4">
        <Link href={item.href}>
          {item.icon ? (
            <div className="flex aspect-square size-5 items-center justify-center group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_2rem)]">
              <item.icon className="!size-5 stroke-[1.5]" />
            </div>
          ) : null}
          <span className="capitalize">{item.label}</span>
          {children}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const SidebarMainMenu = function SidebarMainMenu({
  roomList,
}: {
  roomList: Room[];
}) {
  const { isRoom, roomActive } = useRoom(roomList);
  const [activeItemHash, setActiveItemHash] = useState<string | null>(null);

  useEffect(() => {
    if (isRoom) setActiveItemHash(window.location.hash || null);
    else setActiveItemHash(null);
  }, [isRoom, roomActive]);

  const menus =
    roomActive && roomActive.links && roomActive.links.length !== 0
      ? [
          {
            label: "Sections",
            links: roomActive.links,
          },
          ...policies,
        ]
      : [
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
                icon: BookTextIcon,
                href: "/blogs",
                label: "The Riwaq",
              },
              {
                icon: HeartHandshakeIcon,
                href: "/support-us",
                label: "Support Us",
              },
            ],
          },
          ...policies,
        ];

  return (
    <Fragment>
      {menus.map((menu) => (
        <SidebarGroup key={menu.label}>
          <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>
          <SidebarMenu className="gap-1.5">
            {menu.links.map((link) => (
              <SidebarMenuMainItem
                key={link.href}
                isRoom={isRoom}
                item={{
                  ...link,
                  icon:
                    "icon" in link
                      ? link.icon
                      : icons[link.label.toLowerCase()] || FileTextIcon,
                }}
                activeItemHash={isRoom ? activeItemHash : undefined}
                setActiveItemHash={isRoom ? setActiveItemHash : undefined}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
      <div />
    </Fragment>
  );
};
