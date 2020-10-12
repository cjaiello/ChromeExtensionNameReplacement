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
    console.log("Starting Name-Replacement Extension's replace method")
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
                wordsInNode.forEach(function(value)
                {
                    var firstLetter = value.replace(/[^\w\s]/gi, '').charAt(0).toLowerCase();
                    if (cachedFoundNames.includes(value))
                    {
                        console.log("First If")
                        var replacedText = replaceText(text, value, userEnteredName);
                        text = replacedText;
                    }
                    else if (firstLetter in nameData && nameData[firstLetter].includes(value))
                    {
                        var replacedText = replaceText(text, value, userEnteredName);
                        text = replacedText;
                        cachedFoundNames.push(value);
                    }
                });
                node.replaceWith(document.createTextNode(text));
            }
        }
    }
    console.log("Finished Name-Replacement Extension's replace method")
}

function replaceText(text, value, userEnteredName) {
    console.log("Value, the name to replace, is: " + value);
    console.log("UserEnteredName is: " + userEnteredName);
    var updatedText = text.replace(value, userEnteredName);
    return updatedText;
}
