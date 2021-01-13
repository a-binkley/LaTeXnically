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
  new LatexCommand("Sum (Sigma)", "IMG", "∑(x)(y)", "General/Mathematical", "\\sum_{x}^{y}"),
  new LatexCommand("Binomial", "IMG", "(x choose y)", "Counting", "\\binom{x}{y}"),
  new LatexCommand("Superscript", "x^y", "x^(y)", "General/Mathematical", "x^{y}"),
  new LatexCommand("Subscript", "x_y", "x_(y)", "General/Mathematical", "x_{y}")
];

const zeroInputCommands = [generalCommands, logicalCommands, setNotationCommands, probabilityCommands, graphTheoryCommands];

// Another list of characters to check against, but these don't need to be displayed
// Check against this list BEFORE commandList (so " - " gets captured as subtraction before "-" would be caught as a graph edge)
var regularCharsToTranslate = [
  new LatexCommand("{", "{", "{", null, "\\{"),
  new LatexCommand("}", "}", "}", null, "\\}"),
  new LatexCommand("...", "...", "...", null, "\\dots"),
  new LatexCommand(" \\ ", " \\ ", " \\ ", null, "\\setminus"),
  new LatexCommand(" | ", " | ", " | ", null, "\\mid"),
  new LatexCommand(" - ", " - ", " - ", null, "-")
];

var inputTokens = []; // To be parsed by translator, appended to by input text cell event listener

function findMatch(char) {
  return (this.displayText == char) ? this.code : char;
}

// Translates the given string to its LaTeX equivalent
function translate(tokens) {
  var latexCode = "";
  for (let i = 0; i < tokens.length; i++) {
    var currentChar = tokens[i];
    var currentCode = regularCharsToTranslate.forEach(findMatch(currentChar));
    if (currentCode != null) {
      latexCode += currentCode;
      i += 3; //STUB - TODO: switch over to dynamic array of input tokens?
      continue;
    }
    currentCode = commandList.forEach(findMatch(currentChar));
    if (currentCode != null) {
      // if the command doesn't require inputs (no parentheses):
        // latexCode += (corresponding LatexCommand.code);
        // i+= currentCode.length; ( - 1?)
      // else:
        // map inputs to corresponding area(s) in LatexCommand.code
        // latexCode += (corresponding LatexCommand.code);
        //
    } else {
      latexCode += currentChar;
    }
  }
  return latexCode;
}

//Function 1) Show Buttons
function showZeroInputButtons(num, collection) {
  $("#buttonHolder"+num+"r0").empty();
  $("#buttonHolder"+num+"r1").empty();
  for (let i = 0; i < collection.length; i++) {
    var codeType = collection[i];
    var button = $("<button>");
    button.text(codeType.symbol);
    button.addClass("codeBtn"+num+i);
    button.attr("title", codeType.title);
    button.attr("data-code", codeType.code);
    button.attr("style", "width: 32px; height: 24px");
    // Select row to add button to
    if ((i < collection.length / 2) || (collection.length < 4)) {
       $("#buttonHolder"+num+"r0").append(button);
    } else $("#buttonHolder"+num+"r1").append(button);

    function diplayButtonCode(n, btn) {
      $(".codeBtn"+n+btn).on("click", function() {
        $("#code-appear-here").text($("#code-appear-here").text() + " " + $(".codeBtn"+n+btn).attr("data-code"));
        console.log($(".codeBtn"+n+btn).attr("data-code"));
      })
    }
    diplayButtonCode(num, i);
  }
}

// Display and set event listeners for all zero-input buttons
for (let i = 0; i < zeroInputCommands.length; i++) {
  showZeroInputButtons(i, zeroInputCommands[i]);
}

function showOneInputButtons(collection) {
  $("#buttonHolder5").empty();
  for (let i = 0; i < collection.length; i++) {
    var codeType = collection[i];
    var button = $("<button>");
    button.text(codeType.symbol);
    button.addClass("codeBtnSingle"+i);
    button.attr("data-code", codeType.code);
    button.attr("style", "width: 40px; height: 28px");
    $("#buttonHolder5").append(button);

    function diplayButtonCode(btn) {
      $(".codeBtnSingle"+btn).on("click", function() {
        var modCode = $(".codeBtnSingle"+btn).attr("data-code")
          .replace("x", document.querySelector("#single-input").value);
        $("#code-appear-here").text($("#code-appear-here").text() + " " + modCode);
        console.log($(".codeBtnSingle"+btn).attr("data-code"));
      })
    }
    diplayButtonCode(i);
  }
}

for (let i = 0; i < singleInputCommands.length; i++) {
  showOneInputButtons(singleInputCommands);
}

function showTwoInputButtons(collection) {
  $("#buttonHolder6r0").empty();
  $("#buttonHolder6r1").empty();
  for (let i = 0; i < collection.length; i++) {
    var codeType = collection[i];
    var button = $("<button>");
    button.text(codeType.symbol);
    button.addClass("codeBtnDouble"+i);
    button.attr("data-code", codeType.code);
    button.attr("style", "width: 40px; height: 28px");
    // Select row to add button to
    $("#buttonHolder6r0").append(button);
    // if (i < collection.length / 2)
    // else $("#buttonHolder6r1").append(button);

    function diplayButtonCode(btn) {
      $(".codeBtnDouble"+btn).on("click", function() {
        var modCode = $(".codeBtnDouble"+btn).attr("data-code")
          .replace("x", document.querySelector("#double-input-x").value)
          .replace("{y}", "{"+document.querySelector("#double-input-y").value+"}");
        $("#code-appear-here").text($("#code-appear-here").text() + " " + modCode);
        console.log($(".codeBtnDouble"+btn).attr("data-code"));
      })
    }
    diplayButtonCode(i);
  }
}

for (var i = 0; i < doubleInputCommands.length; i++) {
  showTwoInputButtons(doubleInputCommands);
}

// TODO: condense these three functions into one, with extra parameter(s)?


// function 2) display gifs & ajax call
// My GIPHY API key: uKX1nS2ktlKRylod1a50NtrrJHEyqNZE

// function displayGifs(){

//     $(".gifBtn").on("click", function() {

//         $("#code-appear-here").empty();
//         // Grabbing and storing the data-animal property value from the button
//         var animal = $(this).attr("data-animal");

//         // Constructing a queryURL using the animal name
//         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//           animal + "&api_key=uKX1nS2ktlKRylod1a50NtrrJHEyqNZE&limit=10";

//         // Performing an AJAX request with the queryURL
//       $.ajax({
//         url: queryURL,
//         method: "GET"
//       })
//         // After data comes back from the request
//         .then(function(response) {
//           console.log(queryURL);
//           console.log(response);
//           // storing the data from the AJAX request in the results variable
//           var results = response.data;
//           // Looping through each result item
//           for (var i = 0; i < results.length; i++) {
//             // Creating a paragraph tag with the result item's rating
//             var p = $("<p>").text("Rating: " + results[i].rating);
//             // Setting the src attribute to still image; adding data-state attribute with "still" & "animate" values; add class "gif"
//             var animalImage = `<img class="gif" data-state="still" src="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" data-still="${results[i].images.fixed_height_still.url}">`
//             // append rating and images to HTML
//             $("#gifs-appear-here").prepend(p);
//             $("#gifs-appear-here").prepend(animalImage);
//           }
//         });
//     });
// }


//Function 4) Click Event to create new gifBtn & push to topics array
$("#add-LaTeX").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input value
  var newCode = $("#code-input").val().trim();

  // Adding animal from the textbox to our array
  topics.push(newCode);

  // Calling showButtons which handles the processing of our topics array
  showButtons();
});
