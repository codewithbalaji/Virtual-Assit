import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

function Home() {
 

  return (
    <div>
      {/* header */}
      <Navbar />
      {/* hero */}
      <Hero />
      {/* Features */}
      <Features/>
      {/* Pricing */}
      <Pricing/>
      {/* footer */}
      <Footer/>

    </div>
  );
}

export default Home;
