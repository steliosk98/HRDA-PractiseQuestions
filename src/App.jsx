import { useEffect, useMemo, useState } from 'react'

const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  return `${mins}:${secs}`
}

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5)
}

const QuestionSelector = ({ value, onChange, onStart }) => {
  const mcqCount = Math.ceil(value / 2)
  const tfCount = Math.floor(value / 2)

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">Κουίζ ΑνΑΔ - Εκπαιδευτής Δια Βίου Μάθησης</h1>
      <p className="mb-6 text-slate-600">Επιλέξτε πόσες ερωτήσεις θέλετε να απαντήσετε. Η εφαρμογή θα χωρίσει αυτόματα ανάμεσα σε πολλαπλής επιλογής και σωστό/λάθος.</p>
      <div className="mb-4">
        <label className="block text-slate-700 mb-2">Αριθμός ερωτήσεων: {value}</label>
        <input
          type="range"
          min="2"
          max="100"
          step="2"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-center mb-6">
        <div className="p-4 rounded-2xl bg-slate-100">
          <div className="text-slate-500">MCQ</div>
          <div className="text-2xl font-bold">{mcqCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-100">
          <div className="text-slate-500">Σωστό/Λάθος</div>
          <div className="text-2xl font-bold">{tfCount}</div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="w-full py-3 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
      >
        Έναρξη Κουίζ
      </button>
    </div>
  )
}

