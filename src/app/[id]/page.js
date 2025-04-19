import Search from "@/components/Search";
import CategoryJobSection from "@/components/CategoryJobSection";

export default function CategoryPage({ params }) {
  const { id } = params;
  const title = `${id.charAt(0).toUpperCase() + id.slice(1)} Developer Jobs`;
  
  return (
    <>
      <Search />

      <section className="py-12">
        <CategoryJobSection
          categoryKey={id}
          title={title}
          limit={5}
        />
      </section>
    </>
  );
}
