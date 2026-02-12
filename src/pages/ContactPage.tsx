import { useState } from "react";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question or feedback? We'd love to hear from you.
        </p>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <div className={styles.infoItem}>
              <h3>Email</h3>
              <p>
                <a href="mailto:hello@afterwards.com">hello@afterwards.com</a>
              </p>
            </div>
            <div className={styles.infoItem}>
              <h3>Website</h3>
              <p>www.afterwards.com</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Response Time</h3>
              <p>We typically respond within 24 hours</p>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {submitted && (
              <div className={styles.successMessage}>
                Thank you! We've received your message and will get back to you
                soon.
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