const MCQQuestion = ({ question, answer, onSelect }) => {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-slate-500 mb-2">Πολλαπλής επιλογής</div>
        <div className="text-xl font-semibold">{question.question}</div>
      </div>
      <div className="grid gap-3">
        {Object.entries(question.options).map(([key, option]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`w-full text-left rounded-2xl border px-4 py-4 transition ${answer === key ? 'border-slate-900 bg-slate-100' : 'border-slate-200 bg-white hover:border-slate-900'}`}
          >
            <div className="font-semibold capitalise">{key.toUpperCase()}. {option}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

const TrueFalseQuestion = ({ question, answer, onSelect }) => {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-slate-500 mb-2">Σωστό ή Λάθος</div>
        <div className="text-xl font-semibold">{question.question}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {['true', 'false'].map((value) => (
          <button
            key={value}
            onClick={() => onSelect(value === 'true')}
            className={`py-4 rounded-2xl text-sm font-semibold transition ${answer === (value === 'true') ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 hover:border-slate-900'}`}
          >
            {value === 'true' ? 'Σωστό' : 'Λάθος'}
          </button>
        ))}
      </div>
    </div>
  )
}

const ResultsPage = ({ answers, questions, time, onRetry }) => {
  const incorrect = answers.filter((entry) => !entry.isCorrect)
  const correctCount = answers.length - incorrect.length

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Αποτέλεσμα</h2>
        <p className="text-slate-600">Σωστές απαντήσεις: {correctCount} / {answers.length}</p>
        <p className="text-slate-600">Χρόνος: {formatTime(time)}</p>
      </div>
      {incorrect.length === 0 ? (
        <div className="p-6 bg-emerald-100 rounded-3xl border border-emerald-200">
          <p className="text-emerald-900 font-semibold">Συγχαρητήρια! Απαντήσατε σωστά όλες τις ερωτήσεις.</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="text-slate-700 font-semibold mb-3">Ερωτήσεις που απαντήσατε λάθος</div>
          {incorrect.map((entry, index) => {
            const question = questions.find((item) => item.id === entry.questionId)
            const userAnswer = question.type === 'mcq'
              ? question.options[entry.userAnswer] || 'Δεν επιλέχθηκε απάντηση'
              : entry.userAnswer === true ? 'Σωστό' : 'Λάθος'
            const correctAnswer = question.type === 'mcq'
              ? question.options[question.correctAnswer]
              : question.correctAnswer === true ? 'Σωστό' : 'Λάθος'

            return (
              <div key={entry.questionId} className="p-5 rounded-3xl border border-rose-200 bg-rose-50">
                <div className="text-slate-800 font-semibold">{index + 1}. {question.question}</div>
                <div className="mt-3 text-sm text-slate-600">Η απάντησή σας: <span className="font-semibold text-rose-700">{userAnswer}</span></div>
                <div className="mt-1 text-sm text-slate-600">Σωστή απάντηση: <span className="font-semibold text-slate-900">{correctAnswer}</span></div>
              </div>
            )
          })}
        </div>
      )}
      <button
        onClick={onRetry}
        className="mt-8 w-full py-3 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
      >
        Δοκιμάστε ξανά
      </button>
    </div>
  )
}

function App() {
  const [mcqData, setMcqData] = useState([])
  const [tfData, setTfData] = useState([])
  const [questionCount, setQuestionCount] = useState(20)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState('setup')
  const [time, setTime] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const [mcqResp, tfResp] = await Promise.all([
        fetch('/mcq.json'),
        fetch('/truefalse.json'),
      ])
      const [mcqJson, tfJson] = await Promise.all([mcqResp.json(), tfResp.json()])
      setMcqData(mcqJson)
      setTfData(tfJson)
    }
    loadData()
  }, [])

  useEffect(() => {
    let timer
    if (phase === 'quiz') {
      timer = setInterval(() => {
        setTime((current) => current + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [phase])

  const currentQuestion = quizQuestions[currentIndex]

  const startQuiz = () => {
    const selectedMcq = shuffleArray(mcqData).slice(0, questionCount / 2)
    const selectedTf = shuffleArray(tfData).slice(0, questionCount / 2)
    const combined = shuffleArray([...selectedMcq, ...selectedTf])

    setQuizQuestions(combined)
    setCurrentIndex(0)
    setAnswers([])
    setCurrentAnswer(null)
    setTime(0)
    setPhase('quiz')
  }

  const handleAnswer = (value) => {
    if (!currentQuestion) return
    setCurrentAnswer(value)
  }

  const handleNext = () => {
    if (!currentQuestion) return
    const isCorrect = currentQuestion.type === 'mcq'
      ? currentAnswer === currentQuestion.correctAnswer
      : currentAnswer === currentQuestion.correctAnswer

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        userAnswer: currentAnswer,
        isCorrect,
      },
    ])

    setCurrentAnswer(null)
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setPhase('results')
    }
  }

  const handleRetry = () => {
    setPhase('setup')
  }

  const progressLabel = useMemo(() => {
    return `${currentIndex + 1} από ${quizQuestions.length}`
  }, [currentIndex, quizQuestions.length])

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {phase === 'setup' && (
          <QuestionSelector
            value={questionCount}
            onChange={setQuestionCount}
            onStart={startQuiz}
          />
        )}

        {phase === 'quiz' && currentQuestion && (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="text-slate-500">Πρόοδος</div>
                <div className="text-2xl font-semibold">{progressLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-500">Χρόνος</div>
                <div className="text-2xl font-semibold">{formatTime(time)}</div>
              </div>
            </div>
            <div className="space-y-6">
              {currentQuestion.type === 'mcq' ? (
                <MCQQuestion
                  question={currentQuestion}
                  answer={currentAnswer}
                  onSelect={handleAnswer}
                />
              ) : (
                <TrueFalseQuestion
                  question={currentQuestion}
                  answer={currentAnswer}
                  onSelect={handleAnswer}
                />
              )}
            </div>
            <button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className="mt-8 w-full py-3 rounded-2xl bg-slate-900 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              {currentIndex + 1 === quizQuestions.length ? 'Ολοκλήρωση' : 'Επόμενη ερώτηση'}
            </button>
          </div>
        )}

        {phase === 'results' && (
          <ResultsPage answers={answers} questions={quizQuestions} time={time} onRetry={handleRetry} />
        )}
      </div>
    </div>
  )
}

export default App
