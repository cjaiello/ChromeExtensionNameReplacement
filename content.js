// Christina Aiello, 2019
// Thank you Tom Maxwell for the starter code!
// https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/

const TEXT_NODE_VALUE = 3;
const CHROME_STORAGE_NULL_VALUE = "null";

chrome.storage.sync.get(['userEnteredName'], function(result) {
    var userEnteredName = result["userEnteredName"] != CHROME_STORAGE_NULL_VALUE ? result["userEnteredName"].toString() : null;
    if (userEnteredName == null) {
        var userInput = prompt("Enter a name, and all people's names in Chrome will be replaced with that name!");
        userEnteredName = String(userInput);
        chrome.storage.sync.set({"userEnteredName": userEnteredName}, function(userEnteredName) {
            if (userEnteredName != CHROME_STORAGE_NULL_VALUE && userEnteredName != null) {
                replaceNamesWithUserInput(userEnteredName);
            }
        });
    } else {
        replaceNamesWithUserInput(userEnteredName);
    }
});

function replaceNamesWithUserInput(userEnteredName) {
    var elements = document.getElementsByTagName('*');
    var matchedNames = new Array();

    for (var i = 0; i < elements.length; i++)
    {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++)
        {
            var node = element.childNodes[j];
            if (node.nodeType === TEXT_NODE_VALUE)
            {
                var text = node.nodeValue;
                var wordsInNode = text.split(" ");

                $.each(wordsInNode, function(key, value)
                {
                      var firstLetter = value.replace(/[^\w\s]/gi, '').charAt(0).toLowerCase();
                      if (matchedNames.includes(value))
                      {
                          var replacedText = replaceText(value, userEnteredName);
                          node.replaceWith(document.createTextNode(replacedText));
                      }
                      else if (firstLetter in nameData && nameData[firstLetter].includes(value))
                      {
                          var replacedText = replaceText(value, userEnteredName);
                          node.replaceWith(document.createTextNode(replacedText));
                          matchedNames.push(value);
                      }
                });
            }
        }
    }
}

function replaceText(value, userEnteredName) {
    var re = new RegExp("\\b" + value + "\\b");
    return text.replace(re, userEnteredName);
}
