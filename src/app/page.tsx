import React from 'react'
import MainBanner from './components/mainbanner/MainBanner'
import ServicesSection from './components/servicesSection/ServicesSection'
import BlogSection from './components/BlogSection/BlogSection'
import BrowseCategory from './components/BrowseCategory/BrowseCategory'
import AstrologerSection from './components/AstrologerSection/AstrologerSection'
import CelebritySpotlight from './components/CelebritySpotlight/CelebritySpotlight'
import PoojaSection from './components/PoojaSection/PoojaSection'
import DailyHoroscope from './components/DailyHoroscope/DailyHoroscope'
import HowItWorks from './components/worksection/HowItWorks'
import Testimonials from './components/clientreview/Testimonials'
import CtaSection from './components/CtaSection/CtaSection'
import PersonalizedServices from './components/personalizedservices/PersonalizedServices'
import TrustSection from './components/TrustSection/TrustSection'

function page() {
  return (
    <div>
      <MainBanner />
      <ServicesSection />
      <AstrologerSection />
      <CelebritySpotlight />
      <BrowseCategory />
      <PoojaSection />
      <DailyHoroscope />
      <HowItWorks />
      <PersonalizedServices />
      <Testimonials />
      <BlogSection />
      <CtaSection />
      <TrustSection />
    </div>
  )
}

export default page
