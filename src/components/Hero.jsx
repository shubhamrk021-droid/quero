import { ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <Zap size={16} className="badge-icon" />
            <span>Your Journey to Success Starts Here</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Practice. Analyze.<br />
            <span className="text-primary">Excel.</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            Comprehensive mock tests, PYQs and MCQ practice for NEET UG, NEET PG & other entrance exams.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <button className="btn btn-primary">
              Start Practicing
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary">Explore Exams</button>
          </motion.div>

          <motion.div className="hero-features" variants={itemVariants}>
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <div>
                <div className="feature-title">Exam-Level Mock Tests</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📝</div>
              <div>
                <div className="feature-title">PYQs with Solutions</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div>
                <div className="feature-title">Detailed Performance Analysis</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-illustration">
            <div className="illustration-content">
              <div className="books-stack">
                <div className="book physics">PHYSICS</div>
                <div className="book chemistry">CHEMISTRY</div>
                <div className="book biology">BIOLOGY</div>
              </div>
              <div className="device-mockup">
                <div className="device-screen">
                  <div className="screen-header">Mock Test</div>
                  <div className="screen-content">
                    <div className="checkmark">✓</div>
                  </div>
                </div>
              </div>
              <div className="stethoscope">🩺</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
