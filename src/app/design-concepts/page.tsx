import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';

export default function DesignConceptsPage() {
  const concepts = D.featuredSignals.filter((entry: any) => entry.category === 'Product UI' || entry.category === 'Brand System');
  
  return (
    <CatalogLayout 
      title="Design Concepts" 
      description="Opinionated directions for product UI and brand systems, built for clarity and impact." 
      entries={concepts} 
    />
  );
}
