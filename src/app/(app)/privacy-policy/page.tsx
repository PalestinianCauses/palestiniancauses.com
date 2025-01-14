// REVIEWED
import Link from "next/link";

import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Container } from "@/components/globals/container";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative py-48">
      <HeroBackgroundPattern />
      <Container>
        <section
          id="privacy-policy"
          data-section="privacy-policy"
          className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <h1
              className="font-stretch text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              PalestinianCauses LLC Privacy Policy.
            </h1>
          </div>
          <div className="flex flex-col gap-10 text-lg/9 text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
            <p>
              Your privacy is important to us. PalestinianCauses LLC&apos;s
              policy is to respect your privacy and comply with applicable laws
              and regulations regarding any personal information we may collect
              about you, including our website,{" "}
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
              , and other sites we own and operate.
            </p>
            <p>
              Personal information can be used to identify you, including
              information about you as a person (such as name, address, and date
              of birth), your devices, payment details, and even information
              about how you use a website or online service.
            </p>
            <p>
              In the event our site contains links to third-party sites and
              services, please be aware that those sites and services have their
              privacy policies. After following a link to any third-party
              content, you should read their posted privacy policy information
              about how they collect and use personal information. This Privacy
              Policy does not apply to your activities after leaving our site.
            </p>
            <p>This policy is effective as of January 9, 2025</p>
            <p>Last updated: January 9, 2025</p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Information We Collect.
            </h2>
            <p>
              Information we collect falls into &ldquo;voluntarily
              provided&ldquo; and &ldquo;automatically collected&ldquo;
              information.
            </p>
            <p>
              &ldquo;Voluntarily provided&ldquo; refers to any information you
              knowingly and actively provide us when using or participating in
              our services and promotions.
            </p>
            <p>
              &ldquo;Automatically collected&ldquo; information refers to any
              information automatically sent by your devices while accessing our
              products and services.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Log Data.
            </h2>
            <p>
              When you visit our website, our servers may automatically log the
              standard data your web browser provides. It may include your
              device&apos;s Internet Protocol (IP) address, browser type and
              version, the pages you visit, the time and date of your visit, the
              time spent on each page, and other details about your visit.
            </p>
            <p>
              Additionally, you may encounter specific errors while using the
              site. In that case, we may automatically collect data about the
              error and the circumstances surrounding its occurrence. This data
              may include technical details about your device, what you tried to
              do when the error happened, and other technical information
              relating to the problem. You may or may not receive notice of such
              errors, even when they occur, that they have occurred, or the
              nature of the error.
            </p>
            <p>
              Please be aware that while this information may not be personally
              identifying by itself, it may be possible to combine it with other
              data to identify individual persons personally.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Device Data.
            </h2>
            <p>
              When you visit our website or interact with our services, we may
              automatically collect data about your device, such as:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>Device type.</li>
              <li>Operating system.</li>
              <li>Unique device identifiers.</li>
            </ol>
            <p>
              The data we collect can depend on the individual settings of your
              device and software. We recommend checking your device
              manufacturer&apos;s or software provider&apos;s policies to learn
              what information they make available to us.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Personal Information.
            </h2>
            <p>
              We may ask for personal information — for example, when you submit
              content to us or when you contact us — which may include one or
              more of the following:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>Name.</li>
              <li>Email.</li>
              <li>Social media profiles.</li>
              <li>Phone/mobile number.</li>
              <li>Home/mailing address.</li>
            </ol>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              User-Generated Content.
            </h2>
            <p>
              We consider &ldquo;user-generated content&ldquo; materials (text,
              image, and/or video content) voluntarily supplied by our users for
              publication on our website or re-publishing on our social media
              channels. All user-generated content is associated with the
              account or email address used to submit the materials.
            </p>
            <p>
              Please be aware that any content you submit for publication will
              be public after posting (and subsequent review or vetting
              process). Once published, it may be accessible to third parties
              not covered under this privacy policy.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Legitimate Reasons for Processing Your Personal Information
            </h2>
            <p>
              We only collect and use your personal information for legitimate
              reasons. In this instance, we only collect personal information
              that is reasonably necessary to provide our services to you.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Collection and Use of Information.
            </h3>
            <p>
              We may collect personal information from you when you do any of
              the following on our website:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>Register for an account.</li>
              <li>
                Sign up to receive updates from us via email or social media
                channels.
              </li>
              <li>
                Post a comment or review or otherwise participate in our online
                community.
              </li>
              <li>Use a mobile device or web browser to access our content.</li>
              <li>
                Contact us via email, social media, or any similar technologies.
              </li>
              <li>When you mention us on social media.</li>
            </ol>
            <p>
              We may collect, hold, use, and disclose information for the
              following purposes, and personal data will not be further
              processed in a manner that is incompatible with these purposes:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                To provide you with our platform&apos;s core features and
                services.
              </li>
              <li>
                To enable you to customize or personalize your experience of our
                website.
              </li>
              <li>To contact and communicate with you.</li>
              <li>
                For analytics, market research, and business development,
                including operating and improving our website, associated
                applications, and social media platforms.
              </li>
              <li>
                For advertising and marketing, we will send you promotional
                information about our products and services and information
                about third parties that may interest you.
              </li>
              <li>
                To comply with our legal obligations and resolve any disputes
                that we may have.
              </li>
              <li>
                For technical assessment, including operating and improving our
                app, associated applications, and social media platforms.
              </li>
            </ol>
            <p>
              We may combine voluntarily provided and automatically collected
              personal information with general information or research data we
              receive from other trusted sources. For example, our marketing and
              market research activities uncover data and insights, which we can
              combine with information about how visitors use our site to
              improve it and your experience.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Security of Your Personal Information.
            </h3>
            <p>
              When we collect and process personal information and retain it, we
              will protect it within commercially acceptable means to prevent
              loss and theft, as well as unauthorized access, disclosure,
              copying, use, or modification.
            </p>
            <p>
              Although we will do our best to protect the personal information
              you provide to us, we advise that no method of electronic
              transmission or storage is 100% secure. No one can guarantee
              absolute data security.
            </p>
            <p>
              You are responsible for selecting any password and its overall
              security strength, ensuring the security of your information
              within the bounds of our services. For example, guaranteeing
              passwords to access your personal information and accounts are
              secure and confidential.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              How Long We Keep Your Personal Information.
            </h3>
            <p>
              We keep your personal information only for as long as we need to.
              This period may depend on what we use your information for by this
              privacy policy. For example, suppose you have provided us with
              personal information as part of creating an account. In that case,
              we may retain this information for your account on our system.
              Suppose your personal information is no longer required for this
              purpose. In that case, we will delete or make it anonymous by
              removing all details identifying you.
            </p>
            <p>
              However, if necessary, we may retain your personal information to
              comply with a legal, accounting, or reporting obligation or for
              archiving purposes in the public interest, scientific or
              historical research, or statistical purposes.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Children&apos;s Privacy.
            </h2>
            <p>
              We do not aim to sell any of our products or services directly to
              children under 13, and we do not knowingly collect personal
              information about children under 13.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Disclosure of Personal Information to Third Parties.
            </h2>
            <p>We may disclose personal information to:</p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>A parent, subsidiary, or affiliate of our company.</li>
              <li>
                Third-party service providers to enable them to provide their
                services, including (without limitation) IT service providers,
                data storage, hosting and server providers, ad networks,
                analytics, error loggers, debt collectors, maintenance or
                problem-solving providers, marketing providers, professional
                advisors, and payment systems operators.
              </li>
              <li>Our employees, contractors, and/or related entities.</li>
              <li>Our existing or potential agents or business partners.</li>
              <li>
                Credit reporting agencies, courts, tribunals, and regulatory
                authorities in the event you fail to pay for goods or services
                we have provided to you.
              </li>
              <li>
                Courts, tribunals, regulatory authorities, and law enforcement
                officers, as required by law, in connection with any actual or
                prospective legal proceedings or to establish, exercise, or
                defend our legal rights.
              </li>
              <li>
                Third parties, including agents or sub-contractors, assist us in
                providing you with information, products, services, or direct
                marketing.
              </li>
              <li>Third parties to collect and process data.</li>
              <li>
                An entity that buys or to which we transfer all or substantially
                all of our assets and business.
              </li>
            </ol>
            <p>Third parties we currently use include:</p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>Google Analytics.</li>
              <li>Open Web Analytics.</li>
              <li>Meta Pixel.</li>
              <li>MailChimp.</li>
            </ol>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Your Rights and Controlling Your Personal Information.
            </h2>
            <p>
              <strong>Your choice:</strong> By providing personal information to
              us, you understand we will collect, hold, use, and disclose your
              personal information by this privacy policy. You do not have to
              provide personal information to us. However, if you do not, it may
              affect your use of our website or the products and/or services
              offered on or through it.
            </p>
            <p>
              <strong>Information from third parties:</strong> If we receive
              personal information about you from a third party, we will protect
              it as set out in this privacy policy. Suppose you are a third
              party providing personal information about somebody else. In that
              case, you represent and warrant that you have such a person&apos;s
              consent to provide the personal information to us.
            </p>
            <p>
              <strong>Marketing permission:</strong> If you have previously
              agreed to use your personal information for direct marketing
              purposes, you may change your mind by contacting us using the
              details below.
            </p>
            <p>
              <strong>Access:</strong> You may request details of the personal
              information we hold about you.
            </p>
            <p>
              <strong>Correction:</strong> If you believe that any information
              we hold about you is inaccurate, out of date, incomplete,
              irrelevant, or misleading, don&apos;t hesitate to get in touch
              with us using the details provided in this privacy policy. We will
              take reasonable steps to correct any information found to be
              inaccurate, incomplete, misleading, or out of date.
            </p>
            <p>
              <strong>Non-discrimination:</strong> We will not discriminate
              against you for exercising your rights over your personal
              information. Unless your personal information is required to
              provide you with a particular service or offer (for example,
              providing user support), we will not deny you goods or services
              and/or charge you different prices or rates for goods or services,
              including through granting discounts or other benefits or imposing
              penalties, or provide you with a different level or quality of
              goods or services.
            </p>
            <p>
              <strong>Notification of data breaches:</strong> We will comply
              with laws concerning any data breach.
            </p>
            <p>
              <strong>Complaints:</strong> If you believe that we have breached
              a relevant data protection law and wish to make a complaint,
              don&apos;t hesitate to contact us using the details below and
              provide full details of the alleged breach. We will promptly
              investigate your complaint and respond to you in writing, setting
              out the outcome of our investigation and the steps we will take to
              deal with your complaint. You also have the right to contact a
              regulatory body or data protection authority about your complaint.
            </p>
            <p>
              <strong>Unsubscribe:</strong> To unsubscribe from our email
              database or opt out of communications (including marketing
              communications), don&apos;t hesitate to contact us using the
              details in this privacy policy or opt out using the opt-out
              facilities provided. We may request specific information from you
              to help us confirm your identity.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Use of Cookies.
            </h2>
            <p>
              We use &ldquo;cookies&ldquo; to collect information about you and
              your activity across our site. A cookie is a small piece of data
              that our website stores on your computer and accesses each time
              you visit so we can understand how you use our site. This helps us
              serve you content based on the preferences you have specified.
            </p>
            <p>Please refer to our Cookie Policy for more information.</p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Business Transfers.
            </h2>
            <p>
              If we or our assets are acquired, or in the unlikely event that we
              go out of business or enter bankruptcy, we would include data,
              including your personal information, among the assets transferred
              to any parties who acquire us. You acknowledge that such transfers
              may occur and that any parties who acquire us may, to the extent
              permitted by applicable law, continue to use your personal
              information according to this policy, which they will be required
              to assume as it is the basis for any ownership or use rights we
              have over such information.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Limits of Our Policy.
            </h2>
            <p>
              Our website may link to external sites that we do not operate.
              Please be aware that we have no control over the content and
              policies of those sites and cannot accept responsibility or
              liability for their respective privacy practices.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Changes to This Policy.
            </h2>
            <p>
              We may change our privacy policy to reflect updates to our
              business processes, current acceptable practices, or legislative
              or regulatory changes. Suppose we decide to change this privacy
              policy. In that case, we will post the changes here at the same
              link by which you are accessing this privacy policy.
            </p>
            <p>
              Suppose the changes are significant or required by applicable law.
              In that case, we will contact you (based on your selected
              preferences for communications from us) and all our registered
              users with the new details and links to the updated or changed
              policy.
            </p>
            <p>
              If required by law, we will get your permission or allow you to
              opt in to or opt out of, as applicable, any new uses of your
              personal information.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Additional Disclosures for General Data Protection Regulation
              (GDPR) Compliance (EU).
            </h2>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Data Controller / Data Processor.
            </h3>
            <p>
              The GDPR distinguishes between organizations that process personal
              information for their purposes (known as &ldquo;data
              controllers&ldquo;) and organizations that process personal
              information on behalf of other organizations (known as &ldquo;data
              processors&ldquo;). We, PalestinianCauses LLC, located at the
              address provided in our Contact Us section, are a Data Controller
              concerning the personal information you provide us.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Legal Bases for Processing Your Personal Information.
            </h2>
            <p>
              We will only collect and use your personal information when we
              have a legal right. In this case, we will collect and use your
              personal information lawfully, reasonably, and transparently.
              Suppose we seek your consent to process your personal information,
              and you are under 16. In that case, we will seek your parent or
              legal guardian&apos;s consent to process your personal information
              for that specific purpose.
            </p>
            <p>
              Our lawful bases depend on your services and how you use them.
              This means we only collect and use your information on the
              following grounds:
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Consent From You.
            </h3>
            <p>
              Where you give us consent to collect and use your personal
              information for a specific purpose, you may withdraw your consent
              at any time using the facilities we provide; however, this will
              not affect any use of your information that has already taken
              place. You may consent to provide your email address to receive
              marketing emails from us. While you may unsubscribe anytime, we
              cannot recall any email we sent. If you have any further inquiries
              about how to withdraw your consent, please feel free to enquire
              using the details provided in the Contact Us section of this
              privacy policy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Performance of a Contract or Transaction.
            </h3>
            <p>
              Suppose you contact us with an inquiry where you have entered into
              a contract or transaction with us or to take preparatory steps
              before we enter into a contract or transaction with you. In that
              case, we may require personal information such as your name and
              contact details to respond.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Our Legitimate Interests.
            </h3>
            <p>
              We assess it as necessary for our legitimate interests, such as
              providing, operating, improving, and communicating our services.
              We consider our legitimate interests to include research and
              development, understanding our audience, marketing and promoting
              our services, measures taken to operate our services efficiently,
              marketing analysis, and measures taken to protect our legal rights
              and interests.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Compliance with Law.
            </h3>
            <p>
              Sometimes, we may legally be obligated to use or keep your
              personal information. Such cases may include (but are not limited
              to) court orders, criminal investigations, government requests,
              and regulatory obligations. If you have any further inquiries
              about how we retain personal information to comply with the law,
              please feel free to enquire using the details provided in the
              Contact Us section of this privacy policy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              International Transfers Outside of the European Economic Area
              (EEA).
            </h3>
            <p>
              We will ensure that any transfer of personal information from
              countries in the European Economic Area (EEA) to countries outside
              the EEA will be protected by appropriate safeguards, for example,
              by using standard data protection clauses approved by the European
              Commission or the use of binding corporate rules or other legally
              accepted means.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Your Rights and Controlling Your Personal Information.
            </h2>
            <p>
              <strong>Restrict:</strong> You have the right to request that we
              restrict the processing of your personal information if (i) you
              are concerned about the accuracy of your personal information,
              (ii) you believe your personal information has been unlawfully
              processed, (iii) you need us to maintain the personal information
              solely for a legal claim, or (iv) we are in the process of
              considering your objection about processing based on legitimate
              interests.
            </p>
            <p>
              <strong>Objecting to processing:</strong> You have the right to
              object to processing your personal information based on your
              legitimate or public interests. If this is done, we must provide
              compelling, legitimate grounds for the processing, which overrides
              your interests, rights, and freedoms, to proceed with processing
              your personal information.
            </p>
            <p>
              <strong>Data portability:</strong> You may have the right to
              request a copy of the personal information we hold about you. We
              will provide this information in CSV or other easily readable
              machine formats. You may also have the right to request that we
              transfer this personal information to a third party.
            </p>
            <p>
              <strong>Deletion:</strong> You may have a right to request that we
              delete the personal information we hold about you at any time, and
              we will take reasonable steps to delete your personal information
              from our current records. Suppose you ask us to delete your
              personal information. In that case, we will let you know how the
              deletion affects your use of our website or products and services.
              There may be exceptions to this right for specific legal reasons,
              which, if applicable, we will set out for you in response to your
              request. If you terminate or delete your account, we will delete
              your personal information within 7 days of the deletion of your
              account. Please be aware that search engines and similar third
              parties may still retain copies of your personal information that
              has been made public at least once, like certain profile
              information and public comments, even after you have deleted the
              information from our services or deactivated your account.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Additional Disclosures for U.S. States Privacy Law Compliance.
            </h2>
            <p>
              The following section includes provisions that comply with the
              privacy laws of these states (California, Colorado, Delaware,
              Florida, Virginia, and Utah) and apply only to the residents of
              those states. Specific references to a particular state (in a
              heading or the text) only refer to that state&apos;s law and apply
              only to that state&apos;s residents. The non-state-specific
              language applies to all of the states listed above.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Do Not Track.
            </h2>
            <p>
              Some browsers have a &ldquo;Do Not Track&ldquo; feature that lets
              you tell websites you do not want your online activities tracked.
              We do not respond to browser &ldquo;Do Not Track&ldquo; signals.
            </p>
            <p>
              We adhere to the standards outlined in this privacy policy,
              ensuring we collect and process personal information lawfully,
              fairly, transparently, and with legitimate, legal reasons for
              doing so.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Cookies and Pixels.
            </h2>
            <p>
              You may always decline cookies from our site if your browser
              permits. Most browsers allow you to activate settings on your
              browser to refuse the setting of all or some cookies. Accordingly,
              your ability to limit cookies is based only on your browser&apos;s
              capabilities. Please refer to the Cookies section of this privacy
              policy for more information.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              California Privacy Laws – CPPA.
            </h2>
            <p>
              Under California Civil Code Section 1798.83, if you live in
              California and your business relationship with us is mainly for
              personal, family, or household purposes, you may ask us about the
              information we release to other organizations for their marketing
              purposes. By your right to non-discrimination, we may offer
              specific financial incentives permitted by the California Consumer
              Privacy Act and the California Privacy Rights Act (collectively,
              CCPA) that can result in different prices, rates, or quality
              levels for the goods or services we provide. Any CCPA-permitted
              financial incentive we offer will reasonably relate to the value
              of your personal information, and we will give written terms that
              describe clearly the nature of such an offer. Participation in a
              financial incentive program requires prior opt-in consent, which
              you may revoke at any time.
            </p>
            <p>
              Under California Civil Code Section 1798.83, if you live in
              California and your business relationship with us is mainly for
              personal, family, or household purposes, you may ask us about the
              information we release to other organizations for their marketing
              purposes. To make such a request, don&apos;t hesitate to contact
              us using the details provided in this privacy policy with
              &ldquo;Request for California privacy information&ldquo; in the
              subject line. You may make this request once every calendar year.
              We will email you a list of categories of personal information we
              revealed to other organizations for their marketing purposes in
              the last calendar year, along with their names and addresses. Not
              all personal information shared this way is covered by Section
              1798.83 of the California Civil Code.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              California Notice of Collection.
            </h2>
            <p>
              In the past 12 months, we have collected the following categories
              of personal information enumerated in the CCPA:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                Identifiers include name, email address, phone number, account
                name, IP address, and an ID or number assigned to your account.
              </li>
              <li>
                Audio or visual data, such as photos or videos you share with us
                or post on the service.
              </li>
              <li>Geolocation data.</li>
            </ol>
            <p>
              For more information on the information we collect, including the
              sources we receive information from, review the &ldquo;Information
              We Collect&ldquo; section. We collect and use these categories of
              personal information for the business purposes described in the
              &ldquo;Collection and Use of Information&ldquo; section, including
              providing and managing our Service.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Right to Know and Delete.
            </h2>
            <p>
              You have the right to delete the personal information we collected
              and know specific details about our data practices in the
              preceding 12 months. In particular, you have the right to request
              the following from us:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                The categories of personal information we have collected about
                you.
              </li>
              <li>
                The categories of sources from which the personal information
                was collected.
              </li>
              <li>
                We disclosed the categories of personal information about you
                for business purposes or sold.
              </li>
              <li>
                The categories of third parties to whom the personal information
                was disclosed for a business purpose or sold.
              </li>
              <li>
                The business or commercial purpose is to collect or sell
                personal information.
              </li>
              <li>
                The specific pieces of personal information we have collected
                about you.
              </li>
            </ol>
            <p>
              To exercise any of these rights, don&apos;t hesitate to contact us
              using the details provided in this privacy policy.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Shine the Light.
            </h2>
            <p>
              In addition to the rights discussed above, you can request
              information from us regarding how we share certain personal
              information as defined by applicable statutes with third parties
              and affiliates for their direct marketing purposes.
            </p>
            <p>
              To receive this information, send us a request using the contact
              details provided in this privacy policy. Requests must include
              &ldquo;Privacy Rights Request&ldquo; in the first line of the
              description and include your name, street address, city, state,
              and ZIP code.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Additional Disclosures for UK General Data Protection Regulation
              (UK GDPR) Compliance (UK).
            </h2>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Data Controller / Data Processor.
            </h3>
            <p>
              The GDPR distinguishes between organizations that process personal
              information for their purposes (known as &ldquo;data
              controllers&ldquo;) and organizations that process personal
              information on behalf of other organizations (known as &ldquo;data
              processors&ldquo;). For the purposes covered by this Privacy
              Policy, we are a Data Controller concerning the personal
              information you provide to us and remain compliant with our data
              controller obligations under GDPR.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Third-Party Provided Content.
            </h2>
            <p>
              We may indirectly collect your personal information from third
              parties with your permission to share it. For example, if you
              purchase a product or service from a business working with us,
              consent to us using your details to complete the transaction.
            </p>
            <p>
              We may also collect publicly available information about you, such
              as from any social media and messaging platforms you use. The
              availability of this information will depend on both the privacy
              policies and your privacy settings on such platforms.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Additional Disclosure for Collection and Use of Personal
              Information.
            </h2>
            <p>
              In addition to the aforementioned purposes warranting the
              collection and use of personal information, we may also conduct
              marketing and market research activities, including how visitors
              use our site, website improvement opportunities, and user
              experience.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Personal Information No Longer Required for Our Purposes.
            </h2>
            <p>
              If your personal information is no longer required for our stated
              purposes, or if you instruct us under your Data Subject Rights, we
              will delete it or make it anonymous by removing all details that
              identify you (&ldquo;Anonymisation&ldquo;). However, if necessary,
              we may retain your personal information to comply with a legal,
              accounting, or reporting obligation or for archiving purposes in
              the public interest, scientific or historical research, or
              statistical purposes.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Legal Bases for Processing Your Personal Information.
            </h2>
            <p>
              Data Protection and Privacy Laws permit us to collect and use your
              data on a limited number of grounds... In this case, we will
              collect and use your personal information lawfully, reasonably,
              and transparently. We never directly market to any person(s) under
              18 years of age.
            </p>
            <p>
              Our lawful bases depend on your services and how you use them.
              This is a non-exhaustive list of the lawful bases we use:
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Consent From You.
            </h3>
            <p>
              Where you give us consent to collect and use your personal
              information for a specific purpose, you may withdraw your consent
              at any time using the facilities we provide; however, this will
              not affect any use of your information that has already taken
              place. We assume your consent based on your positive contact
              action when you contact us. Therefore, your consent for your name
              and email address is required so we can respond to your inquiry.
            </p>
            <p>
              Where you agree to receive marketing communications from us, we
              will do so based solely on your indication of consent or until you
              instruct us not to, which you can do at any time.
            </p>
            <p>
              While you may request that we delete your contact details anytime,
              we cannot recall any email we have already sent. If you have any
              further inquiries about how to withdraw your consent, please feel
              free to enquire using the details provided in the Contact Us
              section of this privacy policy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Performance of a Contract or Transaction.
            </h3>
            <p>
              Suppose you contact us with an inquiry where you have entered into
              a contract or transaction with us or to take preparatory steps
              before we enter into a contract or transaction with you. In that
              case, we may require personal information such as your name and
              contact details to respond.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Our Legitimate Interests.
            </h3>
            <p>
              We assess it as necessary for our legitimate interests, such as
              providing, operating, improving, and communicating our services.
              We consider our legitimate interests to include research and
              development, understanding our audience, marketing and promoting
              our services, measures taken to operate our services efficiently,
              marketing analysis, and measures taken to protect our legal rights
              and interests.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Compliance with Law.
            </h3>
            <p>
              Sometimes, we may legally be obligated to use or keep your
              personal information. Such cases may include (but are not limited
              to) court orders, criminal investigations, government requests,
              and regulatory obligations. For example, we are required to keep
              financial records for 7 years. If you have any further inquiries
              about how we retain personal information to comply with the law,
              please feel free to enquire using the details provided in the
              Contact Us section of this privacy policy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              International Transfers of Personal Information.
            </h3>
            <p>
              The personal information we collect is stored and/or processed in
              the United Kingdom by us. Following an adequacy decision by the EU
              Commission, the UK has been granted an equivalent level of
              protection to that guaranteed under UK GDPR.
            </p>
            <p>
              Occasionally, we share your data with third parties, who may be
              based outside the UK or the European Economic Area
              (&ldquo;EEA&ldquo;). The countries where we store, process, or
              transfer your personal information may not have the same data
              protection laws as the country where you initially provided the
              information.
            </p>
            <p>
              If we transfer your personal information to third parties in other
              countries:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                We will perform those transfers according to the requirements of
                the UK GDPR (Article 45) and the Data Protection Act 2018.
              </li>
              <li>
                We will adopt appropriate safeguards for protecting the
                transferred data, including in transit, such as standard
                contractual clauses (&ldquo;SCCs&ldquo;) or binding corporate
                rules.
              </li>
            </ol>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Your Data Subject Rights.
            </h2>
            <p>
              <strong>Right to Restrict Processing:</strong> You have the right
              to request that we restrict the processing of your personal
              information if (i) you are concerned about the accuracy of your
              personal information, (ii) you believe your personal information
              has been unlawfully processed, (iii) you need us to maintain the
              personal information solely for a legal claim, or (iv) we are in
              the process of considering your objection about processing based
              on legitimate interests.
            </p>
            <p>
              <strong>Right to Object:</strong> You can object to processing
              your personal information based on your legitimate interests or
              public interest. If this is done, we must provide compelling,
              legitimate grounds for the processing, which overrides your
              interests, rights, and freedoms, to proceed with processing your
              personal information.
            </p>
            <p>
              <strong>Right to be Informed:</strong> You have the right to be
              informed about how your data is collected, processed, shared, and
              stored.
            </p>
            <p>
              <strong>Right of Access:</strong> You may request a copy of the
              personal information we hold about you at any time by submitting a
              Data Subject Access Request (DSAR). The statutory deadline for
              fulfilling a DSAR request is 30 calendar days from our receipt of
              your request.
            </p>
            <p>
              <strong>Right to Erasure:</strong> In certain circumstances, you
              can ask for your data to be erased from the records held by
              organizations. However, this is a qualified right; it is not
              absolute and may only apply in certain circumstances.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              When may the right to erasure apply?
            </h3>
            <p>
              When the personal data is no longer necessary for the purpose for
              which it was initially collected or processed.
            </p>
            <p>
              If consent was the lawful basis for processing personal data and
              that consent has been withdrawn. PalestinianCauses LLC relies on
              consent to process personal data in very few circumstances.
            </p>
            <p>
              The company relies on legitimate interests as a legal basis for
              processing personal data, and an individual has the right to
              object. It has been determined that the company has no overriding
              legitimate grounds to refuse that request.
            </p>
            <p>
              Personal data are being processed for direct marketing purposes,
              e.g., a person&apos;s name and email address, and the individual
              objects to that processing.
            </p>
            <p>
              There is legislation that requires that personal data are to be
              destroyed.
            </p>
            <p>
              <strong>Right to Portability:</strong> Individuals can get some of
              their data from an organization in a way that is accessible and
              machine-readable, for example, as a CSV file. Individuals also
              have the right to ask an organization to transfer their data to
              another organization.
            </p>
            <p>However, the right to portability:</p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                This only applies to personal data that a person has directly
                and electronically given to PalestinianCauses LLC.
              </li>
              <li>
                Onward transfer will only be available where this is
                &ldquo;technically feasible&ldquo;.
              </li>
            </ol>
            <p>
              <strong>Right to Rectification:</strong> If personal data is
              inaccurate, outdated, or incomplete, individuals have the right to
              correct, update, or complete that data. Collectively, this is
              referred to as the right to rectification. Rectification may
              involve filling the gaps, i.e., having incomplete personal data
              completed – although this will depend on the purposes for the
              processing. This may include adding a supplementary statement to
              the incomplete data to highlight inaccuracies or claims.
            </p>
            <p>
              This right only applies to an individual&apos;s data; a person
              cannot seek the rectification of another person&apos;s
              information.
            </p>
            <p>
              <strong>Notification of data breaches:</strong> Upon discovery of
              a data breach, we will investigate the incident and report it to
              the UK&apos;s data protection regulator and you if we deem it
              appropriate to do so.
            </p>
            <p>
              <strong>Complaints:</strong> You have the right, at any time, to
              complain to the Information Commissioner&apos;s Office (ICO), the
              UK supervisory authority for data protection issues (
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="https://www.ico.org.uk">www.ico.org.uk</Link>
                </Button>
              </span>
              ). We would appreciate the opportunity to deal with your concerns
              before you approach the ICO. Don&apos;t hesitate to contact us in
              the first instance using the details below. Please provide us with
              as much information as possible about the alleged breach. We will
              promptly investigate your complaint and respond to you in writing,
              setting out the outcome of our investigation and the steps we will
              take to deal with your complaint.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Enquiries, Reports, and Escalation.
            </h2>
            <p>
              To enquire about PalestinianCauses LLC&apos;s privacy policy or to
              report user privacy violations, you may contact our Data
              Protection Officer using the details in the Contact Us section of
              this privacy policy.
            </p>
            <p>
              Suppose we fail to resolve your concern to your satisfaction. In
              that case, you may also contact the Information
              Commissioner&apos;s Office (ICO), the UK Data Protection
              regulator:
            </p>
            <p>
              <strong>Information Commissioner&apos;s Office:</strong> Wycliffe
              House Water Lane Wilmslow Cheshire SK9 5AF.
            </p>
            <p>
              <strong>Tel:</strong> 0303 123 1113 (local rate).
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="https://www.ico.org.uk">www.ico.org.uk</Link>
                </Button>
              </span>
              .
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Additional Disclosures for Personal Information Protection and
              Electronic Documents Act (PIPEDA) Compliance (Canada).
            </h2>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Additional scope of personal information.
            </h3>
            <p>
              By PIPEDA, we broaden our definition of personal information to
              include any information about an individual, such as financial
              information, information about your appearance, your views and
              opinions (such as those expressed online or through a survey),
              opinions held about you by others, and any personal
              correspondences you may have with us. While this information may
              not directly identify you, be aware that it may be combined with
              other information to do so.
            </p>
            <p>
              As PIPEDA refers to personal information using the term Personally
              Identifying Information (PII), any references to personal
              information and PII in this privacy policy and official
              communications from PalestinianCauses LLC are intended as
              equivalent to one another in every way, shape, and form.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Valid Consent.
            </h3>
            <p>
              Where you give us consent to collect and use your personal
              information for a specific purpose, you may withdraw your consent
              at any time using the facilities we provide; however, this will
              not affect any use of your information that has already taken
              place. We assume your consent based on your positive contact
              action when you contact us. Therefore, your consent for your name
              and email address is required so we can respond to your inquiry.
              Under PIPEDA, consent is only valid if it is reasonable to expect
              that an individual to whom the organization&apos;s activities are
              directed would understand the nature, purpose, and consequences of
              the collection, use, or disclosure of the personal information to
              which they consent.
            </p>
            <p>
              Where you agree to receive marketing communications from us, we
              will do so based solely on your indication of consent or until you
              instruct us not to, which you can do at any time.
            </p>
            <p>
              While you may request that we delete your contact details anytime,
              we cannot recall any email we have already sent. If you have any
              further inquiries about how to withdraw your consent, please feel
              free to enquire using the details provided in the Contact Us
              section of this privacy policy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              International Transfers of Information.
            </h3>
            <p>
              While PalestinianCauses LLC endeavors to keep, store, and handle
              customer data within locations in Canada, it may use agents or
              service providers located in the United States (U.S.), European
              Economic Area (EEA), or United Kingdom (UK) to collect, use,
              retain and process personal information as part of providing
              services to you. While we use all reasonable efforts to ensure
              that personal information receives the same level of security in
              any other jurisdiction as it would in Canada, please be aware that
              privacy protections under U.S. laws may not be the same adequacy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Customer Data Rights.
            </h3>
            <p>
              Although PIPEDA does not contain an extensive set of consumer
              rights, it does grant consumers the right to:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                Access the personal information organizations hold about them.
              </li>
              <li>
                Correct any inaccurate or outdated personal information the
                organization holds about them (or, if this is not possible,
                delete the incorrect personal information).
              </li>
              <li>
                Withdraw consent for any activities they have consented to
                (e.g., direct marketing or cookies).
              </li>
            </ol>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Right to Withdraw Consent.
            </h3>
            <p>
              Where you give us consent to collect and use your personal
              information for a specific purpose, subject to some restrictions,
              you can, at any time, refuse to consent or continue to consent to
              the collection, use, or disclosure of your personal information by
              notifying us using the email address below in the &apos;Contact
              Us&apos; section. Withdrawal of consent may impact our ability to
              provide or continue to provide services.
            </p>
            <p>
              Customers cannot refuse collection, use, and disclosure of their
              personal information if such information is required to:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>Be collected, used, or disclosed as required by any law.</li>
              <li>Fulfill the terms of any contractual agreement.</li>
              <li>
                Be collected, used, or disclosed as regulators require,
                including self-regulatory organizations.
              </li>
            </ol>
            <p>
              While you may request that we delete your contact details anytime,
              we cannot recall any email we have already sent. If you have any
              further inquiries about how to withdraw your consent, please feel
              free to enquire using the details provided in the Contact Us
              section of this privacy policy.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Right of Access under PIPEDA.
            </h3>
            <p>
              PIPEDA gives you a general right to access the PII held by
              businesses subject to this law. Under PIPEDA, you must make your
              access request in writing and pay a minimal fee of $30.00.
            </p>
            <p>
              You have the right to complain about organizational fees that seem
              unjust. We retain the right to decide how we disclose the copies
              of your PII to you. We will take all necessary measures to fulfill
              your request within 30 days of receipt. Otherwise, we must inform
              you of our inability to do so before the 30-day timeframe if:
            </p>
            <ol className="flex list-decimal flex-col gap-3">
              <li>
                Meeting the time limit would unreasonably interfere with our
                business activities.
              </li>
              <li>
                The time required to undertake consultations necessary to
                respond to the request would make it impractical to meet the
                time limit.
              </li>
            </ol>
            <p>
              We can also extend the time limit for the length of time required
              to convert the personal information into an alternative format. In
              these circumstances, we will advise you of the delay within the
              first 30 days and explain its reason.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Right of rectification under PIPEDA.
            </h3>
            <p>
              You may request a correction to any factual errors or omissions
              within your PII. We would ask you to provide some evidence to back
              up your claim. Under PIPEDA, an organization must amend the
              information, as required, if you successfully demonstrate that
              it&apos;s incomplete or inaccurate.
            </p>
            <p>
              You may contact us at any time, using the information provided in
              the Contact Us section of this privacy policy, if you believe your
              PII on our systems is incorrect or incomplete.
            </p>
            <p>
              Suppose we cannot agree to change the information. In that case,
              you have the right to have your concerns recorded with the Office
              of the Privacy Commission of Canada.
            </p>
            <h3 className="-mb-4 mt-4 text-xl font-medium text-foreground">
              Compliance with PIPEDA&apos;s Ten Principles of Privacy.
            </h3>
            <p>
              This privacy policy complies with the PIPEDA&apos;s requirements
              and ten principles of privacy, which are as follows:
            </p>
            <p>
              Accountability. PalestinianCauses LLC is responsible for the PII
              under its control and will designate one or more persons to ensure
              organizational accountability for compliance with the ten privacy
              principles under PIPEDA, whose details are included below. All
              personnel are accountable for the protection of customers&apos;
              personal information.
            </p>
            <p>
              Identifying purposes. PalestinianCauses LLC identifies the
              purposes for which personal information is collected at or before
              the time the information is collected.
            </p>
            <p>
              Consent. Consent is required for PalestinianCauses LLC&apos;s
              collection, use, or disclosure of personal information, except
              where required or permitted by PIPEDA or other law. In addition,
              when customers access a product or service we offer, consent is
              deemed to be granted. Express consent may be obtained verbally, in
              writing, or electronically. Alternatively, consent may be implied
              through customers&apos; actions or continued use of a product or
              service following PalestinianCauses LLC&apos;s notification of
              changes.
            </p>
            <p>
              Limiting collection. Personal information collected will be
              limited to what is necessary for the purposes identified by
              PalestinianCauses LLC.
            </p>
            <p>
              Limiting use, disclosure, and retention. We will not use or
              disclose personal information for purposes other than those for
              which the data was collected, except with your consent or as
              required by law. We will retain personal information only as long
              as necessary to fulfill the purposes for collecting such
              information and comply with legal requirements.
            </p>
            <p>
              Accuracy. Personal information will be maintained by
              PalestinianCauses LLC in an accurate, complete, and up-to-date
              format as necessary for the purpose(s) for which the personal data
              was collected.
            </p>
            <p>
              Safeguards. We will protect personal information with security
              safeguards appropriate to the sensitivity of such information.
            </p>
            <p>
              Openness. We will make our policies and practices for collecting
              and managing personal information readily available upon request,
              including our brochures or other information that explains our
              policies, standards, or codes.
            </p>
            <p>
              Customer access. We will inform customers of their personal
              information&apos;s existence, use, and disclosure. We will provide
              access to their personal information, subject to legal
              restrictions. We may require written requests for access to
              personal information and, in most cases, will respond within 30
              days of receipt of such requests. Customers may verify the
              accuracy and completeness of their personal information. They may
              request that the individual information be corrected or updated if
              appropriate.
            </p>
            <p>
              Challenging compliance Customers are welcome to direct any
              questions or inquiries concerning our compliance with this privacy
              policy and PIPEDA requirements using the contact information
              provided in the Contact Us section of this privacy policy.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Cookie Compliance.
            </h2>
            <p>
              Our email interactions with our customers are compliant with
              Canadian Anti-Spam Legislation. The company does not send
              unsolicited emails to persons with whom we have no relationship.
              We will not sell personal information, such as email addresses, to
              unrelated third parties. Occasionally, your personal information
              may be provided to our third-party partners so they can administer
              the products and services you request from us.
            </p>
            <p>
              When you leave our website by linking to another website, you are
              subject to the privacy and security policies of the new website.
              We encourage you to read the privacy policies of all websites you
              visit, especially if you share any personal information with them.
            </p>
            <p>Please refer to our Cookie Policy for more information.</p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Enquiries, Reports, and Escalation.
            </h2>
            <p>
              To enquire about PalestinianCauses LLC&apos;s privacy policy or to
              report user privacy violations, you may contact us using the
              details in the Contact Us section of this privacy policy.
            </p>
            <p>
              Suppose we fail to resolve your concern to your satisfaction. In
              that case, you may also contact the Office of the Privacy
              Commissioner of Canada:
            </p>
            <p>30 Victoria Street Gatineau, QC K1A 1H3.</p>
            <p>
              <strong>Toll Free:</strong> 1.800.282.1376
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="https://www.priv.gc.ca.">www.priv.gc.ca</Link>
                </Button>
              </span>
              .
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Contact Us.
            </h2>
            <p>
              For any questions or concerns regarding your privacy, you may
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
              </span>{" "}
              .
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
