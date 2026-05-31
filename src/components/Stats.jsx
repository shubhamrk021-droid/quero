import { Users, FileText, BarChart3, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import './Stats.css'

const Stats = () => {
  const stats = [
    {
      icon: <Users size={32} />,
      value: '1M+',
      label: 'Students Trust Us',
    },
    {
      icon: <FileText size={32} />,
      value: '10K+',
      label: 'Mock Tests',
    },
    {
      icon: <BarChart3 size={32} />,
      value: '2.5L+',
      label: 'PYQs & MCQs',
    },
    {
      icon: <TrendingUp size={32} />,
      value: '95%',
      label: 'Exam Relevance',
    },
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="stats-section">
      <motion.div
        className="stats-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} className="stat-item" variants={statVariants}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Stats
