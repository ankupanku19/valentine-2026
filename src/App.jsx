import Hero from './components/Hero';
import MessageJar from './components/MessageJar';
import PolaroidWall from './components/PolaroidWall';
import OpenWhen from './components/OpenWhen';
import Coupons from './components/Coupons';
import LoveLetter from './components/LoveLetter';
import Footer from './components/Footer';
import DiceGame from './components/DiceGame';
import Pulse from './components/Pulse';
import TruthOrDare from './components/TruthOrDare';
import PleasurePreferences from './components/PleasurePreferences';
import TouchConnect from './components/TouchConnect';
import FantasyGenerator from './components/FantasyGenerator';
import MidnightHunt from './components/MidnightHunt';

import ThisOrThat from './components/ThisOrThat';
import Doodle from './components/Doodle';
import FinalQuestion from './components/FinalQuestion';

export default function App() {
  return (
    <div className="min-h-dvh bg-paper-50 relative selection:bg-rose-200 text-ink-900">

      <Hero />

      <PolaroidWall />

      <section className="container mx-auto px-4 py-20 space-y-32">
        <OpenWhen />
        <Coupons />

        <DiceGame />
        <Pulse />
        <MidnightHunt />

        <ThisOrThat />
        <TruthOrDare />
        <PleasurePreferences />
        <TouchConnect />
        <FantasyGenerator />
      </section>

      <MessageJar />

      <LoveLetter />

      <FinalQuestion />

      <Footer />
    </div>
  );
}
