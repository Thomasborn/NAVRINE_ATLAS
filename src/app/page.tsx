import OrbitHero from '@/components/hero/OrbitHero';
import TagMarquee from '@/components/home/TagMarquee';
import SignalsBento from '@/components/home/SignalsBento';
import PaletteStrip from '@/components/home/PaletteStrip';
import TrendsTicker from '@/components/home/TrendsTicker';
import ClosingCta from '@/components/home/ClosingCta';
import './home.css';

export default function Home() {
  return (
    <>
      <OrbitHero />
      <TagMarquee />
      <SignalsBento />
      <PaletteStrip />
      <TrendsTicker />
      <ClosingCta />
    </>
  );
}
