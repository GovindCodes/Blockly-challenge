$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});
//******************************** Text Input Block  ********************************//
Blockly.Blocks["input_text"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Text Input")
      .appendField(new Blockly.FieldTextInput("write here..."), "input");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["input_text"] = function (block) {
  var text_input = block.getFieldValue("input");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
};

//****************************************************************************************** */

// Block Definition- Json Array
var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
var time = new Date().toTimeString().split(" ")[0];
Blockly.defineBlocksWithJsonArray([
  // Statement Input Block
  
  {
    "type": "bot",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_label_serializable",
        "name": "NAME",
        "text": ""
      },
      {
        "type": "input_statement",
        "name": "Input"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "",
    "helpUrl": ""
  },
  // Dropdown Block
  {
    "type": "dropdown",
    "message0": "Ask me a question: %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "input",
        "options": [
          ["What is the date today?", date],
          ["What is the time now?", time],
          ["How are you?", "So far so good"],
          ["What is JavaScript?", "JavaScript is a dynamic computer programming language"],
          ["What is your name?", "Govind Kumar"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
  }
]);

// Generator Function for drop down
Blockly.JavaScript["dropdown"] = function (block) {
  var text_input = block.getFieldValue("input");
  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
};

// generator function for bot
Blockly.JavaScript['bot'] = function(block) {
  var statements_input = Blockly.JavaScript.statementToCode(block, 'Input');
  return statements_input;
};

// Workspace With Grid
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     grid:
         {spacing: 20,
          length: 3,
          colour: 'rgb(255, 0, 0)',
          snap: true},
     trashcan: true});


function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  Blockly.mainWorkspace.clear(); //To clear workspace
  redrawUi();
}
