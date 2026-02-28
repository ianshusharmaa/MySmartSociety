import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* About Section */}
          <div>
            <h3 className="footer-section-title">About Us</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">About MySmartSociety</a>
              <a href="#" className="footer-link">Our Mission</a>
              <a href="#" className="footer-link">Features</a>
              <a href="#" className="footer-link">Blog</a>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="footer-section-title">Support</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Contact Us</a>
              <a href="#" className="footer-link">FAQ</a>
              <a href="#" className="footer-link">Report Issue</a>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="footer-section-title">Legal</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Cookie Policy</a>
              <a href="#" className="footer-link">Disclaimer</a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="footer-section-title">Contact</h3>
            <div className="footer-links">
              <a className="footer-contact-text footer-link" href="mailto:anshukumar.sharma.btechcse@ghrua.edu.in">
                Email: anshukumar.sharma.btechcse@ghrua.edu.in
              </a>
              <p className="footer-contact-text">Phone: +91 XXXXX XXXXX</p>
              <div className="footer-social">
                <a
                  className="footer-social-link"
                  href="https://www.linkedin.com/in/ianshusharma2005/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  className="footer-social-link"
                  href="https://www.instagram.com/ianshusharmaa/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  className="footer-social-link"
                  href="https://github.com/ianshusharmaa"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  className="footer-social-link"
                  href="mailto:anshukumar.sharma.btechcse@ghrua.edu.in"
                  aria-label="Email"
                >
                  <EmailIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} MySmartSociety | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
