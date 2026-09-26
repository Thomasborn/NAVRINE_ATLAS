import { ATLAS_DATA as D } from './data';

export const aestheticSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Library aesthetics shaped like featured signals, so catalog cards and /aesthetics/[slug] share one entry type
export const libraryAesthetics = D.aesthetics.map(a => ({
  id: aestheticSlug(a.name),
  title: a.name,
  desc: a.traits,
  category: 'Aesthetic',
  useCase: 'Atlas Library Entry',
  palette: a.palette,
  moodClass: a.mood,
}));

export const findAesthetic = (slug: string) =>
  D.featuredSignals.find(e => e.id === slug) ?? libraryAesthetics.find(e => e.id === slug);
