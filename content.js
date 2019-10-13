// Christina Aiello, 2019
// Thank you Tom Maxwell for the starter code!
// https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/

chrome.storage.sync.get(['userEnteredName'], function(result) {
    var nameSavedInChromeStorage = result["userEnteredName"];
    if (nameSavedInChromeStorage != null) {
        replaceNamesWithUserInput(nameSavedInChromeStorage.toString());
    }
});

function replaceNamesWithUserInput(userEnteredName) {
    var elements = document.getElementsByTagName('*');
    var cachedFoundNames = new Array();

    for (var i = 0; i < elements.length; i++)
    {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++)
        {
            var node = element.childNodes[j];
            if (node.nodeType === 3)
            {
                var text = node.nodeValue;
                var wordsInNode = text.split(" ");

                wordsInNode.forEach(function(value, key)
                {
                      var firstLetter = value.replace(/[^\w\s]/gi, '').charAt(0).toLowerCase();
                      if (cachedFoundNames.includes(value))
                      {
                          var replacedText = replaceText(value, userEnteredName);
                          node.replaceWith(document.createTextNode(replacedText));
                      }
                      else if (firstLetter in nameData && nameData[firstLetter].includes(value))
                      {
                          var replacedText = replaceText(value, userEnteredName);
                          node.replaceWith(document.createTextNode(replacedText));
                          cachedFoundNames.push(value);
                      }
                });
            }
        }
    }
}

function replaceText(value, userEnteredName) {
    var re = new RegExp("\\b" + value + "\\b");
    return value.replace(re, userEnteredName);
}
