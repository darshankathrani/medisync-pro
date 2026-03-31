import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const boxes = [
    {
      title: "Opening Hours",
      iconClass: "ri-timer-2-line",
      content: ["Mon - Fri", "10:00 AM - 6:00 PM"],
      footer: "Sunday Closed",
    },
    {
      title: "Session Duration",
      iconClass: "ri-time-line",
      content: ["Consultation", "30 Minutes"],
      footer: "One session per booking",
    },
    {
      title: "Booking Type",
      iconClass: "ri-calendar-check-line",
      content: ["Online Appointment", "Prior Booking Required"],
      footer: "No walk-ins allowed",
    },
    {
      title: "Location",
      iconClass: "ri-map-pin-line",
      content: [
        "Downtown Clinic",
        "2nd Floor, City Plaza",
        "Near Central Mall",
      ],
      footer: "Easy to reach",
    },
  ];

  const healthcareRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    const anim = gsap.to(wordRef.current, {
      x: "-50%",
      ease: "none",
      scrollTrigger: {
        trigger: healthcareRef.current,
        scroller: "body",
        start: "top 5%",
        end: "+=1200",
        scrub: 2,
        pin: true,
      },
    });

    return () => {
      // 1. Kill the specific animation
      anim.kill();
      // 2. IMPORTANT: Revert everything ScrollTrigger did to the DOM
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill(true); // 'true' tells it to reset the HTML back to normal
      }
      // 3. Just to be safe, kill all instances
      ScrollTrigger.getAll().forEach((t) => t.revert());
    };
  }, []);

  return (
    <>
      <div id="home-wrapper">
        <section className={styles.section1}>
          <div className={styles.container1}>
            <div className={styles.left}>
              <h3>Medical</h3>
              <h1>Healthcare Solutions</h1>
              <p>
                We provide reliable healthcare solutions focused on quality
                consultation and patient-centered care. Our platform helps
                patients easily book appointments, manage schedules, and receive
                timely medical attention through a simple and organized booking
                system.
              </p>

              <button
                className={styles.bookBtn}
                onClick={() => navigate("/booking")}
              >
                Book Now
              </button>
            </div>

            <div className={styles.right}>
              <img
                src="https://ateliahealth.com/images/healthsystem/AIScribe.svg"
                alt=""
              />
            </div>
          </div>
        </section>

        <section className={styles.healthcare} ref={healthcareRef}>
          <h1 ref={wordRef}>
            HEALTHCARE
            <i className="ri-syringe-line"></i>
            <img
              src="https://www.midas.hospital/assets/images/page-header/page-header-img-2.png"
              alt=""
            />
          </h1>
        </section>

        <section className={styles.section2}>
          <div className={styles.container2}>
            {boxes.map((box, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={styles.box}>
                    <h3>
                      {box.title} <i className={box.iconClass}></i>
                    </h3>

                    <div className={styles.content}>
                      <p>{box.content[0]}</p>
                      <p>{box.content[1]}</p>
                    </div>

                    <span>{box.footer}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>

        <section className={styles.section3}>
          <div className={styles.container3}>
            <div className={styles.heading1}>
              <h3>Services</h3>
              <h2>Our Medical Services</h2>
            </div>

            <div className={styles.services}>
              <div className={styles.circleDiv}>
                <div className={styles.circle}>
                  <i className="ri-hospital-fill"></i>
                </div>
              </div>
              <div className={styles.content1}>
                <h1>Primary Health Consultation</h1>
                <p>
                  We provide comprehensive medical consultations focused on
                  accurate diagnosis and personalized treatment. Our experienced
                  healthcare professionals ensure quality care through
                  structured appointments and patient-centric services.
                </p>

                <p>
                  Through scheduled consultations, we aim to deliver efficient
                  care, clear communication, and a comfortable experience for
                  every patient.
                </p>

                <button
                  className={styles.learnMoreBtn}
                  onClick={() => {
                    navigate("/booking");
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section4}>
          <div className={styles.container4}>
            <div className={styles.heading2}>
              <h3>Features</h3>
              <h2>Our Speciality</h2>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureDiv}>
                <div className={styles.left1}>
                  <div className={styles.icon1}>
                    <i className="ri-hospital-line"></i>
                  </div>

                  <div className={styles.content3}>
                    <h2>Online Appointment</h2>
                    <p>
                      Book medical consultations online through a simple and
                      reliable appointment system designed to ensure timely care
                      and an organized patient experience.
                    </p>

                    <button className={styles.learnMoreBtn}>Learn More</button>
                  </div>
                </div>
                <div className={styles.right1}>
                  <img
                    src="https://www.midas.hospital/assets/images/page-header/page-header-img-2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerBrand}>
              <h2>
                <i className="ri-stethoscope-line"></i> MedCare
              </h2>
              <p>
                Providing world-class healthcare solutions with a touch of care
                and advanced technology.
              </p>
              <div className={styles.socials}>
                <i className="ri-facebook-fill"></i>
                <i className="ri-twitter-fill"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-linkedin-fill"></i>
              </div>
            </div>

            <div className={styles.footerLinks}>
              <h3>Quick Links</h3>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </div>

            <div className={styles.footerContact}>
              <h3>Get In Touch</h3>
              <p>
                <i className="ri-mail-line"></i> support@medical.com
              </p>
              <p>
                <i className="ri-phone-line"></i> +1 (234) 567-890
              </p>
              <p>
                <i className="ri-map-pin-2-line"></i> City Plaza, Downtown
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>
              &copy; 2026 Medical Healthcare Solutions. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
