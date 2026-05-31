import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import './ExamCards.css'

const ExamCards = () => {
  const exams = [
    {
      title: 'NEET UG',
      description: 'Mock Tests & PYQs',
      icon: '🩺',
      color: '#6c5ce7',
    },
    {
      title: 'NEET PG',
      description: 'Mock Tests & PYQs',
      icon: '👨‍⚕️',
      color: '#7b68ee',
    },
    {
      title: 'Other Exams',
      description: 'AIIMS, JIPMER, INI-CET & more',
      icon: '📚',
      color: '#a29bfe',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="exam-cards-section">
      <div className="section-container">
        <h2 className="section-title">Choose Your Exam</h2>

        <motion.div
          className="cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {exams.map((exam, index) => (
            <motion.div key={index} className="exam-card" variants={cardVariants}>
              <div className="card-icon" style={{ backgroundColor: exam.color }}>
                {exam.icon}
              </div>
              <h3 className="card-title">{exam.title}</h3>
              <p className="card-description">{exam.description}</p>
              <button className="card-arrow">
                <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ExamCards
