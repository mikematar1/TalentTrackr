import { useState, useEffect } from "react";

const Policy = () => {
  const [loaded, setLoaded] = useState(false);
  const [policies] = useState([
    {
      id: 1,
      title: "Information We Collect",
      text: (
        <>
          <p>
            We collect personal information from users in several ways,
            including:
          </p>
          <ul>
            <li>
              Information You Provide: When you create an account, contact us,
              or use our services.
            </li>
            <li>
              Automatic Information: We collect information automatically
              through cookies and other tracking technologies.
            </li>
            <li>
              Third-Party Information: We may receive information from
              third-party services, such as social media platforms.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: "How We Use Your Information",
      text: (
        <>
          <p>We use personal information for various purposes, including:</p>
          <ul>
            <li>
              Providing Services: To operate our platform and deliver the
              services you request.
            </li>
            <li>
              Communication: To send you updates, notifications, and marketing
              communications (opt-out available).
            </li>
            <li>
              Improving Our Services: To analyze user behavior, improve user
              experience, and enhance platform functionality.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: "How We Share Your Information",
      text: (
        <>
          <p>
            We may share personal information with third parties in the
            following cases:
          </p>
          <ul>
            <li>
              Service Providers: With third-party service providers who assist
              us in operating our website and providing services (e.g., hosting,
              analytics, marketing).
            </li>
            <li>
              Business Partners: With employers, recruiters, and other business
              partners, as needed to facilitate job matching.
            </li>
            <li>
              Legal Requirements: When required by law or to protect our rights,
              safety, or property.
            </li>
            <li>
              Business Transfers: In the event of a merger, acquisition, or
              other business transaction, personal information may be
              transferred as part of the deal.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 4,
      title: "Data Security and Retention",
      text: `
        We take reasonable measures to protect personal information from unauthorized access, loss, or disclosure. However, no data transmission over the internet can be guaranteed to be 100% secure. We retain personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.
      `,
    },
    {
      id: 5,
      title: "Your Rights and Choices",
      text: (
        <>
          <p>
            You have certain rights regarding your personal information,
            including:
          </p>
          <ul>
            <li>
              Access and Correction: You can access and correct your personal
              information through your account settings.
            </li>
            <li>
              Deletion: You can request the deletion of your personal
              information, subject to legal and business constraints.
            </li>
            <li>
              Opt-Out: You can opt out of receiving marketing communications at
              any time.
            </li>
            <li>
              Data Portability: You can request a copy of your personal
              information in a machine-readable format.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 6,
      title: "People's Privacy",
      text: `
        Our website is not intended for people under 18. We do not knowingly collect personal information from people under 18. If we learn that we have collected such information, we will take steps to delete it.
      `,
    },
    {
      id: 7,
      title: "Changes to This Privacy Policy",
      text: `
        We may update this Privacy Policy from time to time. We will notify you of significant changes by posting an update on our website or via email. We encourage you to review this policy periodically.
      `,
    },
  ]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Apply overflow: hidden to body during transition
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      window.scrollTo(0, 0); // Scroll to the top when loaded
    }
  }, [loaded]);

  return (
    <>
      <div className={`policies-container ${loaded ? "loaded" : ""}`}>
        <h1>Talent Tracker Privacy Policy</h1>
        {policies.map((policy) => (
          <div key={policy.id} className="policy-section">
            <h3 className="policies-title">{policy.title}</h3>
            <p className="policies-text">{policy.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Policy;
