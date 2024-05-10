import { useState, useEffect } from "react";

const FAQ = () => {
  const [loaded, setLoaded] = useState(false);
  const faq = [
    {
      id: 1,
      question: "What is Talent Tracker?",
      answer:
        "Talent Tracker is a job-matching platform designed to connect job seekers with employers based on specific skills, experience, and other relevant factors. Our goal is to simplify the recruitment process and help both job seekers and employers find the best matches.",
    },
    {
      id: 2,
      question: "How does the platform work?",
      answer:
        "Our platform uses advanced algorithms to match job seekers with suitable employers. Job seekers create profiles and specify their skills, experience, and job preferences. Employers post job openings and specify their requirements. Our platform then identifies the best matches based on these criteria.",
    },
    {
      id: 3,
      question: "Is Talent Tracker free to use?",
      answer:
        "Creating an account and searching for jobs is free for job seekers. Employers may be required to pay a fee for posting job listings or using premium features, depending on the plan they choose.",
    },
    {
      id: 4,
      question: "How do I create an account?",
      answer:
        "To create an account, click the \"Sign Up\" button on our homepage. You'll need to provide basic information, such as your name, email address, and a password. Once you've created an account, you can complete your profile and start searching for jobs or posting job listings.",
    },
    {
      id: 5,
      question: "How do I update my profile information?",
      answer:
        'After logging in, you can update your profile information by navigating to the "Profile" section. From there, you can edit your personal details, add or update your resume, and specify your skills and experience.',
    },
    {
      id: 7,
      question: "How do I ensure my personal information is secure?",
      answer:
        "We take data security and privacy seriously. We use encryption and other security measures to protect your personal information. For more details, please read our Privacy Policy.",
    },
    {
      id: 10,
      question: "How do I search for jobs?",
      answer:
        "To search for jobs, log in to your account and use the search bar to enter keywords or job titles. You can also use filters to narrow your search by location, industry, job type, and other criteria.",
    },
  ];
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
        <h1>Frequently Asked Questions</h1>
        {faq.map((faq) => (
          <div key={faq.id} className="policy-section">
            <h3 className="policies-title">{faq.question}</h3>
            <p className="policies-text">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
