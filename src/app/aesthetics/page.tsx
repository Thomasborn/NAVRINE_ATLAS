import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';

export default function AestheticsPage() {
  const aesthetics = D.featuredSignals.filter((entry: any) => entry.category === 'Aesthetic');
  
  return (
    <CatalogLayout 
      title="Aesthetics Catalog" 
      description="Explore specific aesthetic movements, tags, and subcultures mapped by Navrine Atlas." 
      entries={aesthetics} 
    />
  );
}
