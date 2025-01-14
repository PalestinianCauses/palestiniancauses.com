// REVIEWED
import Link from "next/link";

import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Container } from "@/components/globals/container";
import { Button } from "@/components/ui/button";

export default function CookiePolicyPage() {
  return (
    <main className="relative py-48">
      <HeroBackgroundPattern />
      <Container>
        <section
          id="cookie-policy"
          data-section="cookie-policy"
          className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <h1
              className="font-stretch text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              PalestinianCauses LLC Cookie Policy.
            </h1>
          </div>
          <div className="flex flex-col gap-10 text-lg/9 text-muted-foreground">
            <p>Effective Date: January 9, 2025</p>
            <p>
              We use cookies to help improve your experience of our website at{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="https://palestiniancauses.com">
                    palestiniancauses.com
                  </Link>
                </Button>
              </span>
              . This cookie policy is part of PalestinianCauses LLC&apos;s
              privacy policy. It covers the use of cookies between your device
              and our site.
            </p>
            <p>
              We also provide basic information on third-party services we may
              use, who may also use cookies as part of their service. This
              policy does not cover their cookies.
            </p>
            <p>
              If you don&apos;t wish to accept cookies from us, you should
              instruct your browser to refuse cookies from{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="https://palestiniancauses.com">
                    palestiniancauses.com
                  </Link>
                </Button>
              </span>
              . In such a case, we may be unable to provide you with some of
              your desired content and services.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              What is a cookie?
            </h2>
            <p>
              A cookie is a small piece of data that a website stores on your
              device when you visit. It typically contains information about the
              website itself, a unique identifier that allows the site to
              recognize your web browser when you return, additional data that
              serves the cookie&apos;s purpose, and the cookie&apos;s lifespan.
            </p>
            <p>
              Cookies are used to enable certain features (e.g., logging in),
              track site usage (e.g., analytics), store your user settings
              (e.g., time zone, notification preferences), and personalize your
              content (e.g., advertising, language).
            </p>
            <p>
              Cookies set by the website you visit are usually called
              first-party cookies. They typically only track your activity on
              that particular site.
            </p>
            <p>
              Cookies set by other sites and companies (i.e., third parties) are
              called third-party cookies. They can track you on other websites
              that use the same third-party service.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              How Can You Control Our Website&apos;s Use of Cookies?
            </h2>
            <p>
              You can decide whether to accept or reject cookies on our website.
              You can manage your cookie preferences in our Cookie Consent
              Manager. The Cookie Consent Manager allows you to select which
              categories of cookies you accept or reject. Essential cookies
              cannot be dismissed as they are strictly necessary to provide you
              with the services on our website.
            </p>
            <p>
              You can also set or amend your cookie preferences by managing your
              web browser settings. As each web browser is different, please
              consult the instructions provided by your web browser (typically
              in the &ldquo;help&ldquo; section). You may still use the website
              if you refuse to use it or turn off cookies. However, some of its
              functionality may not be available to you.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              How Often Will We Update This Cookie Policy?
            </h2>
            <p>
              We may update this Cookie Policy occasionally to reflect any
              changes to the cookies and related technologies we use or for
              other operational, legal, or regulatory reasons.
            </p>
            <p>
              Each time you use our website, the current version of the Cookie
              Policy will apply. When you use our website, you should check the
              date of this Cookie Policy (which appears at the top of this
              document) and review any changes since the last version.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Where Can You Obtain Further Information?
            </h2>
            <p>
              For any questions or concerns regarding our Cookie Policy, you may
              contact us using the following details:
            </p>
            <p>
              PalestinianCauses resolution team{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="mailto:hello@palestiniancauses.com">
                    hello@palestiniancauses.com
                  </Link>
                </Button>
              </span>
              .
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
