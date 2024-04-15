import { LandingContent } from "@/components/custom/landing-content";
import { LandingHero } from "@/components/custom/landing-hero";
import LandingNavbar from "@/components/custom/landing-navbar";
import React from "react";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
