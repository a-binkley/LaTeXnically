// Command object that allows us to store the LaTeX info more cleanly
function LatexCommand(title, symbol, text, category, code) {
  this.title = title;
  this.symbol = symbol;
  this.displayText = text;
  this.category = category;
  this.code = code;
}

const generalCommands = [
  new LatexCommand("Not Equal", "≠", "≠", "General/Mathematical", "\\neq"),
  new LatexCommand("Less Than or Equal To", "≤", "≤", "General/Mathematical", "\\leq"),
  new LatexCommand("Greater Than or Equal To", "≥", "≥", "General/Mathematical", "\\geq"),
  new LatexCommand("Alpha", "α", "α", "General/Mathematical", "\\alpha"),
  new LatexCommand("Beta", "β", "β", "General/Mathematical", "\\beta"),
  new LatexCommand("Delta", "Δ", "Δ", "General/Mathematical", "\\Delta")
];

const logicalCommands = [
  new LatexCommand("Logical And (Conjunction)", "∧", "∧", "Logical", "\\wedge"),
  new LatexCommand("Logical Or (Disjunction)", "∨", "∨", "Logical", "\\vee"),
  new LatexCommand("Union", "⋃", "⋃", "Logical", "\\cup"),
  new LatexCommand("Intersection", "⋂", "⋂", "Logical", "\\cap"),
  new LatexCommand("Reverse Implication", "⇐", "⇐", "Logical", "\\Leftarrow"),
  new LatexCommand("If-then (Implication)", "⇒", "⇒", "Logical", "\\Rightarrow"),
  new LatexCommand("Biconditional (If and Only If)", "⇔", "⇔", "Logical", "\\leftrightarrow"),
  new LatexCommand("Not (Negation)", "¬", "¬", "Logical", "\\neg")
];

const setNotationCommands = [
  new LatexCommand("Element", "∈", "∈", "Set Notation", "\\in"),
  new LatexCommand("Not Element", "∉", "∉", "Set Notation", "\\not \\in"),
  new LatexCommand("Existential Quantifier", "∃", "∃", "Set Notation", "\\exists"),
  new LatexCommand("Negated Existential Quantifier", "∄", "∄", "Set Notation", "\\nexists"),
  new LatexCommand("Universal Quantifier", "∀", "∀", "Set Notation", "\\forall"),
  new LatexCommand("Proper (Strict) Subset", "⊂", "⊂", "Set Notation", "\\subset"),
  new LatexCommand("Not Proper (Strict) Subset", "⊄", "⊄", "Set Notation", "\\not \\subset"),
  new LatexCommand("Subset", "⊆", "⊆", "Set Notation", "\\subseteq"),
  new LatexCommand("Empty Set", "∅", "∅", "Set Notation", "\\empty"),
  new LatexCommand("Natural Numbers", "ℕ", "ℕ", "Set Notation", "\\mathbb{N}"),
  new LatexCommand("Real Numbers", "ℝ", "ℝ", "Set Notation", "\\mathbb{R}"),
  new LatexCommand("Integers", "ℤ", "ℤ", "Set Notation", "\\mathbb{Z}"),
  new LatexCommand("Complex Numbers", "ℂ", "ℂ", "Set Notation", "\\mathbb{C}"),
  new LatexCommand("Rational Numbers", "ℚ", "ℚ", "Set Notation", "\\mathbb{Q}"),
  new LatexCommand("Cartesian Product", "×", "×", "Set Notation", "\\times"),
  new LatexCommand("Function Mapping", "→", "→", "Counting", "\\rightarrow")
];

const probabilityCommands = [
  new LatexCommand("Probability Space (Omega)", "Ω", "Ω", "Probability", "\\Omega"),
  new LatexCommand("Independent", "⊥", "⊥", "Probability", "\\bot"),
  new LatexCommand("Mu (Deviance)", "𝜇", "𝜇", "Probability", "\\mu")
];

const graphTheoryCommands = [
  new LatexCommand("Chi (Colorability)", "𝜒", "𝜒", "Graph Theory", "\\chi"),
  new LatexCommand("Bi-Directional Edge", "-", "-", "Graph Theory", "\\edg"),
  new LatexCommand("Directed Edge", "→", "→", "Graph Theory", "\\dedg")
];

