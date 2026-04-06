import { useEffect, useMemo, useState } from 'react'

const resolvePublicAsset = (path) => `${import.meta.env.BASE_URL}${path}`

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
    <div className="max-w-3xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/40">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 px-4 py-2 text-sm font-semibold mb-4">Νέο κουίζ</div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-3">Κουίζ ΑνΑΔ - Εκπαιδευτής Δια Βίου Μάθησης</h1>
        <p className="max-w-2xl text-slate-600 leading-7">Επιλέξτε πόσες ερωτήσεις θέλετε να απαντήσετε. Η εφαρμογή θα δημιουργήσει αυτόματα έναν ισορροπημένο διαγωνισμό με μισές ερωτήσεις πολλαπλής επιλογής και μισές σωστού/λάθους.</p>
      </div>
      <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-inner shadow-slate-100/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-700 font-medium">Ερωτήσεις</span>
          <span className="text-slate-900 text-lg font-semibold">{value}</span>
        </div>
        <input
          type="range"
          min="2"
          max="100"
          step="2"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full accent-slate-900"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-center mb-7">
        <div className="p-5 rounded-[1.75rem] bg-slate-950/95 text-white shadow-lg shadow-slate-950/10">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-300 mb-2">Πολλαπλής Επιλογής</div>
          <div className="text-4xl font-bold">{mcqCount}</div>
        </div>
        <div className="p-5 rounded-[1.75rem] bg-white border border-slate-200 shadow-sm">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Σωστό/Λάθος</div>
          <div className="text-4xl font-bold text-slate-900">{tfCount}</div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="w-full py-4 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 text-white text-lg font-semibold shadow-xl shadow-slate-900/20 hover:from-slate-800 hover:to-slate-600 transition-all"
      >
        Έναρξη Κουίζ
      </button>
    </div>
  )
}

const MCQQuestion = ({ question, answer, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-100 p-6 text-slate-900 shadow-sm border border-slate-200">
        <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-2">Πολλαπλής επιλογής</div>
        <div className="text-2xl font-semibold leading-9">{question.question}</div>
      </div>
      <div className="grid gap-4">
        {Object.entries(question.options).map(([key, option]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`w-full text-left rounded-3xl border px-5 py-5 transition duration-200 ${answer === key ? 'border-slate-900 bg-slate-100 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-900 hover:bg-slate-50'}`}
          >
            <div className="font-semibold text-slate-900">{key.toUpperCase()}. {option}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

const TrueFalseQuestion = ({ question, answer, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-100 p-6 text-slate-900 shadow-sm border border-slate-200">
        <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-2">Σωστό ή Λάθος</div>
        <div className="text-2xl font-semibold leading-9">{question.question}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {['true', 'false'].map((value) => (
          <button
            key={value}
            onClick={() => onSelect(value === 'true')}
            className={`py-5 rounded-3xl text-base font-semibold transition duration-200 ${answer === (value === 'true') ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-white border border-slate-200 text-slate-800 hover:border-slate-900 hover:bg-slate-50'}`}
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
    <div className="max-w-4xl mx-auto p-8 bg-white/95 rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/40">
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-900 text-white p-5 shadow-lg shadow-slate-900/10">
          <div className="text-sm uppercase tracking-[0.2em] text-sky-300 mb-2">Αποτέλεσμα</div>
          <div className="text-3xl font-semibold">{correctCount}/{answers.length}</div>
          <p className="mt-2 text-sm text-slate-300">Σωστές απαντήσεις</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Λάθη</div>
          <div className="text-3xl font-semibold text-rose-600">{incorrect.length}</div>
          <p className="mt-2 text-sm text-slate-500">Λανθασμένες ερωτήσεις</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Χρόνος</div>
          <div className="text-3xl font-semibold text-slate-900">{formatTime(time)}</div>
          <p className="mt-2 text-sm text-slate-500">Συνολικά</p>
        </div>
      </div>
      {incorrect.length === 0 ? (
        <div className="p-8 bg-emerald-100 rounded-[1.75rem] border border-emerald-200 shadow-sm">
          <p className="text-emerald-900 font-semibold text-lg">Συγχαρητήρια! Απαντήσατε σωστά όλες τις ερωτήσεις.</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="text-slate-700 font-semibold text-lg">Ερωτήσεις που απαντήσατε λάθος</div>
          {incorrect.map((entry, index) => {
            const question = questions.find((item) => item.id === entry.questionId)
            const userAnswer = question.type === 'mcq'
              ? question.options[entry.userAnswer] || 'Δεν επιλέχθηκε απάντηση'
              : entry.userAnswer === true ? 'Σωστό' : 'Λάθος'
            const correctAnswer = question.type === 'mcq'
              ? question.options[question.correctAnswer]
              : question.correctAnswer === true ? 'Σωστό' : 'Λάθος'

            return (
              <div key={entry.questionId} className="p-6 rounded-[1.75rem] border border-rose-200 bg-rose-50 shadow-sm">
                <div className="text-slate-800 font-semibold mb-3">{index + 1}. {question.question}</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 border border-slate-200">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Η απάντησή σας</div>
                    <div className="font-semibold text-rose-700">{userAnswer}</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 border border-slate-200">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Σωστή απάντηση</div>
                    <div className="font-semibold text-slate-900">{correctAnswer}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <button
        onClick={onRetry}
        className="mt-10 w-full py-4 rounded-3xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
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
        fetch(resolvePublicAsset('mcq.json')),
        fetch(resolvePublicAsset('truefalse.json')),
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
    <div className="relative min-h-screen bg-slate-50 py-10 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-200/60 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl" />
      <div className="max-w-5xl mx-auto relative">
        {phase === 'setup' && (
          <QuestionSelector
            value={questionCount}
            onChange={setQuestionCount}
            onStart={startQuiz}
          />
        )}

        {phase === 'quiz' && currentQuestion && (
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <div className="text-slate-500">Πρόοδος</div>
                <div className="text-2xl font-semibold">{progressLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-500">Χρόνος</div>
                <div className="text-2xl font-semibold">{formatTime(time)}</div>
              </div>
            </div>
            <div className="h-3 mb-7 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-slate-900 transition-all"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
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
              className="mt-8 w-full py-4 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed hover:from-slate-800 hover:to-slate-600"
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
