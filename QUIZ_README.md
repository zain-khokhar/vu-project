# 🎯 Online Quiz System

A fully-featured, interactive quiz system built with Next.js 15 and React, using static JSON files for quiz data.

## 📁 Project Structure

```
/data/                          # Quiz JSON files
  ├── physics.json              # Physics questions
  ├── chemistry.json            # Chemistry questions
  └── mathematics.json          # Math questions

/src/app/quiz/                  # Quiz pages
  ├── page.js                   # Main quiz selection page
  └── [category]/page.js        # Dynamic category page

/src/components/                # React components
  ├── QuizSetup.jsx             # Quiz configuration form
  ├── QuizClient.jsx            # Quiz runner with timers
  └── ResultPage.jsx            # Results and review page
```

## ✨ Features

### 🏠 Main Quiz Page (`/quiz`)
- ✅ Displays all available quiz categories from `/data` folder
- ✅ Beautiful card-based UI with gradient backgrounds
- ✅ Shows question count for each category
- ✅ Responsive grid layout

### ⚙️ Quiz Setup Page
- ✅ **Name Input**: Required field for username
- ✅ **Question Selection**: Choose 10, 20, 50, 100, or all questions
- ✅ **Timer Settings**: 20s, 30s, 45s, or 60s per question
- ✅ **Quiz Summary**: Preview of total time and settings
- ✅ **Tips Section**: Helpful hints before starting

### 🎮 Quiz Runner
- ✅ **Two-Timer System**:
  - Per-question countdown (resets each question)
  - Total quiz countdown (sum of all question times)
- ✅ **Progress Tracking**:
  - Question counter (e.g., "5 / 20")
  - Visual progress bar
  - Timer displays (with red warning when low)
- ✅ **Question Display**:
  - Large, readable question text
  - Difficulty badge
  - Multiple-choice options
  - Visual selection feedback
- ✅ **Auto-Navigation**:
  - Auto-advance when per-question timer expires
  - Auto-submit when total timer expires
  - Manual "Next" button when answer selected

### 📊 Results Page
- ✅ **Score Summary**:
  - Circular progress indicator
  - Letter grade (A+ to F)
  - Percentage score
- ✅ **Statistics**:
  - Total questions
  - Correct answers (green)
  - Wrong answers (red)
  - Time remaining
  - Username and category
- ✅ **Question Review**:
  - All questions listed
  - Green border for correct answers
  - Red border for wrong answers
  - Expandable explanations (click red questions)
  - Shows correct answer for wrong questions
- ✅ **Actions**:
  - Take another quiz
  - Retake same quiz
  - Back to quiz home

### 🎲 Randomization
- ✅ Questions randomly shuffled each time
- ✅ No duplicate questions in a single quiz
- ✅ Fresh experience every attempt

### 💾 LocalStorage
- ✅ Saves last quiz result
- ✅ Stores username, score, category, and timestamp

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Beautiful color schemes
- **Smooth Animations**: Hover effects, transitions, progress bars
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Accessibility**: Clear labels, good contrast, keyboard navigation
- **Loading States**: Spinner while quiz loads
- **Timer Warnings**: Red pulse when time is running out
- **Visual Feedback**: Checkmarks, icons, colors for different states

## 📝 Quiz Data Format

Each JSON file in `/data` contains an array of question objects:

```json
[
  {
    "id": 1,
    "question": "What is the speed of light?",
    "options": ["3 × 10^8 m/s", "3 × 10^6 m/s", "1 × 10^8 m/s", "5 × 10^8 m/s"],
    "correct": "3 × 10^8 m/s",
    "explanation": "Light travels at approximately 3 × 10^8 meters per second in a vacuum.",
    "difficulty": "Medium",
    "importance": 4
  }
]
```

### Required Fields:
- `id`: Unique identifier
- `question`: Question text
- `options`: Array of 4 answer options
- `correct`: The correct answer (must match one option exactly)
- `explanation`: Detailed explanation for the answer

### Optional Fields:
- `difficulty`: "Easy", "Medium", or "Hard"
- `importance`: 1-5 rating

## 🚀 How to Add New Quizzes

1. Create a new JSON file in the `/data` folder (e.g., `biology.json`)
2. Add questions following the format above
3. The quiz will automatically appear on the main quiz page
4. No code changes needed!

## 🎯 User Flow

1. **Select Quiz** → User clicks on a category card
2. **Configure** → Enter name, choose questions & timer
3. **Take Quiz** → Answer questions with countdown
4. **View Results** → See score, grade, and review answers
5. **Retake or Try Another** → Navigate to new quiz or retry

## 🔧 Technical Details

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Data Source**: Static JSON files (no database needed)
- **Client Components**: Used for interactive features
- **Server Components**: Used for data fetching

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (stacked layout)
- **Tablet**: 640px - 1024px (2-column grid)
- **Desktop**: > 1024px (3-column grid)

## 🎓 Quiz Categories Included

1. **Physics** (20 questions) - Mechanics, electricity, optics
2. **Chemistry** (15 questions) - Elements, compounds, reactions
3. **Mathematics** (15 questions) - Algebra, geometry, calculus

## 🌟 Key Highlights

- ✅ **100% Client-Side** - No backend required
- ✅ **File-Based** - Easy to add/edit questions
- ✅ **Production-Ready** - Clean, maintainable code
- ✅ **Modern UI** - Beautiful gradients and animations
- ✅ **Smart Timers** - Dual countdown system
- ✅ **Educational** - Detailed explanations for learning

## 📈 Future Enhancements (Optional)

- Add quiz categories icons
- Leaderboard with top scores
- Share results on social media
- Download certificate
- Quiz history tracking
- Dark mode support
- Question bookmarking
- Difficulty filtering

---

**Built with ❤️ for DocLibrary**
