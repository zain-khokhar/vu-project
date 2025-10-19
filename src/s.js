// import fs from "fs";
// import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// // ========== STEP 1: Extract Text from PDF ==========
// async function extractTextFromPDF(filePath) {
//   const loadingTask = getDocument(filePath);
//   const pdf = await loadingTask.promise;
//   let fullText = "";

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     const page = await pdf.getPage(pageNum);
//     const content = await page.getTextContent();
//     const text = content.items.map((item) => item.str).join(" ");
//     fullText += text + "\n";
//   }

//   return fullText;
// }

// // ========== STEP 2: Parse Questions into JSON ==========
// function parseQuestions(text) {
//   const blocks = text
//     .split(/Question No:\s*\d+/)
//     .map((b) => b.trim())
//     .filter(Boolean);

//   const results = blocks.map((block, i) => {
//     const id = i + 1;

//     // Extract question text
//     const questionMatch = block.match(/^(.*?)(?=\s*►)/s);
//     const question = questionMatch ? questionMatch[1].trim() : "";

//     // Extract options
//     const optionMatches = [...block.matchAll(/►\s*(.+?)(?=\s*(►|$))/gs)].map(
//       (m) => m[1].trim()
//     );

//     // Detect correct option (contains "(Page ...)")
//     let correct = "";
//     const correctMatch = optionMatches.find((opt) => /\(Page/i.test(opt));
//     if (correctMatch) correct = correctMatch.replace(/\(Page.*?\)/i, "").trim();

//     // Extract explanation (if available)
//     let explanation = "";
//     const expMatch = block.match(
//       /Here\s+.*|function\s+argument\s+passing.*|so\s+when\s+we\s+call.*|because.*|therefore.*/is
//     );
//     if (expMatch) explanation = expMatch[0].trim();

//     return {
//       id,
//       question,
//       options: optionMatches.map((opt) =>
//         opt.replace(/\(Page.*?\)/i, "").trim()
//       ),
//       correct,
//     };
//   });

//   return results;
// }

// // ========== STEP 3: Main Function ==========
// async function main() {
//   const pdfPath = "./CS301 MIDTERM SOLVED MCQS By JUNAID-1_removed.pdf"; // change path to your PDF file
//   const txtPath = "./questions.txt";
//   const jsonPath = "./questions2.json";

//   try {
//     console.log("📖 Extracting text from PDF...");
//     const text = await extractTextFromPDF(pdfPath);
//     fs.writeFileSync(txtPath, text, "utf8");
//     console.log("✅ Text saved to", txtPath);

//     console.log("🧩 Parsing text into JSON...");
//     const json = parseQuestions(text);
//     fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
//     console.log("✅ JSON saved to", jsonPath);
//   } catch (err) {
//     console.error("❌ Error:", err.message);
//   }
// }

// main();
import fs from "fs";

// Load your questions file
const data = JSON.parse(fs.readFileSync("CS301 GRAND MIDTERM Mcqs File.json", "utf8"));

// Possible difficulty levels
const difficulties = ["Easy", "Medium", "Hard"];

// Function to generate random integer between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Transform and reassign IDs
const updated = data.map((item, index) => ({
  ...item,
  id: index + 1,
  explanation: "N/A",
  difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
  importance: randomInt(1, 5),
}));

// Save to new file
fs.writeFileSync("questions_updated.json", JSON.stringify(updated, null, 2));

console.log("✅ Questions updated successfully → saved to questions_updated.json");
