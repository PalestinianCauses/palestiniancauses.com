// REVIEWED - 02
import { Fragment } from "react";

export const polygon =
  "polygon(73% 51%, 91% 11%, 100% 46%, 97% 82%, 92% 84%, 75% 64%, 55% 47%, 46% 49%, 45% 62%, 50% 87%, 21% 64%, 0% 100%, 5% 51%, 21% 63%, 58% 0%, 73% 51%)";

export const HeroBackgroundPattern = function HeroBackgroundPattern() {
  return (
    <Fragment>
      <svg
        aria-hidden="true"
        className="fixed inset-0 -z-10 size-full stroke-foreground/10 [mask-image:radial-gradient(100%_100%_at_top_right,_white,_transparent)]">
        <defs>
          <pattern
            id="hero-background-pattern"
            x="50%"
            y={-1}
            width={200}
            height={200}
            patternUnits="userSpaceOnUse">
            <path fill="none" d="M.5 200V.5H200" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-border/20">
          <path
            strokeWidth={0}
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          />
        </svg>
        <rect
          fill="url(#hero-background-pattern)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div
        aria-hidden="true"
        className="fixed left-[calc(50%_-_4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%_-_18rem)] lg:left-48 lg:top-[calc(50%_-_30rem)] xl:left-[calc(50%_-_24rem)]">
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-secondary/90 via-secondary/10 to-secondary/50"
          style={{ clipPath: polygon }}
        />
      </div>
    </Fragment>
  );
};
