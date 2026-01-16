import { products } from "../../data/products";

export default function TrendingNow() {
  const trending = products.filter(p => p.isTrending);

  return (
    <section>
      <h2>Trending Now</h2>
      <div className="grid">
        {trending.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
