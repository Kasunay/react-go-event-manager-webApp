// src/pages/HomePage.tsx
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import CTASection from '../components/sections/CTASection';


const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <CTASection />
    </Layout>
  );
};

export default HomePage;