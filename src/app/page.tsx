import React from 'react'
import MainBanner from './components/mainbanner/MainBanner'
import ServicesSection from './components/servicesSection/ServicesSection'
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
      <HowItWorks />
      <PersonalizedServices />
      {/* <Testimonials /> */}
      <CtaSection />
      <TrustSection />
    </div>
  )
}

export default page
