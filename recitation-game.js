import React, { useState, useEffect, useRef } from "react";

// Recitation Game for Grades 7-10
// Single-file React component (Tailwind-ready). Designed for projector use.

const DATA = {
  grade7: [
    { q: "What does the 'margin' of a document refer to?", a: "The blank space between the edge of the paper and the text." },
    { q: "How do you insert a page break in Google Docs?", a: "Insert → Break → Page break (or Ctrl/Cmd + Enter)." },
    { q: "Name the parts of a table: horizontal and vertical.", a: "Row (horizontal) and Column (vertical)." },
    { q: "What does merging cells do in a table?", a: "Combines adjacent cells into one larger cell." },
    { q: "What symbol must every spreadsheet formula begin with?", a: "An equals sign (=)." },
    { q: "Write the formula to sum cells B2 to B5.", a: "=SUM(B2:B5)" },
    { q: "Which chart type shows parts of a whole?", a: "Pie chart." },
    { q: "Which chart type compares categories side-by-side?", a: "Bar chart." },
    { q: "What is a file extension?", a: "The letters after the dot in a filename that tell the computer the file type (e.g., .docx)." },
    { q: "Give an example of a good file name practice.", a: "Include subject, topic, and date, e.g., Science_Project_Volcano_Oct15_2025.docx." },
    { q: "How many worksheets in a spreadsheet file? (conceptual)", a: "A spreadsheet file can have multiple worksheets; think of each as a different page in a notebook." },
    { q: "How do you reference a cell from another sheet?", a: "Use SheetName!CellAddress, e.g., Grades!B5." },
    { q: "What is data validation used for?", a: "To set rules that ensure only correct data is entered into cells." },
    { q: "Give an example of a data validation rule.", a: "Cell only accepts numbers between 0 and 100." },
    { q: "What is 'dirty data'?", a: "Data that contains errors or inconsistencies." },
    { q: "Name two basic graphics used in documents.", a: "Shapes and lines (e.g., rectangles, circles)." },
    { q: "How do you insert a table in Google Docs?", a: "Insert → Table → choose size from the grid." },
    { q: "What is the main advantage of cloud storage?", a: "Access anywhere and secure backup of files." },
    { q: "How much free storage does Google Drive provide by default?", a: "15 GB." },
    { q: "What happens to a file when you 'delete' it?", a: "It goes to the Recycle Bin where it can be recovered." },
    { q: "Which file extension opens with Microsoft Excel?", a: ".xlsx" },
    { q: "Which file extension is commonly an image?", a: ".jpg or .png" },
    { q: "What does 'orientation' in page setup mean?", a: "The direction of the page: Portrait or Landscape." },
    { q: "Why use a page break?", a: "To force content to start on a new page (e.g., new chapter)." },
    { q: "When should you merge cells?", a: "To create a single title bar spanning a table or to format headers." },
    { q: "What is a 'cell' in a table?", a: "The intersection of a row and a column that holds one piece of information." },
    { q: "Name one use of shapes in a document.", a: "To create simple diagrams or highlight information." },
    { q: "What's the purpose of margins?", a: "To frame content and prevent text from appearing cluttered." },
    { q: "How do you change page margins in Google Docs?", a: "File → Page setup → Adjust margin measurements." },
    { q: "What is a 'report' in the spreadsheet context?", a: "A concise presentation of filtered data." },
    { q: "Why use charts in spreadsheets?", a: "To make patterns and comparisons easier to understand visually." },
    { q: "What is the difference between Copy and Move?", a: "Copy duplicates the file; Move transfers it and removes from the old location." },
    { q: "How would you describe a folder?", a: "A container to store related files together, like a cabinet drawer." },
    { q: "What does .docx open with?", a: "Microsoft Word or Google Docs." },
    { q: "Give one tip for naming files.", a: "Be descriptive, include subject, topic, and date." },
    { q: "What does 'insert → drawing → new' allow you to do?", a: "Add shapes and custom drawings to a document." },
    { q: "When is Landscape orientation useful?", a: "When the content is wide, such as big tables or charts." },
    { q: "What is a 'table of contents'-related task?", a: "Using page breaks and headings to structure a document for navigation." }
  ],

  grade8: [
    { q: "What is a worksheet in a spreadsheet?", a: "A single page within a spreadsheet file used to organize related data." },
    { q: "How do you rename a sheet?", a: "Double-click the sheet tab and type the new name." },
    { q: "What is data validation for?", a: "To set rules that prevent incorrect data entry (e.g., only numbers)." },
    { q: "Give a use-case for filtering data.", a: "Show only students who live in a specific barangay." },
    { q: "What does sorting do?", a: "Arranges data in a specific order, e.g., A to Z or largest to smallest." },
    { q: "What is an anomaly in data?", a: "Something that deviates from what is standard or expected." },
    { q: "What is data cleaning?", a: "Fixing errors like misspellings or wrong formatting so data is usable." },
    { q: "Name one AI use in spreadsheets.", a: "Suggesting charts or generating summaries from raw data." },
    { q: "What is the difference between a simple report and a summary?", a: "A simple report is concise filtered data; a summary gives overall calculations like SUM or AVERAGE." },
    { q: "How do you reference another sheet?", a: "Use SheetName!CellAddress (e.g., Grades!B5)." },
    { q: "Why limit personal data in reports?", a: "To protect privacy—only include personal data when necessary." },
    { q: "What is an example of personal data?", a: "Full name, address, student ID, contact number." },
    { q: "What does AI 'anomaly detection' do?", a: "Spots unusual patterns or errors in large datasets." },
    { q: "Name one benefit of using multiple worksheets.", a: "Keeps related data organized and prevents the main sheet from getting crowded." },
    { q: "What is the formula for an average of B2:B5?", a: "=AVERAGE(B2:B5)" },
    { q: "What is dirty data?", a: "Data containing errors or inconsistencies." },
    { q: "Give an example of AI for data cleaning.", a: "Tools that automatically identify misspellings or inconsistent formats for correction." },
    { q: "What does filtering temporarily do?", a: "Shows only rows that meet set criteria and hides the rest." },
    { q: "Why is context important in data storytelling?", a: "It explains why the data matters and what actions to take." },
    { q: "What chart is best to show distribution?", a: "Histogram." },
    { q: "What is concise?", a: "Short and clear—used to describe a simple report." },
    { q: "How does AI help data visualization?", a: "It can suggest the most appropriate chart types automatically." },
    { q: "What should you check when sharing a report?", a: "That personal data is minimized and privacy is protected." },
    { q: "What is the key rule for cell ranges?", a: "Use the colon, e.g., B2:B5 to cover all cells from B2 to B5." },
    { q: "What's one quick summary function?", a: "=SUM(range) to add values." },
    { q: "Give an example of a simple report use-case.", a: "List of students in a specific club filtered by club column." },
    { q: "What is a worksheet 'tab' used for?", a: "To switch between different sheets inside the same spreadsheet file." },
    { q: "What is the first step when cleaning data?", a: "Identify missing values and inconsistent formats." },
    { q: "What does 'reference' mean in spreadsheets?", a: "Using a cell's value in another cell or sheet by pointing to its address." },
    { q: "Why use summaries like AVERAGE?", a: "To quickly understand central tendency of numeric data." },
    { q: "What is a good practice for charts?", a: "Use clear titles, labeled axes, and an appropriate scale." },
    { q: "What is an example of AI for anomaly detection?", a: "Finding sudden spikes in network traffic that might indicate a problem." },
    { q: "How do pivot tables help?", a: "They summarize and aggregate large datasets quickly by grouping and calculating values." },
    { q: "Name a statistical function and its purpose.", a: "MEDIAN(): finds the middle value in a range." },
    { q: "What does COUNTBLANK() do?", a: "Counts empty cells in a range." },
    { q: "When presenting data story, what three elements combine?", a: "Data, Visuals, and Narrative." },
    { q: "What's one reason AI ethics matter?", a: "Balancing privacy with utility of data for AI models." },
    { q: "What is a combo chart used for?", a: "Combining different chart types to show different scales together (e.g., columns + line)." }
  ],

  grade9: [
    { q: "What does VLOOKUP do?", a: "Searches for a value in the first column of a range and returns a value from a specified column in the same row." },
    { q: "When do you use HLOOKUP?", a: "When your data is organized in rows and you want to search the first row." },
    { q: "What parameter determines exact match in VLOOKUP?", a: "The is_sorted parameter — use FALSE for an exact match." },
    { q: "Give one example of a statistical function.", a: "MAX() returns the largest value in a range." },
    { q: "What does MEDIAN() return?", a: "The middle value in a range." },
    { q: "What is a Pivot Table mainly used for?", a: "Summarization and aggregation of large datasets." },
    { q: "Name the three Pivot Table areas.", a: "Rows, Columns, and Values (also Filters)." },
    { q: "What is data storytelling?", a: "Presenting data with context, visuals, and narrative to convey meaning." },
    { q: "What is phishing?", a: "A deceptive attempt, usually by email, to trick people into revealing sensitive information." },
    { q: "What's one defense against phishing?", a: "Never click suspicious links and check the sender's email address carefully." },
    { q: "Name one use of AI in cybersecurity.", a: "Detecting patterns that indicate phishing or malware activity." },
    { q: "What is PII?", a: "Personally Identifiable Information that can identify a person, like passport number." },
    { q: "Give a strong password guideline.", a: "Minimum 12 characters, a mix of uppercase, lowercase, numbers, and symbols." },
    { q: "Why should you not reuse passwords?", a: "Because it increases the risk that multiple accounts are compromised if one is breached." },
    { q: "What is the ethical tension in AI?", a: "Privacy vs. Utility — using data for AI performance while protecting people's privacy." },
    { q: "What is a combo chart useful for?", a: "Showing different scales together, e.g., sales columns and profit margin line." },
    { q: "What is a histogram used for?", a: "Showing distribution of numerical data (e.g., grade distribution)." },
    { q: "What should every chart include?", a: "A clear title, labeled axes, and a legend if needed." },
    { q: "How can AI help with phishing detection?", a: "By analyzing millions of emails for subtle patterns that indicate fraud." },
    { q: "What does MAX() and MIN() give you?", a: "The largest and smallest values in a range, respectively." },
    { q: "What is COUNTBLANK() useful for?", a: "Checking for missing data by counting empty cells." },
    { q: "Why is 'context' important in data storytelling?", a: "It explains why the numbers matter and what decisions to make." },
    { q: "What is a formula example to sum cells A1 to A10?", a: "=SUM(A1:A10)" },
    { q: "How do pivot table Filters help?", a: "They narrow the data before the pivot table calculation." },
    { q: "What is social engineering?", a: "Manipulating people into breaking security procedures by exploiting psychology." },
    { q: "Give an example of direct PII.", a: "Passport number." },
    { q: "Give an example of indirect PII.", a: "Date of birth combined with school name." },
    { q: "Why is explainable AI (XAI) important?", a: "So humans can understand and trust AI decisions, especially in critical fields like healthcare." },
    { q: "What is a best practice for password creation?", a: "Use unique passwords and a password manager to store them." },
    { q: "What does 'is_sorted = FALSE' force in VLOOKUP?", a: "An exact match lookup." },
    { q: "What is one practical use of a pivot table?", a: "Finding total sales by region quickly." },
    { q: "What should you check before clicking links in emails?", a: "The sender's email address and whether the message is expected." },
    { q: "How does AI improve cybersecurity monitoring?", a: "By spotting unusual patterns in network or user behavior." },
    { q: "Why avoid including PII in widely shared reports?", a: "To reduce the risk of identity theft and privacy breaches." },
    { q: "What does a legend in a chart do?", a: "Explains what colors or symbols in the chart represent." },
    { q: "Name a statistic function that gives the average.", a: "AVERAGE() returns the mean of a range." },
    { q: "What is a use for MIN() in a dataset?", a: "Find the lowest score or smallest value." },
    { q: "How can AI help in loan decisions?", a: "By analyzing patterns in historic data but requires XAI for transparency." }
  ],

  grade10: [
    { q: "What is a variable in programming?", a: "A named storage location used to hold data values." },
    { q: "Name three basic Python data types.", a: "String (str), Integer (int), Float (float)." },
    { q: "How do you define a function in Python?", a: "Using def, for example: def greet(name):" },
    { q: "What does 'if' and 'else' control in a program?", a: "They control conditional execution of code blocks depending on True/False tests." },
    { q: "When is a for loop used?", a: "When you know the number of repetitions or to iterate through collections." },
    { q: "When is a while loop used?", a: "When repetition continues while a condition remains True (unknown count)." },
    { q: "Give an example of opening a file for writing in Python.", a: "with open('file.txt', 'w') as f:  # 'w' for write" },
    { q: "What is a module in Python?", a: "A file containing Python code (functions, classes) that can be imported." },
    { q: "Give one function from the math module.", a: "math.sqrt() for square root after import math." },
    { q: "What is a DataFrame (Pandas)?", a: "A tabular data structure like a spreadsheet used for data analysis." },
    { q: "How do you load a CSV into pandas?", a: "pd.read_csv('file.csv')" },
    { q: "What does df.head() show?", a: "The first 5 rows of a DataFrame." },
    { q: "How do you replace missing values in pandas?", a: "Use .fillna() to replace missing values with a chosen value." },
    { q: "What is feature engineering?", a: "Creating new columns (features) from existing data to help analysis or models." },
    { q: "What is aggregation in data analysis?", a: "Summarizing data using methods like .sum(), .mean(), or .mode()." },
    { q: "Why convert strings with currency symbols before math?", a: "To remove non-numeric characters then convert to numeric types for calculations." },
    { q: "What is Explainable AI (XAI)?", a: "Methods that make AI decisions understandable to humans." },
    { q: "Why is XAI important in banking?", a: "Customers need to know why a loan was denied; it builds trust and accountability." },
    { q: "What does pd.read_csv(...).columns return?", a: "A list of column names in the DataFrame." },
    { q: "How do you get the average of a column in pandas?", a: "df['col'].mean()" },
    { q: "What is data visualization used for?", a: "To quickly identify patterns, trends, and comparisons using charts." },
    { q: "Name a common pandas data cleaning task.", a: "Removing non-numeric characters, filling missing values, or fixing data types." },
    { q: "What is an example of feature engineering?", a: "Calculating projected profit from daily sales columns." },
    { q: "How do you call a function greet with 'Maria'?", a: "greet('Maria')" },
    { q: "What does import math do?", a: "Makes the math module available in the program so you can call math functions." },
    { q: "What Python keyword defines a loop that runs while condition true?", a: "while" },
    { q: "Why is checking data types important?", a: "So you can perform correct operations; e.g., numeric math requires numeric types." },
    { q: "What is .mode() used for in pandas?", a: "Finding the most frequent value in a column." },
    { q: "Give an example of file I/O read mode.", a: "with open('file.txt', 'r') as f:  # 'r' for read" },
    { q: "Why use functions in code?", a: "They make code reusable, organized, and easier to test." },
    { q: "What is a common step when cleaning currency columns?", a: "Use .str.replace() to remove currency symbols, then .astype(float)." },
    { q: "Name two pandas methods to inspect a DataFrame.", a: "df.head() and df.tail()" },
    { q: "What is one reason to modularize code?", a: "To reuse components and avoid duplication across projects." },
    { q: "What is the difference between .sum() and .mean()?", a: ".sum() adds values; .mean() computes the average." },
    { q: "How can visualization help XAI?", a: "Charts can reveal how features influence model decisions, improving transparency." },
    { q: "What is an example of a Pandas import statement?", a: "import pandas as pd" }
  ]
};

