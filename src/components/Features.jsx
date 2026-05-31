import { ArrowRight, BookOpen, Layers, Activity, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'
import './Features.css'

const Features = () => {
  const features = [
    {
      icon: <BookOpen size={28} />,
      title: 'Full Length Mock Tests',
      description: 'Real exam pattern with timed tests.',
    },
    {
      icon: <Layers size={28} />,
      title: 'Chapter-wise MCQs',
      description: 'Practice by chapter and boost accuracy.',
    },
    {
      icon: <Activity size={28} />,
      title: 'PYQs with Solutions',
      description: 'Previous year questions with detailed explanations.',
    },
    {
      icon: <BarChart2 size={28} />,
      title: 'Performance Analysis',
      description: 'Identify strengths, weaknesses and improve.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">SMART PREPARATION</p>
            <h2 className="section-heading">
              Everything You Need<br />to Crack Your Exam
            </h2>
            <p className="section-description">
              Structured practice, real exam experience and in-depth analysis to help you improve every day.
            </p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="feature-card" variants={featureVariants}>
                <div className="feature-icon-box">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="btn btn-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Start Your Preparation
            <ArrowRight size={20} />
          </motion.button>
        </div>

        <motion.div
          className="features-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="screen-header">
                <div className="header-time">9:41</div>
              </div>
              <div className="screen-body">
                <div className="welcome-message">Welcome back!</div>
                <div className="welcome-subtitle">Let's continue your preparation.</div>
                <div className="test-card">
                  <div className="test-name">NEET UG Mock Test 12</div>
                  <div className="test-meta">Full Syllabus Test</div>
                  <button className="start-button">Start Test</button>
                </div>
                <div className="progress-section">
                  <div className="progress-label">Your Progress</div>
                  <div className="stats-row">
                    <div className="progress-stat">
                      <div className="stat-num">24</div>
                      <div className="stat-name">Tests Done</div>
                    </div>
                    <div className="progress-stat">
                      <div className="stat-num">78%</div>
                      <div className="stat-name">Accuracy</div>
                    </div>
                    <div className="progress-stat">
                      <div className="stat-num">1523</div>
                      <div className="stat-name">Rank</div>
                    </div>
                  </div>
                </div>
                <div className="subject-performance">
                  <div className="perf-label">Subject Wise Performance</div>
                  <div className="perf-bar">
                    <div className="bar-item">
                      <div className="bar-label">Physics</div>
                      <div className="bar-fill" style={{ width: '72%', background: '#8b5cf6' }}></div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-label">Chemistry</div>
                      <div className="bar-fill" style={{ width: '80%', background: '#10b981' }}></div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-label">Biology</div>
                      <div className="bar-fill" style={{ width: '88%', background: '#f59e0b' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="screen-bottom-nav">
                <div className="nav-item active">🏠</div>
                <div className="nav-item">📋</div>
                <div className="nav-item">📊</div>
                <div className="nav-item">👤</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
