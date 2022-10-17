export const Header = () => {
  return (
    <div className="p-5 px-7 justify-between flex items-center">
      <h1 className="text-4xl font-[200]">Strada</h1>
      <div className="space-x-5 hidden md:block">
        <a>What's New</a>
        <a>Blog</a>
        <a>About</a>
        <a>Support</a>
      </div>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Download
      </button>
    </div>
  );
};
