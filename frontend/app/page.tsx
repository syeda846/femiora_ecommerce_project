import Hero from "@/components/home/Hero";
import NewIn from "@/components/home/NewIn";
import CategoryGrid from "@/components/home/CategoryGrid";
import MadeForHer from "@/components/home/MadeForHer";


export default function HomePage() {
  return (
    <>
      <Hero />
       <MadeForHer />
      <NewIn />
      <CategoryGrid />
    </>
  );
}