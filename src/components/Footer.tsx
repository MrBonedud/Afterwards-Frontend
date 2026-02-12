import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <p>&copy; 2026 Afterwards. All rights reserved.</p>
      </div>

      <div className={styles.footerLinks}>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
}
