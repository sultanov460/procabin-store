import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { getSupportEmail } from "@/content/support-config";
import { policiesConfig } from "@/content/policies-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ProCabin collects, uses, and discloses your personal information.",
  alternates: { canonical: "/privacy" },
};

// Adapted from the store owner's Shopify-generated policy. References to
// storefront features that this implementation does not provide (customer
// accounts, wishlists, reviews, and advertising integrations) are omitted.

export default function PrivacyPage() {
  const supportEmail = getSupportEmail();

  return (
    <div className="policy-shell">
      <p className="eyebrow mb-3">Legal</p>
      <h1 className="text-4xl sm:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {policiesConfig.lastUpdated}</p>

      <div className="policy-content">
        <section>
          <p>
            {siteConfig.brandName} operates this store and website, including all related information, content,
            features, tools, products and services, in order to provide you, the customer, with a curated shopping
            experience (the &quot;Services&quot;). {siteConfig.brandName} is powered by Shopify, which enables us
            to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your
            personal information when you visit, use, or make a purchase or other transaction using the Services
            or otherwise communicate with us. If there is a conflict between our Terms & Conditions and this
            Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure
            of your personal information.
          </p>
          <p className="mt-3">
            Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge
            that you have read this Privacy Policy and understand the collection, use, and disclosure of your
            information as described in this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Personal information we collect or process</h2>
          <p>
            When we use the term &quot;personal information,&quot; we are referring to information that identifies
            or can reasonably be linked to you or another person. Personal information does not include information
            that is collected anonymously or that has been de-identified, so that it cannot identify or be
            reasonably linked to you. We may collect or process the following categories of personal information,
            including inferences drawn from this personal information, depending on how you interact with the
            Services, where you live, and as permitted or required by applicable law:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Contact details including your name, address, billing address, shipping address, phone number, and email address.</li>
            <li>
              Financial information including credit card, debit card, and financial account numbers, payment card
              information, financial account information, transaction details, form of payment, payment
              confirmation and other payment details.
            </li>
            <li>
              Transaction information including the items you view, put in your cart, purchase, return, exchange
              or cancel and your past transactions.
            </li>
            <li>Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
            <li>Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
            <li>Usage information including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Personal information sources</h2>
          <p>We may collect personal information from the following sources:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Directly from you, including when you visit or use the Services, place an order, communicate with us, or otherwise provide us with your personal information.</li>
            <li>Automatically through the Services, including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies.</li>
            <li>From our service providers, including when we engage them to enable certain technology and when they collect or process your personal information on our behalf.</li>
            <li>From our partners or other third parties.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">How we use your personal information</h2>
          <p>
            Depending on how you interact with us or which of the Services you use, we may use personal information
            for the following purposes:
          </p>
          <ul className="mt-3 list-disc space-y-3 pl-5">
            <li>
              <span className="font-medium text-ink">Provide, tailor, and improve the Services.</span> We use your
              personal information to provide you with the Services, including to perform our contract with you, to
              process your payments, to fulfill your orders, to process purchases, returns, exchanges or other
              transactions, to arrange for shipping, to facilitate returns and exchanges, and to improve the
              shopping experience.
            </li>
            <li>
              <span className="font-medium text-ink">Security and fraud prevention.</span> We use your personal
              information to provide a secure payment and shopping experience, detect, investigate or take action
              regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to
              secure our services.
            </li>
            <li>
              <span className="font-medium text-ink">Communicating with you.</span> We use your personal
              information to provide you with customer support, to be responsive to you, to provide effective
              services to you and to maintain our business relationship with you.
            </li>
            <li>
              <span className="font-medium text-ink">Legal reasons.</span> We use your personal information to
              comply with applicable law or respond to valid legal process, including requests from law enforcement
              or government agencies, to investigate or participate in civil discovery, potential or actual
              litigation, or other adversarial legal proceedings, and to enforce or investigate potential
              violations of our terms or policies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">How we disclose personal information</h2>
          <p>
            In certain circumstances, we may disclose your personal information to third parties for legitimate
            purposes subject to this Privacy Policy. Such circumstances may include:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              With Shopify, which provides our ecommerce platform (checkout, payments, and order processing),
              and other vendors and third parties who perform services on our behalf (e.g. IT management,
              customer support, cloud storage, fulfillment and shipping).
            </li>
            <li>When you direct, request, or otherwise consent to our disclosure of certain information to third parties, such as to ship products to you.</li>
            <li>With our affiliates or otherwise within our corporate group.</li>
            <li>
              In connection with a business transaction such as a merger or bankruptcy, to comply with any
              applicable legal obligations (including to respond to subpoenas, search warrants and similar
              requests), to enforce any applicable terms of service or policies, and to protect or defend the
              Services, our rights, and the rights of our users or others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Relationship with Shopify</h2>
          <p>
            Our storefront is built on Next.js and is not hosted by Shopify — Shopify powers the commerce
            functions of the Services (checkout, payment processing, and order management), and collects and
            processes personal information about your access to and use of those functions in order to provide
            and improve them for you. Information you submit through checkout will be transmitted to and shared
            with Shopify, as well as third parties that may be located in countries other than where you reside,
            in order to provide and improve those functions for you. Where we use Shopify features that
            incorporate data from your interactions with our store, along with other merchants and with Shopify,
            Shopify is responsible for the processing of your personal information for those purposes, including
            for responding to your requests to exercise your rights over use of your personal information.
          </p>
          <p className="mt-3">
            To learn more about how Shopify uses your personal information and any rights you may have, including
            how to exercise those rights, you can visit the{" "}
            <a href="https://privacy.shopify.com/en" className="text-forest underline" target="_blank" rel="noopener noreferrer">
              Shopify Consumer Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Third-party websites and links</h2>
          <p>
            The Services may provide links to websites or other online platforms operated by third parties. If you
            follow links to sites not affiliated or controlled by us, you should review their privacy and security
            policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or
            security of such sites, including the accuracy, completeness, or reliability of information found on
            these sites. Information you provide on public or semi-public venues, including information you share
            on third-party social networking platforms, may also be viewable by other users of the Services and/or
            users of those third-party platforms without limitation as to its use by us or by a third party. Our
            inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or
            of their owners or operators, except as disclosed on the Services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Children&apos;s data</h2>
          <p>
            The Services are not intended to be used by children, and we do not knowingly collect any personal
            information about children under the age of majority in your jurisdiction. If you are the parent or
            guardian of a child who has provided us with their personal information, you may contact us using the
            details below to request that it be deleted. As of the effective date of this Privacy Policy, we do not
            have actual knowledge that we &quot;share&quot; or &quot;sell&quot; (as those terms are defined in
            applicable law) personal information of individuals under 16 years of age.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Security and retention of your information</h2>
          <p>
            Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee
            &quot;perfect security.&quot; In addition, any information you send to us may not be secure while in
            transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential
            information to us.
          </p>
          <p className="mt-3">
            How long we retain your personal information depends on different factors, such as whether we need the
            information to provide the Services, process or support an order, comply with legal obligations, resolve
            disputes or enforce other applicable contracts and policies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Your rights and choices</h2>
          <p>
            Depending on where you live, you may have some or all of the rights listed below in relation to your
            personal information. However, these rights are not absolute, may apply only in certain circumstances,
            and in certain cases we may decline your request as permitted by law.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><span className="font-medium text-ink">Right to access/know.</span> You may have a right to request access to personal information that we hold about you.</li>
            <li><span className="font-medium text-ink">Right to delete.</span> You may have a right to request that we delete personal information we maintain about you.</li>
            <li><span className="font-medium text-ink">Right to correct.</span> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
            <li><span className="font-medium text-ink">Right of portability.</span> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.</li>
          </ul>
          <p className="mt-3">
            You may exercise any of these rights by contacting us using the details below. To learn more about how
            Shopify uses your personal information and any rights you may have with respect to data processed by
            Shopify, visit{" "}
            <a href="https://privacy.shopify.com/en" className="text-forest underline" target="_blank" rel="noopener noreferrer">
              https://privacy.shopify.com/en
            </a>
            .
          </p>
          <p className="mt-3">
            We will not discriminate against you for exercising any of these rights. We may need to verify your
            identity before we can process your requests, as permitted or required under applicable law. In
            accordance with applicable law, you may designate an authorized agent to make requests on your behalf;
            before accepting such a request we will require proof of authorization and may need to verify your
            identity directly with you. We will respond to your request in a timely manner as required under
            applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Complaints</h2>
          <p>
            If you have complaints about how we process your personal information, please contact us using the
            details below. Depending on where you live, you may have the right to appeal our decision by
            contacting us, or to lodge your complaint with your local data protection authority.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">International transfers</h2>
          <p>
            Please note that we may transfer, store and process your personal information outside the country you
            live in. If we transfer your personal information out of the European Economic Area or the United
            Kingdom, we will rely on recognized transfer mechanisms like the European Commission&apos;s Standard
            Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK,
            as relevant, unless the data transfer is to a country that has been determined to provide an adequate
            level of protection.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time, including to reflect changes to our practices or
            for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this
            website, update the &quot;Last updated&quot; date, and provide notice as required by applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg text-ink">Contact</h2>
          {supportEmail ? (
            <p>
              Should you have any questions about our privacy practices or this Privacy Policy, or if you would
              like to exercise any of the rights available to you, please email us at{" "}
              <a href={`mailto:${supportEmail}`} className="font-medium text-forest underline">
                {supportEmail}
              </a>
              .
            </p>
          ) : (
            <p>
              Should you have any questions about our privacy practices or this Privacy Policy, or if you would
              like to exercise any of the rights available to you, please reach out through our{" "}
              <a href="/contact" className="font-medium text-forest underline">Contact page</a>.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
