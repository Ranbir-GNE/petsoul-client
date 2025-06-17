const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
        404
      </h1>
      <div className="bg-indigo-600 text-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-6 text-gray-600 text-lg text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/dashboard"
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md text-lg shadow hover:bg-indigo-500 focus:outline-none"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;
