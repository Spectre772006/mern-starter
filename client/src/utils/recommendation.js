export const recommendProducts = (products, behavior) => {
  return products
    .map(p => {
      let score = 0;

      if (p.isTrending) score += 10;
      if (behavior.viewed.includes(p.id)) score += 5;
      if (behavior.cart.includes(p.id)) score += 8;
      if (p.discount > 0) score += 3;

      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
};
