import { Navbar } from "./navbar/Navbar";
import { Hero } from "./hero/Hero";
import { MirrorReality } from "./mirror-reality/MirrorReality";
import { BreakStrategy } from "./break-strategy/BreakStrategy";
import { IntroduceAfterCare } from "./introduce-after-care/IntroduceAfterCare";
import { Differentiation } from "./differentiation/Differentiation";
import { TheRooms } from "./the-rooms/TheRooms";
import { IdentityShift } from "./identity-shift/IdentityShift";
import { Transformation } from "./transformation/Transformation";
import { ValueStack } from "./value-stack/ValueStack";
import { SocialProof } from "./social-proof/SocialProof";
import { ObjectionBreaker } from "./objection-breaker/ObjectionBreaker";
import { FinalClose } from "./final-close/FinalClose";
import { Footer } from "./footer/Footer";
import { StickyCta } from "./sticky-cta/StickyCta";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-w-0 overflow-x-hidden bg-app">
        <Hero />
        <MirrorReality />
        <BreakStrategy />
        <IntroduceAfterCare />
        <Differentiation />
        <TheRooms />
        <IdentityShift />
        <Transformation />
        <ValueStack />
        <SocialProof />
        <ObjectionBreaker />
        <FinalClose />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
