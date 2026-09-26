import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';
import { libraryAesthetics } from '@/data/aesthetics';

export default function AestheticsPage() {
  const featured = D.featuredSignals.filter((entry: any) => entry.category === 'Aesthetic');
  
  const aesthetics = [...featured, ...libraryAesthetics];
  
  return (
    <CatalogLayout 
      title="Aesthetics Catalog" 
      description="Explore specific aesthetic movements, tags, and subcultures mapped by Navrine Atlas." 
      entries={aesthetics} 
    />
  );
}
