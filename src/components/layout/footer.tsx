// REVIEWED
import Image from "next/image";
import Link from "next/link";

import { Container } from "../globals/container";
import { Button } from "../ui/button";

const navigation = {
  company: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About (Coming Soon)",
      href: "/",
    },
    {
      name: "Book",
      href: "/book",
    },
  ],
  legal: [
    {
      name: "Acceptable Use Policy",
      href: "/acceptable-use-policy",
    },
    {
      name: "Cookie Policy",
      href: "/cookie-policy",
    },
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      name: "Returns Policy",
      href: "/returns-policy",
    },
    {
      name: "Terms of Service",
      href: "/terms-of-service",
    },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://instagram.com/palestiniancauses",
    },
    {
      name: "GitHub",
      href: "https://github.com/palestiniancauses",
    },
  ],
  contact: [
    {
      name: "Email",
      href: "mailto:hello@palestiniancauses.com",
    },
  ],
};

export const Footer = function Footer() {
  return (
    <footer id="footer" data-section="footer">
      <div className="relative z-10 pt-16 sm:pt-24 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="font-stretch mt-2 text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              Passionate and Creative Individuals United By One Mission.
            </h2>
            <p className="mx-auto mt-6 text-pretty text-lg/8 text-muted-foreground">
              PalestinianCauses LLC is dedicated to sharing authentic
              Palestinian stories, promoting innovation, and creating a platform
              showcasing Palestinian expertise.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                variant="tertiary-2"
                disabled
                className="pointer-events-none italic opacity-50">
                About us (coming soon)
              </Button>
            </div>
          </div>
        </Container>
        <div className="relative mt-24 border-t border-foreground/5 bg-muted/5 py-12">
          <Container className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="flex flex-col items-start justify-center">
              <Image
                src="/pc-logo-primary-foreground.png"
                alt="PalestinianCauses Logo"
                sizes="2rem"
                fill
                className="!static !h-auto !w-16 object-cover"
              />
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                PalestinianCauses <span className="text-tertiary-2">.</span>
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                PalestinianCauses is a brand owned by PalestinianCauses LLC.
                Registered in the United States.
              </p>
              <address className="mt-4 text-sm/6 not-italic text-muted-foreground">
                30 N Gould St Ste R Sheridan, WY 82801.
              </address>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-foreground">
                    Company
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.company.map((element) => (
                      <li key={element.name}>
                        <Link
                          href={element.href}
                          className="text-sm/6 text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground">
                          {element.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-foreground">
                    Legal
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.legal.map((element) => (
                      <li
                        key={element.name}
                        className="text-sm/6 text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground">
                        <Link href={element.href}>{element.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-foreground">
                    Contact
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.contact.map((element) => (
                      <li key={element.name}>
                        <Link
                          href={element.href}
                          className="text-sm/6 text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground">
                          {element.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-foreground">
                    Social
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.social.map((element) => (
                      <li key={element.name}>
                        <Link
                          href={element.href}
                          className="text-sm/6 text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground">
                          {element.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="border-t border-foreground/5 bg-muted/10 py-8 md:flex md:items-center md:justify-between">
          <Container>
            <p className="mt-8 text-center text-sm/6 tracking-wide text-muted-foreground md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} PalestinianCauses LLC. All
              Rights Reserved.
            </p>
          </Container>
        </div>
      </div>
    </footer>
  );
};
