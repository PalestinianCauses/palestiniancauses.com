// REVIEWED - 08

import { motions } from "@/lib/motion";
import { HumansButFromGazaPageLink } from "@/lib/utils/strings";

import { MotionSpan } from "./motion";
import { NavigationLink } from "./navigation-link";

export const navigation = [
  {
    label: "A Human But From Gaza",
    href: "/a-human-but-from-gaza",
    recent: false,
    coming: false,
  },
  {
    label: "Humans But From Gaza",
    href: HumansButFromGazaPageLink,
    recent: true,
    coming: false,
  },
  {
    label: "About Us",
    href: "/about-us",
    recent: true,
    coming: false,
  },
  {
    label: "Support Us",
    href: "/support",
    recent: false,
    coming: false,
  },
  {
    label: "Palestinian-Causes' Rooms",
    href: "/rooms",
    recent: false,
    coming: true,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    recent: false,
    coming: true,
  },
];

export const Navigation = function Navigation() {
  return (
    <ul className="grid snap-y snap-mandatory snap-start auto-rows-[calc(100vh/5)] grid-rows-[repeat(5,_calc(100vh/5))] divide-y divide-muted overflow-y-scroll lg:auto-rows-[calc(100vh/4)] lg:grid-rows-[repeat(4,_calc(100vh/4))] [@media_(max-height:48rem)]:snap-none [@media_(max-height:48rem)]:auto-rows-[calc(48rem/4)] [@media_(max-height:48rem)]:grid-rows-[repeat(4,_calc(48rem/4))]">
      {navigation.map(({ label, href, recent, coming }, index) => (
        <li
          key={href}
          className="flex w-full snap-start items-center justify-start overflow-hidden">
          <MotionSpan
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            whileHover="hover"
            transition={motions.transition({ delay: index * 0.1 })}
            className="h-full w-full">
            <NavigationLink href={href} recent={recent} coming={coming}>
              {label}
            </NavigationLink>
          </MotionSpan>
        </li>
      ))}
    </ul>
  );
};
