# HRDA Quiz App 🧠

An interactive React-based quiz application for practicing HRDA (Human Resource Development Authority) exam questions. Features a 50/50 split between multiple-choice and true/false questions, real-time timer, and detailed results with incorrect answer feedback.

---

## Features ✨

- **Interactive Quiz Interface**: Clean, modern UI built with React and Tailwind CSS
- **Customizable Question Count**: Slider to select 2-100 questions (default: 20)
- **Automatic 50/50 Split**: Evenly balanced between MCQ and True/False questions
- **Real-Time Timer**: Tracks total quiz duration in MM:SS format
- **Progress Bar**: Visual indication of quiz progress
- **Detailed Results**: Shows only incorrect answers with correct answer feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **All Greek UI**: Fully localized interface in Greek language

---

## Tech Stack 🛠️

- **React 19** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework

---

## Getting Started 🚀

### Prerequisites
- Node.js 18+ and npm installed
- Git configured

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/steliosk98/HRDA-PractiseQuestions.git
   cd HRDA-PractiseQuestions
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173/`

4. **Build for production:**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

---

## Usage 📖

1. **Open the quiz**: Start the development server with `npm run dev` or deploy the app and open it in your browser
2. **Select question count**: Use the slider to choose how many questions (2-100)
3. **View the split**: The app automatically shows how many MCQ and True/False questions you'll get
4. **Start the quiz**: Click "Έναρξη Κουίζ" (Start Quiz)
5. **Answer questions**: 
   - For MCQ: Click the radio button with your answer
   - For True/False: Click the appropriate button
6. **Next question**: Click "Επόμενη ερώτηση" (Next Question) to proceed
7. **View results**: After the last question, see your score and incorrect answers
8. **Review mistakes**: Each wrong answer shows what you selected vs. the correct answer
9. **Retry**: Click "Δοκιμάστε ξανά" (Try Again) to start over

---

## Project Structure 📁

```
HRDA-PractiseQuestions/
├── public/
│   ├── mcq.json              # Multiple choice questions
│   └── truefalse.json        # True/False questions
├── src/
│   ├── App.jsx               # Main component with quiz logic
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind + custom styles
├── package.json              # Dependencies and build scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.cjs       # Tailwind CSS configuration
└── index.html                # HTML entry point
```

---

## Available Scripts 🔧

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

## Customization 🎨

### Adding More Questions
1. Update `public/mcq.json` with new MCQ questions
2. Update `public/truefalse.json` with new True/False questions
3. Questions must follow this format:

**MCQ Format:**
```json
{
  "id": "mcq-XX",
  "type": "mcq",
  "question": "Question text?",
  "options": {
    "a": "Option A",
    "b": "Option B",
    "c": "Option C",
    "d": "Option D"
  },
  "correctAnswer": "c"
}
```

**True/False Format:**
```json
{
  "id": "tf-XX",
  "type": "tf",
  "question": "Statement text.",
  "correctAnswer": true
}
```

### Styling Changes
- Modify `src/index.css` for global styles
- Update Tailwind classes in `src/App.jsx` for component styling
- Tailwind config is in `tailwind.config.cjs`

---

## Troubleshooting 🐛

**Questions not loading?**
- Check that `mcq.json` and `truefalse.json` are in the `public/` folder
- Verify JSON syntax is valid
- Clear browser cache and refresh

**Build fails locally?**
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules/` and `dist/` folders, then run `npm install` again
- Check Node.js version: `node -v` (should be 18+)

---

## License 📄

This project is open source and available under the ISC license.

---

## Support & Feedback 💬

For issues, feature requests, or feedback, please open an issue on GitHub.

---

Happy studying! 📚✨
