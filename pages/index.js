import Business from "@components/components/home/Business";
import Footer from "@components/components/home/Footer";
import HighLights from "@components/components/home/HighLights";
import LandingPage from "@components/components/home/LandingPage";
import OtherWorks from "@components/components/home/OtherWorks";
import Products from "@components/components/home/Products";
import SideLine from "@components/components/home/SideLine";
import Works from "@components/components/home/Works";
import LayoutCover from "@components/components/layout/LayoutCover";


export default function Home() {
  return (
    <LayoutCover title={'home | student space'}>
      <main>
        <section>
          <LandingPage />
        </section>
        <section>
          <Business/>
        </section>
        <section>
          <Works />
        </section>
        <section>
          <HighLights />
        </section>
        <section>
          <Products />
        </section>
        <section>
          <OtherWorks />
        </section>
        <section>
          <SideLine />
        </section>
        <section>
          <Footer />
        </section>
    </main>
    </LayoutCover>
  )
}