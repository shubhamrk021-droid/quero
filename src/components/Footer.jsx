import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const logos = [
    { name: 'AIIMS', icon: '⚕️' },
    { name: 'JIPMER', icon: '🏥' },
    { name: 'PGIMER', icon: '🔬' },
    { name: 'NIMHANS', icon: '🧠' },
    { name: 'IITs', icon: '🎓' },
    { name: 'NIT', icon: '📚' },
    { name: 'AIIMS', icon: '💊' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="trusted-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="trusted-title">Trusted by Aspirants Across India</h2>
          <motion.div
            className="logos-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {logos.map((logo, index) => (
              <motion.div key={index} className="logo-item" variants={logoVariants}>
                <div className="logo-icon">{logo.icon}</div>
                <p className="logo-name">{logo.name}</p>
              </motion.div>
            ))}
            <div className="logo-item">
              <p className="more-text">& Many More</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-content">
            <div className="footer-column">
              <h3 className="footer-heading">Product</h3>
              <ul className="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-links">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Follow Us</h3>
              <ul className="footer-links">
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-section">
            <p className="footer-copyright">© 2024 Quero. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
