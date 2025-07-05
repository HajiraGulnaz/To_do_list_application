import PropTypes from "prop-types";

export default function Header({ username = "User" }) {
  const quotes = [
    "Small steps every day lead to big success!",
    "Productivity is never an accident.",
    "Your future is created by what you do today."
  ];

  return (
    <header className="p-4 bg-blue-500 text-white text-center shadow-lg">
      <h1 className="text-2xl font-semibold">Welcome, {username}!</h1>
      <p className="italic mt-2">{quotes[Math.floor(Math.random() * quotes.length)]}</p>
    </header>
  );
}

// Prop Validation
Header.propTypes = {
  username: PropTypes.string,
};
