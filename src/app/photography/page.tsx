import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';

export default function PhotographyPage() {
  const photography = D.featuredSignals.filter((entry: any) => entry.category === 'Photography' || entry.category === 'Campaign');
  
  return (
    <CatalogLayout 
      title="Photography Studies" 
      description="Curated photography directions for brand, editorial, and campaign work." 
      entries={photography} 
    />
  );
}
