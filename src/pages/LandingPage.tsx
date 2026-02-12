import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "./LandingPage.module.css";
import hero from "../assets/hero.jpg";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isSignedIn, navigate]);

  const handleGetStarted = () => {
    navigate("/signup");
  };
  return (
    <div>
      {/* Hero section */}
      <section className={styles.hero}>
        <img src={hero} alt="Hero" />
        <div className={styles.heroContent}>
          <h1>Afterwards</h1>
          <p>Photos, Uncompressed, Afterwards</p>
          <button className={styles.ctaButton} onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className={styles.features}>
        <h2>Built for Real Photo Sharing</h2>

        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <h3> Original Quality</h3>
            <p>
              No compression. Your photos stay exactly as captured — perfect for
              downloading and editing later.
            </p>
          </div>

          <div className={styles.feature}>
            <h3>Privacy First</h3>
            <p>
              No account needed to upload. Share a link, collect photos, and
              they're gone in a few days. Simple and private.
            </p>
          </div>

          <div className={styles.feature}>
            <h3>Quick & Easy</h3>
            <p>
              Create an album in seconds. Friends upload via link. Download
              everything and move on with your life.
            </p>
          </div>

          <div className={styles.feature}>
            <h3>Web + Mobile</h3>
            <p>
              Transfer photos from your camera to your phone, or grab your
              friend's shots. Works anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create an Album</h3>
            <p>Set up a temporary album in seconds. No account required.</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Share the Link</h3>
            <p>Send the link to your friends. They can access it instantly.</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Upload Photos</h3>
            <p>
              Everyone adds their photos in original quality. No compression.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3>Download & Enjoy</h3>
            <p>Grab all the photos and they auto-delete in a few days.</p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="faq" className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>How long do albums last?</h3>
            <p>
              Albums automatically delete after 1, 3, or 7 days — you choose
              when creating the album.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Is there a size limit?</h3>
            <p>
              Each photo can be up to 20MB. Perfect for high-quality camera
              photos.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Do I need an account?</h3>
            <p>
              You need an account to create an album, but your friends can
              upload photos without signing up.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Can I upload videos?</h3>
            <p>
              Not currently. This app is focused on photos only to keep it
              simple and fast.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA section */}
      <section className={styles.finalCta}>
        <h2>Ready to Share Your Memories?</h2>
        <p>
          Create your first album and start collecting photos in original
          quality.
        </p>
        <button className={styles.ctaButton} onClick={handleGetStarted}>
          Get Started Now
        </button>
      </section>
    </div>
  );
}
