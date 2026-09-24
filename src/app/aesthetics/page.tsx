import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';

export default function AestheticsPage() {
  const featured = D.featuredSignals.filter((entry: any) => entry.category === 'Aesthetic');
  
  const mappedAesthetics = D.aesthetics.map((a: any) => ({
    id: a.mood.replace('mood-', ''),
    title: a.name,
    desc: a.traits,
    category: 'Aesthetic',
    useCase: 'Atlas Library Entry',
    palette: a.palette,
    moodClass: a.mood
  }));

  // Filter out any overlap if necessary, but here we just combine
  const aesthetics = [...featured, ...mappedAesthetics];
  
  return (
    <CatalogLayout 
      title="Aesthetics Catalog" 
      description="Explore specific aesthetic movements, tags, and subcultures mapped by Navrine Atlas." 
      entries={aesthetics} 
    />
  );
}
