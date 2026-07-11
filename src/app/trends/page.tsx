import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';

export default function TrendsPage() {
  const trends = D.featuredSignals;
  
  return (
    <CatalogLayout 
      title="Atlas Trends" 
      description="The definitive list of visual culture trends mapped by Navrine Studio this issue." 
      entries={trends} 
    />
  );
}