const singleInputCommands = [
  new LatexCommand("Square Root", "√(x)", "√(x)", "General/Mathematical", "\\sqrt{x}"),
  new LatexCommand("X-bar (Logical Negation)", "x̄", "x̄", "Logical", "\\bar{x}")
];

const doubleInputCommands = [
  new LatexCommand("Sum (Sigma)", "∑", "∑(x)(y)", "General/Mathematical", "\\sum_{x}^{y}"),
  new LatexCommand("Superscript", "x^y", "x^(y)", "General/Mathematical", "x^{y}"),
  new LatexCommand("Subscript", "x_y", "x_(y)", "General/Mathematical", "x_{y}"),
  new LatexCommand("Binomial", "(x choose y)", "(x choose y)", "Counting", "\\binom{x}{y}")
];

const formulaCommands = [
  new LatexCommand("Anagram Formula", "Anagram Formula", "(n_1 + n_2 + ... + n_k)! / (n_1! * n_2! * ... * n_k!)", "Set Notation",
  "\\frac{(n_1 + n_2 + \\dots + n_k)!}{n_1! * n_2! * \\dots * n_k!}"),
  new LatexCommand("Bayes' Rule", "Bayes' Rule", "Pr[A | B] = (Pr[B | A] * Pr[A])/Pr[B]", "Probability",
  "Pr[$A \\mid B$] = \\frac{Pr[$B \\mid A$] * Pr[$A$]}{Pr[$B$]}"),
  new LatexCommand("Partial Combinations", "Partial Combinations", "n! / ((n-r)!*r!)", "Set Notation", "\\frac{n!}{((n-r)!r!)}"),
  new LatexCommand("Partial Permutations", "Partial Permutations", "n! / (n-r)!", "Set Notation", "\\frac{n!}{(n-r)!}")
]

const zeroInputCommands = [generalCommands, logicalCommands, setNotationCommands, probabilityCommands, graphTheoryCommands];
const allCommands = [generalCommands, logicalCommands, setNotationCommands, probabilityCommands,
                    graphTheoryCommands, singleInputCommands, doubleInputCommands, formulaCommands];

function regChar(char, code) {
  this.char = char;
  this.code = code;
}

var regCharsToTranslate = [
  new regChar("{", "\\{"),
  new regChar("}", "\\}")
];

// var inputTokens = []; // To be parsed by translator, appended to by input text cell event listener

/*
// Event listener for text input cell
$("#code-input").on("input", function(event) {
  event.preventDefault();
  // TODO: change this to only add to inputTokens when "translate" is clicked?
  var lastTok = event.originalEvent.data;
  if (event.originalEvent.inputType == "deleteContentBackward") {
    if (inputTokens[inputTokens.length-1].length == 1) inputTokens.pop();
    else {
      inputTokens[inputTokens.length-1] = inputTokens[inputTokens.length-1].slice(0, -1);
    }
  }
  else if (lastTok != null) inputTokens.push(lastTok);
  console.log(inputTokens);
});
*/

// Event listener for translate button
$("#add-LaTeX").on("click", function(event) {
  event.preventDefault();
  var newCode = translate();
  console.log(newCode);
  $("#code-appear-here").text(newCode);
});

// function findMatch(char) {
//   return (this.displayText == char) ? this.code : char;
// }

function isAlphaNum(char) {
  if (char == "|") return true;
  return /^[A-Z0-9 ]$/i.test(char);
}

