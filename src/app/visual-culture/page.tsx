import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';

export default function VisualCulturePage() {
  const featured = D.featuredSignals;
  
  const mappedAesthetics = D.aesthetics.map((a: any) => ({
    id: a.mood.replace('mood-', ''),
    title: a.name,
    desc: a.traits,
    category: 'Aesthetic',
    useCase: 'Atlas Library Entry',
    palette: a.palette,
    moodClass: a.mood
  }));

  const culture = [...featured, ...mappedAesthetics];
  
  return (
    <CatalogLayout 
      title="Visual Culture" 
      description="The full spectrum of aesthetics, campaigns, and visual movements currently tracked in the Atlas." 
      entries={culture} 
    />
  );
}
