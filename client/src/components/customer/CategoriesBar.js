const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Books",
  "Beauty",
  "Sports"
];

export default function CategoriesBar() {
  return (
    <div className="bg-white shadow-sm px-6 py-3 flex gap-3 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
