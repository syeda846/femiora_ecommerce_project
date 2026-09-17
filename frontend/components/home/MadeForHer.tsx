/*
 * MadeForHer — centered heading + subtitle section, shown right after
 * the Hero carousel and before the product grids (Khaadi "Top Picks" style).
 */
export default function MadeForHer() {
  return (
    <section className="bg-pink-50 text-center pt-12 pb-4 px-4">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Made for Her</h2>
      <p className="text-neutral-600 max-w-md mx-auto">
        Feminine. Elegant. Effortless.
      </p>
    </section>
  );
}