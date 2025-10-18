import fs from "fs";

function parseQuestions(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const questions = [];
  let currentQuestion = null;

  for (const line of lines) {
    // Check if line starts with a number followed by .
    const numMatch = line.match(/^(\d+)\.\s*(.+)$/);
    if (numMatch) {
      // New question
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      const id = parseInt(numMatch[1]);
      const questionText = numMatch[2];
      currentQuestion = {
        id,
        question: questionText,
        options: [],
        correct: ""
      };
    } else if (currentQuestion && line.match(/^[a-d]\.\s*.+/)) {
      // Option line
      const optionMatch = line.match(/^([a-d])\.\s*(.+)$/);
      if (optionMatch) {
        currentQuestion.options.push(optionMatch[2]);
      }
    } else if (currentQuestion) {
      // Continuation of question or option
      if (currentQuestion.options.length === 0) {
        currentQuestion.question += ' ' + line;
      } else {
        // Last option continuation
        currentQuestion.options[currentQuestion.options.length - 1] += ' ' + line;
      }
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}

// Read the file
const text = fs.readFileSync('./questions.txt', 'utf8');
const questions = parseQuestions(text);

// Write to JSON
fs.writeFileSync('./questions_output.json', JSON.stringify(questions, null, 2));

console.log('Converted to JSON successfully!');