// Translates the given string to its LaTeX equivalent
function translate() {
  var latexCode = "";
  const tokenList = $("#code-input").val().split(" ");
  console.log(tokenList);
  for (let i = 0; i < tokenList.length; i++) {
    var currentTok = tokenList[i];
    var foundRegChar = false;
    // Check against regCharsToTranslate ({, }, \)
    for (let ii = 0; ii < regCharsToTranslate.length; ii++) {
      if (regCharsToTranslate[ii].char == currentTok) {
        console.log("Found regChar: ", currentTok);
        latexCode += regCharsToTranslate[ii].code + " ";
        foundRegChar = true;
        break;
      }
    }
    if (foundRegChar) continue;
    if (isAlphaNum(currentTok)) {
      latexCode += currentTok + " ";
    } else {
      for (let iii = 0; iii < allCommands.length; iii++) {
        let foundMatch = false;
        for (let iv = 0; iv < allCommands[iii].length; iv++) {
          if (iii > 4) {
            // Check for x/y inputs and append accordingly
            // TODO
          }
          if (allCommands[iii][iv].displayText == currentTok) {
            // TODO: fix inputs like 𝜒(G)
            latexCode += currentTok.replace(allCommands[iii][iv].displayText, allCommands[iii][iv].code) + " ";
            console.log(allCommands[iii][iv].code);
            foundMatch = true;
            break;
          }
        }
        if (foundMatch) break;
      }
    }
  }
  return latexCode;
}

// Function that initializes buttons according to category and number of inputs
function showInputButtons(collection, numInputs, setNum) {
  switch (numInputs) {
    case 0:
      $("#buttonHolder"+setNum+"r0").empty();
      $("#buttonHolder"+setNum+"r1").empty();
      break;
    case 1:
      $("#buttonHolder5").empty();
      break;
    case 2:
      $("#buttonHolder6r0").empty();
      $("#buttonHolder6r1").empty();
      break;
    case -1:
      $("#buttonHolder7r0").empty();
      $("#buttonHolder7r1").empty();
      break;
  }
  for (let i = 0; i < collection.length; i++) {
    var codeType = collection[i];
    var button = $("<button>");
    button.text(codeType.symbol);
    button.addClass("codeBtn"+numInputs+setNum+i);
    if (numInputs != -1) button.attr("title", codeType.title);
    button.attr("data-code", codeType.displayText);
    button.attr("style", "width: 40px; height: 28px");
    // Style and append the button to the corresponding holder
    switch (numInputs) {
      case 0:
        button.attr("style", "width: 32px; height: 24px");
        // Select row to add button to
        if ((i < collection.length / 2) || (collection.length < 4)) {
           $("#buttonHolder"+setNum+"r0").append(button);
        } else $("#buttonHolder"+setNum+"r1").append(button);
        break;
      case 1:
        $("#buttonHolder5").append(button);
        break;
      case 2:
        if (i == 3) button.attr("style", "width: 90px; height: 28px");
        $("#buttonHolder6r0").append(button);
        break;
      case -1:
        button.attr("style", "width: 140px; height: 28px");
        if (i < collection.length / 2) {
           $("#buttonHolder7r0").append(button);
        } else $("#buttonHolder7r1").append(button);
        break;
    }
    // Display the buttons and set event listeners
    function diplayButtonCode(numInputs, setNum, i) {
      $(".codeBtn"+numInputs+setNum+i).on("click", function() {
        var modCode = $(".codeBtn"+numInputs+setNum+i).attr("data-code");
        switch (numInputs) {
          case 1:
            modCode = modCode.replace("x", document.querySelector("#single-input").value);
            break;
          case 2:
            modCode = modCode.replace("x", document.querySelector("#double-input-x").value)
              .replace("(y)", "("+document.querySelector("#double-input-y").value+")");
            break;
        }
        // Append command to input text cell
        $("#code-input").val($("#code-input").val() + modCode);
        // inputTokens.push(modCode);
        console.log($(".codeBtn"+numInputs+setNum+i).attr("data-code"));
      })
    }
    diplayButtonCode(numInputs, setNum, i);
  }
}

// Call the above function for each set of commands
for (let i = 0; i < zeroInputCommands.length; i++) {
  showInputButtons(zeroInputCommands[i], 0, i);
}
for (let i = 0; i < singleInputCommands.length; i++) {
  showInputButtons(singleInputCommands, 1, 0);
}
for (let i = 0; i < doubleInputCommands.length; i++) {
  showInputButtons(doubleInputCommands, 2, 0);
}
for (let i = 0; i < formulaCommands.length; i++) {
  showInputButtons(formulaCommands, -1, 0);
}

$(document).on("click", "#copy-btn", function() {
  $("#code-appear-here").select();
  document.execCommand("copy");
});

$(document).on("click", "#delete", function() {
  // inputTokens = [];
  $("#code-input").val("");
  $("#code-appear-here").empty();
});
