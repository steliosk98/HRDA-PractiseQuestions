import { useEffect, useMemo, useState } from 'react'

const resolvePublicAsset = (path) => `${import.meta.env.BASE_URL}${path}`

const APP_MODES = {
  quiz: 'quiz',
  flashcards: 'flashcards',
}

const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  return `${mins}:${secs}`
}

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5)

const ModeToggle = ({ mode, onChange }) => (
  <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
    <button
      type="button"
      onClick={() => onChange(APP_MODES.quiz)}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        mode === APP_MODES.quiz ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      Κουίζ
    </button>
    <button
      type="button"
      onClick={() => onChange(APP_MODES.flashcards)}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        mode === APP_MODES.flashcards ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      Κάρτες
    </button>
  </div>
)

const QuizSelector = ({ value, onChange, onStart }) => {
  const mcqCount = Math.ceil(value / 2)
  const tfCount = Math.floor(value / 2)

  return (
    <>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          Νέο κουίζ
        </div>
        <h1 className="mb-3 mt-4 text-4xl font-semibold tracking-tight text-slate-900">
          Κουίζ ΑνΑΔ - Εκπαιδευτής Διά Βίου Μάθησης
        </h1>
        <p className="max-w-2xl leading-7 text-slate-600">
          Επιλέξτε πόσες ερωτήσεις θέλετε να απαντήσετε. Η εφαρμογή δημιουργεί αυτόματα ένα
          ισορροπημένο σετ με ερωτήσεις πολλαπλής επιλογής και σωστού/λάθους.
        </p>
      </div>

      <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-inner shadow-slate-100/80">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-slate-700">Ερωτήσεις</span>
          <span className="text-lg font-semibold text-slate-900">{value}</span>
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

      <div className="mb-7 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-[1.75rem] bg-slate-950/95 p-5 text-white shadow-lg shadow-slate-950/10">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-300">Πολλαπλής Επιλογής</div>
          <div className="text-4xl font-bold">{mcqCount}</div>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">Σωστό/Λάθος</div>
          <div className="text-4xl font-bold text-slate-900">{tfCount}</div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 py-4 text-lg font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:from-slate-800 hover:to-slate-600"
      >
        Έναρξη Κουίζ
      </button>
    </>
  )
}

const FlashcardSelector = ({ value, onChange, onStart, availableCount }) => {
  const sliderMax = Math.max(1, Math.min(40, availableCount))
  const isEmpty = availableCount === 0

  return (
    <>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
          Κάρτες
        </div>
        <h1 className="mb-3 mt-4 text-4xl font-semibold tracking-tight text-slate-900">
          Επαναληπτικές κάρτες με ερωτήσεις και απαντήσεις
        </h1>
        <p className="max-w-2xl leading-7 text-slate-600">
          Επιλέξτε πόσες ανοιχτές ερωτήσεις θέλετε να μελετήσετε.
        </p>
      </div>

      <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-inner shadow-slate-100/80">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-slate-700">Κάρτες</span>
          <span className="text-lg font-semibold text-slate-900">{isEmpty ? 0 : value}</span>
        </div>
        <input
          type="range"
          min="1"
          max={sliderMax}
          step="1"
          value={Math.min(value, sliderMax)}
          onChange={(event) => onChange(Number(event.target.value))}
          disabled={isEmpty}
          className="w-full accent-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="mt-4 text-sm text-slate-500">
          Διαθέσιμες κάρτες: {availableCount}. Μέγιστο ανά συνεδρία: {sliderMax}.
        </p>
      </div>

      <div className="mb-7 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">Περιεχόμενο</div>
        <div className="text-2xl font-semibold text-slate-900">
          {isEmpty ? 'Δεν υπάρχουν ακόμη κάρτες' : `${Math.min(value, sliderMax)} Κάρτες`}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Κάθε κάρτα εμφανίζει πρώτα την ερώτηση και μετά την απάντηση για γρήγορη επανάληψη.
        </p>
      </div>

      <button
        onClick={onStart}
        disabled={isEmpty}
        className="w-full rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 py-4 text-lg font-semibold text-white shadow-xl shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Έναρξη
      </button>
    </>
  )
}

