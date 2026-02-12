import styles from "./PrivacyPage.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Privacy Policy</h1>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Afterwards ("we," "us," "our," or "Company") is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect on the Site includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Name, email address, and other
              information you voluntarily provide
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access the Site, such as your IP
              address, browser type, and pages visited
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information necessary
              to process transactions
            </li>
            <li>
              <strong>Data From Third Parties:</strong> Information received
              from third parties including but not limited to marketing partners
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account</li>
            <li>Generate invoices and send billing information</li>
            <li>Perform analytics regarding your use of our services</li>
            <li>Process your transactions and send related information</li>
            <li>Email you regarding your account or order</li>
            <li>
              Fulfill and manage purchases, orders, payments, and other
              transactions related to the Site
            </li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>
        </section>

        <section>
          <h2>4. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain
            circumstances:
          </p>
          <ul>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the
              release of information is necessary to comply with the law
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your
              information with parties who assist us in operating our website
              and conducting our business
            </li>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your
              information in connection with a merger, sale of company assets,
              bankruptcy, or other business transaction
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to
            protect your personal information. However, no method of
            transmission over the Internet or method of electronic storage is
            100% secure.
          </p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </p>
          <p>
            Email: privacy@afterwards.com
            <br />
            Website: www.afterwards.com
          </p>
        </section>

        <section>
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            Afterwards reserves the right to modify this privacy policy at any
            time. Changes and clarifications will take effect immediately upon
            their posting to the website. If we make material changes to this
            policy, we will notify you here that it has been updated.
          </p>
        </section>
      </div>
    </div>
  );
}
