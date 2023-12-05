import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <h1 className="font-black text-7xl">An Error Occurred</h1>
      <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        404 Not Found
      </h4>
      <Link
        className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        to="/"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
