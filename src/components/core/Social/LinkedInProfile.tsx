import { Link } from "react-router";

export const LinkedInProfile = () => {
  return (
    <Link
      to="https://www.linkedin.com/in/brandonrq506/"
      target="_blank"
      rel="noopener noreferrer">
      <span className="sr-only">Brandon's LinkedIn Profile</span>
      <img
        src="/linked-in.svg"
        alt="LinkedIn's Logo"
        className="size-6 stroke-blue-600"
      />
    </Link>
  );
};
