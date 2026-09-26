import CatalogLayout from '@/components/atlas/CatalogLayout';
import { ATLAS_DATA as D } from '@/data/data';
import { libraryAesthetics } from '@/data/aesthetics';

export default function VisualCulturePage() {
  const culture = [...D.featuredSignals, ...libraryAesthetics];

  return (
    <CatalogLayout
      title="Visual Culture"
      description="The full spectrum of aesthetics, campaigns, and visual movements currently tracked in the Atlas."
      entries={culture}
    />
  );
}
