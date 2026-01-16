import ProductCard from "../ProductCard";

export default function ProductSection({ title }) {
  return (
    <div className="px-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </div>
  );
}
