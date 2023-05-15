import "./AboutUs-module.css";

import kalyan from "../../Assets/kalyan.jpg";
import aniket from "../../Assets/aniket.jpg";
import sanjeev from "../../Assets/sanjeev.jpg";
import saiCharan from "../../Assets/sai.jpg";
import hardeep from "../../Assets/hardeep.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="company-heading intro-type" id="parallax-one">
        <div className="container">
          <div className="row product-title-info">
            <div className="col-md-12">
              <h1>About Us</h1>
            </div>
          </div>
        </div>
        <div className="parallax" id="parallax-cta">
          &nbsp;
        </div>
      </section>

      <section
        className="story-section company-sections ct-u-paddingBoth100 paddingBothHalf noTopMobilePadding"
        id="section"
      >
        <div className="container text-center">
          <h2>Who we are</h2>
          <h3>about our platform..</h3>
          <div className="col-md-8 col-md-offset-2">
            <div className="red-border">&nbsp;</div>
            <p className="ct-u-size22 ct-u-fontWeight300 marginTop40">
              Welcome to OReselling, your go-to platform for buying and selling.
              Whether you're looking to declutter your home or find great deals
              on pre-owned items, OReselling is here to connect you with a
              vibrant community of buyers and sellers. With our user-friendly
              interface and extensive categories, you can easily navigate
              through listings and discover a wide range of products.
            </p>
          </div>
        </div>
      </section>

     

      
  <div className="containerImg">
    <div className="box">
    <a href="https://www.linkedin.com/in/kalyanmishra/">
      <img id="personImg" src={kalyan} alt="Image 1"/>
    </a>
    <h3>Kalyan Mishra</h3>
    </div>


    <div className="box">
    <a href="https://www.linkedin.com/in/ACoAAC08n10BdwRIOXIl6cmp2sYMlUNCIYzjR0o/">
      <img id="personImg" src={sanjeev} alt="Image 2"/>
    </a>
    <h3>Sanjeev Cho.</h3>
    </div>

    <div className="box">
    <a href="https://www.linkedin.com/in/namballa-venkata-sai-charan-a1a205192/">
      <img id="personImg" src={saiCharan} alt="Image 3"/>
    </a>
    <h3>Sai Charan</h3>
    </div>


    <div className="box">
    <a href="https://www.linkedin.com/in/aniket-jha-791346217/">
      <img id="personImg" src={aniket} alt="Image 4"/>
    </a>
    <h3>Aniket Jha</h3>
    </div>
    <div className="box">
    <a href="https://www.linkedin.com/in/hardeep-singh-39b403195/">
      <img id="personImg" src={hardeep} alt="Image 5"/>
      </a>
      <h3>Hardeep Singh</h3>
    </div>
  </div>


   
    </>
  );
};

export default AboutUs;