const SetupPage = ({
  mode,
  onModeChange,
  questionCount,
  onQuestionCountChange,
  onQuizStart,
  flashcardCount,
  onFlashcardCountChange,
  onFlashcardsStart,
  openEndedCount,
}) => (
  <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/40 backdrop-blur-xl">
    <ModeToggle mode={mode} onChange={onModeChange} />

    {mode === APP_MODES.quiz ? (
      <QuizSelector value={questionCount} onChange={onQuestionCountChange} onStart={onQuizStart} />
    ) : (
      <FlashcardSelector
        value={flashcardCount}
        onChange={onFlashcardCountChange}
        onStart={onFlashcardsStart}
        availableCount={openEndedCount}
      />
    )}
  </div>
)

const MCQQuestion = ({ question, answer, onSelect }) => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-slate-900 shadow-sm">
      <div className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-500">Πολλαπλής επιλογής</div>
      <div className="text-2xl font-semibold leading-9">{question.question}</div>
    </div>
    <div className="grid gap-4">
      {Object.entries(question.options).map(([key, option]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`w-full rounded-3xl border px-5 py-5 text-left transition duration-200 ${
            answer === key
              ? 'border-slate-900 bg-slate-100 shadow-sm'
              : 'border-slate-200 bg-white hover:border-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="font-semibold text-slate-900">
            {key.toUpperCase()}. {option}
          </div>
        </button>
      ))}
    </div>
  </div>
)

const TrueFalseQuestion = ({ question, answer, onSelect }) => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-slate-900 shadow-sm">
      <div className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-500">Σωστό ή Λάθος</div>
      <div className="text-2xl font-semibold leading-9">{question.question}</div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {['true', 'false'].map((value) => (
        <button
          key={value}
          onClick={() => onSelect(value === 'true')}
          className={`rounded-3xl py-5 text-base font-semibold transition duration-200 ${
            answer === (value === 'true')
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'border border-slate-200 bg-white text-slate-800 hover:border-slate-900 hover:bg-slate-50'
          }`}
        >
          {value === 'true' ? 'Σωστό' : 'Λάθος'}
        </button>
      ))}
    </div>
  </div>
)

const FlashcardStudy = ({ cards, currentIndex, revealAnswer, onAdvance, onRestart }) => {
  const currentCard = cards[currentIndex]

  if (!currentCard) {
    return null
  }

  const isLastCard = currentIndex + 1 === cards.length

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-slate-500">Flash card</div>
          <div className="text-2xl font-semibold">
            {currentIndex + 1} από {cards.length}
          </div>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          Πίσω στην αρχή
        </button>
      </div>

      <div className="mb-7 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-slate-900 transition-all"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      <div className="mt-2">
        <div className="relative [perspective:1400px]">
          <div
            className="relative w-full rounded-[2rem]"
          >
            <div
              className={`rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/60 transition-all duration-500 sm:p-8 ${
                revealAnswer
                  ? 'pointer-events-none invisible absolute inset-0 opacity-0 [transform:rotateY(-180deg)]'
                  : 'relative opacity-100 [transform:rotateY(0deg)]'
              }`}
            >
              <div className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-500">Ερώτηση</div>
              <div className="flex min-h-[14rem] items-center sm:min-h-[15rem]">
                <div className="text-2xl font-semibold leading-[1.35] text-slate-900 sm:text-3xl">{currentCard.question}</div>
              </div>
            </div>

            <div
              className={`rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-xl shadow-amber-200/40 transition-all duration-500 sm:p-8 ${
                revealAnswer
                  ? 'relative opacity-100 [transform:rotateY(0deg)]'
                  : 'pointer-events-none invisible absolute inset-0 opacity-0 [transform:rotateY(180deg)]'
              }`}
            >
              <div className="mb-3 text-sm uppercase tracking-[0.2em] text-amber-700">Απάντηση</div>
              <div className="flex min-h-[14rem] items-center sm:min-h-[15rem]">
                <div className="text-lg leading-[1.7] text-slate-900 sm:text-2xl">{currentCard.answer}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onAdvance}
            className={`min-w-[18rem] rounded-full px-8 py-5 text-lg font-semibold shadow-xl transition ${
              revealAnswer
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30 hover:from-amber-400 hover:to-orange-400'
                : 'bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-slate-900/25 hover:from-slate-800 hover:to-slate-600'
            }`}
          >
            {revealAnswer ? (isLastCard ? 'Ολοκλήρωση' : 'Επόμενη Κάρτα') : 'Δες την Απάντηση'}
          </button>
        </div>
      </div>
    </div>
  )
}

const FlashcardCompletion = ({ count, onRetry }) => (
  <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/40">
    <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
      <div className="mb-2 text-sm uppercase tracking-[0.2em] text-emerald-700">Ολοκλήρωση</div>
      <h2 className="text-3xl font-semibold text-emerald-900">Ο κύκλος επανάληψης ολοκληρώθηκε</h2>
      <p className="mt-3 leading-7 text-emerald-900/80">
        Μελέτησες {count} κάρτες. Μπορείς να ξεκινήσεις ξανά για νέο τυχαίο σύνολο καρτών.
      </p>
    </div>

    <button
      type="button"
      onClick={onRetry}
      className="mt-8 w-full rounded-3xl bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800"
    >
      Νέο σετ καρτών
    </button>
  </div>
)

const ResultsPage = ({ answers, questions, time, onRetry }) => {
  const incorrect = answers.filter((entry) => !entry.isCorrect)
  const correctCount = answers.length - incorrect.length

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/40">
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/10">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-sky-300">Αποτέλεσμα</div>
          <div className="text-3xl font-semibold">
            {correctCount}/{answers.length}
          </div>
          <p className="mt-2 text-sm text-slate-300">Σωστές απαντήσεις</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">Λάθη</div>
          <div className="text-3xl font-semibold text-rose-600">{incorrect.length}</div>
          <p className="mt-2 text-sm text-slate-500">Λανθασμένες ερωτήσεις</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">Χρόνος</div>
          <div className="text-3xl font-semibold text-slate-900">{formatTime(time)}</div>
          <p className="mt-2 text-sm text-slate-500">Συνολικά</p>
        </div>
      </div>

      {incorrect.length === 0 ? (
        <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-100 p-8 shadow-sm">
          <p className="text-lg font-semibold text-emerald-900">
            Συγχαρητήρια! Απάντησες σωστά όλες τις ερωτήσεις.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="text-lg font-semibold text-slate-700">Ερωτήσεις που απαντήσατε λάθος</div>
          {incorrect.map((entry, index) => {
            const question = questions.find((item) => item.id === entry.questionId)
            const userAnswer =
              question.type === 'mcq'
                ? question.options[entry.userAnswer] || 'Δεν επιλέχθηκε απάντηση'
                : entry.userAnswer === true
                  ? 'Σωστό'
                  : 'Λάθος'
            const correctAnswer =
              question.type === 'mcq'
                ? question.options[question.correctAnswer]
                : question.correctAnswer === true
                  ? 'Σωστό'
                  : 'Λάθος'

            return (
              <div key={entry.questionId} className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-6 shadow-sm">
                <div className="mb-3 font-semibold text-slate-800">
                  {index + 1}. {question.question}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Η απάντησή σας</div>
                    <div className="font-semibold text-rose-700">{userAnswer}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Σωστή απάντηση</div>
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
        className="mt-10 w-full rounded-3xl bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800"
      >
        Δοκιμάστε ξανά
      </button>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState(APP_MODES.quiz)
  const [mcqData, setMcqData] = useState([])
  const [tfData, setTfData] = useState([])
  const [openEndedData, setOpenEndedData] = useState([])
  const [questionCount, setQuestionCount] = useState(20)
  const [flashcardCount, setFlashcardCount] = useState(10)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState('setup')
  const [time, setTime] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [revealAnswer, setRevealAnswer] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const [mcqResp, tfResp, openEndedResp] = await Promise.all([
        fetch(resolvePublicAsset('mcq.json')),
        fetch(resolvePublicAsset('truefalse.json')),
        fetch(resolvePublicAsset('openended.json')),
      ])

      const [mcqJson, tfJson, openEndedJson] = await Promise.all([
        mcqResp.json(),
        tfResp.json(),
        openEndedResp.json(),
      ])

      setMcqData(mcqJson)
      setTfData(tfJson)
      setOpenEndedData(openEndedJson)
      setFlashcardCount(Math.min(10, Math.max(1, Math.min(40, openEndedJson.length || 10))))
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

  useEffect(() => {
    const maxFlashcards = Math.max(1, Math.min(40, openEndedData.length || 1))
    setFlashcardCount((current) => Math.min(Math.max(current, 1), maxFlashcards))
  }, [openEndedData.length])

  const currentQuestion = quizQuestions[currentIndex]

  const startQuiz = () => {
    const selectedMcq = shuffleArray(mcqData).slice(0, questionCount / 2)
    const selectedTf = shuffleArray(tfData).slice(0, questionCount / 2)
    const combined = shuffleArray([...selectedMcq, ...selectedTf])

    setQuizQuestions(combined)
    setFlashcards([])
    setCurrentIndex(0)
    setAnswers([])
    setCurrentAnswer(null)
    setRevealAnswer(false)
    setTime(0)
    setPhase('quiz')
  }

  const startFlashcards = () => {
    const maxFlashcards = Math.min(40, openEndedData.length)
    const selectedCount = Math.min(flashcardCount, maxFlashcards)
    const selectedCards = shuffleArray(openEndedData).slice(0, selectedCount)

    setFlashcards(selectedCards)
    setQuizQuestions([])
    setCurrentIndex(0)
    setAnswers([])
    setCurrentAnswer(null)
    setRevealAnswer(false)
    setTime(0)
    setPhase(selectedCards.length > 0 ? 'flashcards' : 'setup')
  }

  const handleAnswer = (value) => {
    if (!currentQuestion) return
    setCurrentAnswer(value)
  }

  const handleNext = () => {
    if (!currentQuestion) return

    const isCorrect =
      currentQuestion.type === 'mcq'
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

  const handleNextFlashcard = () => {
    setRevealAnswer(false)

    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setPhase('flashcards-complete')
    }
  }

  const handleResetToSetup = () => {
    setPhase('setup')
    setCurrentIndex(0)
    setAnswers([])
    setCurrentAnswer(null)
    setRevealAnswer(false)
    setTime(0)
  }

  const handleFlashcardAdvance = () => {
    if (revealAnswer) {
      handleNextFlashcard()
      return
    }

    setRevealAnswer(true)
  }

  const progressLabel = useMemo(() => `${currentIndex + 1} από ${quizQuestions.length}`, [currentIndex, quizQuestions.length])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-200/60 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {phase === 'setup' && (
          <SetupPage
            mode={mode}
            onModeChange={setMode}
            questionCount={questionCount}
            onQuestionCountChange={setQuestionCount}
            onQuizStart={startQuiz}
            flashcardCount={flashcardCount}
            onFlashcardCountChange={setFlashcardCount}
            onFlashcardsStart={startFlashcards}
            openEndedCount={openEndedData.length}
          />
        )}

        {phase === 'quiz' && currentQuestion && (
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-slate-500">Πρόοδος</div>
                <div className="text-2xl font-semibold">{progressLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-500">Χρόνος</div>
                <div className="text-2xl font-semibold">{formatTime(time)}</div>
              </div>
            </div>

            <div className="mb-7 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-slate-900 transition-all"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            <div className="space-y-6">
              {currentQuestion.type === 'mcq' ? (
                <MCQQuestion question={currentQuestion} answer={currentAnswer} onSelect={handleAnswer} />
              ) : (
                <TrueFalseQuestion question={currentQuestion} answer={currentAnswer} onSelect={handleAnswer} />
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className="mt-8 w-full rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 py-4 font-semibold text-white transition hover:from-slate-800 hover:to-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentIndex + 1 === quizQuestions.length ? 'Ολοκλήρωση' : 'Επόμενη ερώτηση'}
            </button>
          </div>
        )}

        {phase === 'results' && (
          <ResultsPage answers={answers} questions={quizQuestions} time={time} onRetry={handleResetToSetup} />
        )}

        {phase === 'flashcards' && (
          <FlashcardStudy
            cards={flashcards}
            currentIndex={currentIndex}
            revealAnswer={revealAnswer}
            onAdvance={handleFlashcardAdvance}
            onRestart={handleResetToSetup}
          />
        )}

        {phase === 'flashcards-complete' && (
          <FlashcardCompletion count={flashcards.length} onRetry={handleResetToSetup} />
        )}
      </div>
    </div>
  )
}

export default App