export default function RecitationGame() {
  const [grade, setGrade] = useState("grade7");
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);
  const [log, setLog] = useState([]); // store answers/reveals for review

  const questions = DATA[grade];
  const total = questions.length;

  useEffect(() => {
    // reset when grade changes
    setIndex(0);
    setShown(false);
    setRevealed(false);
    setTimeLeft(10);
    setLog([]);
    clearTimer();
  }, [grade]);

  useEffect(() => {
    if (shown && !revealed) {
      startTimer();
    }
  }, [shown, revealed]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  function startTimer() {
    clearTimer();
    setTimeLeft(10);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          // auto-stop but do not auto-reveal
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleShowQuestion() {
    // must click before showing question
    setShown(true);
    setRevealed(false);
    setTimeLeft(10);
  }

  function handleReveal() {
    setRevealed(true);
    clearTimer();
    // log the reveal for review
    setLog((l) => [...l, { q: questions[index].q, a: questions[index].a }]);
  }

  function handleNext() {
    clearTimer();
    const nextIndex = index + 1;
    if (nextIndex < total) {
      setIndex(nextIndex);
      setShown(false);
      setRevealed(false);
      setTimeLeft(10);
    } else {
      // reached end
      setIndex(index);
      setShown(false);
      setRevealed(false);
      setTimeLeft(10);
    }
  }

  function handleReviewAll() {
    // fill log with remaining unanswered as not revealed yet
    const remaining = questions.slice(log.length).map((item) => ({ q: item.q, a: item.a }));
    setLog((l) => [...l, ...remaining]);
  }

  function handleJump(i) {
    clearTimer();
    setIndex(i);
    setShown(false);
    setRevealed(false);
    setTimeLeft(10);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Recitation Game — CE Grades 7–10</h1>
          <div className="space-x-2">
            <select
              aria-label="Select grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="grade7">Grade 7</option>
              <option value="grade8">Grade 8</option>
              <option value="grade9">Grade 9</option>
              <option value="grade10">Grade 10</option>
            </select>
            <button
              onClick={() => {
                setIndex(0);
                setShown(false);
                setRevealed(false);
                setLog([]);
                clearTimer();
              }}
              className="p-2 bg-gray-200 rounded-lg"
            >
              Reset
            </button>
          </div>
        </header>

        <main className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-semibold">{grade.replace("grade", "Grade ")}</div>
              <div className="text-sm text-gray-500">Question {index + 1} of {total}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Timer</div>
              <div className="text-2xl font-mono">{shown ? timeLeft : "—"}</div>
            </div>
          </div>

          <div className="min-h-[160px] flex items-center justify-center border rounded-lg p-6 mb-4">
            {!shown ? (
              <div className="text-center">
                <div className="text-xl mb-3">Click the button to show the question</div>
                <button
                  onClick={handleShowQuestion}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
                >
                  Show Question
                </button>
              </div>
            ) : (
              <div className="w-full text-center">
                <div className="text-2xl font-medium mb-4">{questions[index].q}</div>
                {revealed ? (
                  <div className="mt-2 text-xl text-green-700">Answer: {questions[index].a}</div>
                ) : (
                  <div className="mt-2 text-sm text-gray-500">Student answering... (timer runs)</div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReveal}
              disabled={!shown || revealed}
              className={`px-4 py-2 rounded-lg ${!shown || revealed ? 'bg-gray-200' : 'bg-emerald-500 text-white'}`}
            >
              Reveal Answer
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white"
            >
              Next Question
            </button>

            <button
              onClick={handleReviewAll}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white ml-auto"
            >
              Show All Answers (End)
            </button>
          </div>

          <section className="mt-6">
            <h3 className="font-semibold mb-2">Quick Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleJump(i)}
                  className={`w-10 h-10 rounded-full ${i === index ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  aria-label={`Jump to question ${i+1}`}
                >{i+1}</button>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="font-semibold mb-2">Review — Questions with revealed answers</h3>
            <div className="max-h-40 overflow-auto border rounded p-3 bg-gray-50">
              {log.length === 0 ? (
                <div className="text-sm text-gray-500">No revealed answers yet. Use 'Reveal Answer' during play or 'Show All Answers (End)'.</div>
              ) : (
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  {log.map((item, idx) => (
                    <li key={idx}><strong>{item.q}</strong><div className="text-gray-700">Answer: {item.a}</div></li>
                  ))}
                </ol>
              )}
            </div>
          </section>

        </main>

        <footer className="mt-6 text-center text-sm text-gray-500">
          Projector-friendly UI. Large buttons and fonts for classroom use.
        </footer>
      </div>
    </div>
  );
}
