export default function Search() {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-screen">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Location"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}
