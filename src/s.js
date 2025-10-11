import fs from "fs";

function getRandomDifficulty() {
  const difficulties = ["Easy", "Medium", "Hard"];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
}

function getRandomImportance() {
  return Math.floor(Math.random() * 5) + 1; // 1–5
}

function parsePDFTextToMCQs(inputFile, outputFile) {
  const rawText = fs.readFileSync(inputFile, "utf-8");

  // 🧹 Clean up the text
  const cleanedText = rawText
    .replace(/\n+/g, " ")
    .replace(/\s\s+/g, " ")
    .trim();

  // 🧩 Split into questions by "Question No:"
  const questionBlocks = cleanedText.split(/Question No:\s*\d+/g).filter(Boolean);

  const mcqs = [];

  questionBlocks.forEach((block, index) => {
    // Extract question text
    const questionMatch = block.match(/Please choose one\s*(.*?)\s*►/);
    const question = questionMatch ? questionMatch[1].trim() : `Question ${index + 1}`;

    // Extract all options
    const options = Array.from(block.matchAll(/►\s*([^►]+)/g)).map(o =>
      o[1].replace(/\(Page.*?\)/, "").trim()
    );

    // Detect answer (the one before a "(Page" tag)
    const answerMatch = block.match(/►\s*([^►]+?)\s*\(Page/i);
    const correct = answerMatch ? answerMatch[1].trim() : options[0] || "N/A";

    mcqs.push({
      id: index + 1,
      question,
      options,
      correct,
      explanation: correct, // same as correct answer
      difficulty: getRandomDifficulty(),
      importance: getRandomImportance(),
    });
  });

  fs.writeFileSync(outputFile, JSON.stringify(mcqs, null, 2));
  console.log(`✅ Parsed ${mcqs.length} MCQs saved to ${outputFile}`);
}

// Usage
parsePDFTextToMCQs("./CS201_extracted.txt", "./CS201_mcqs.json");
