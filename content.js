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
    console.log("\n\nStarting Name-Replacement Extension's replace method\n\n")
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
                    text = node.nodeValue;
                    var firstLetter = value.replace(/[^\w\s]/gi, '').charAt(0).toLowerCase();
                    if (cachedFoundNames.includes(value))
                    {
                        //console.log("\n\nCached word to replace is: " + value + "\n\n");
                        var replacedText = replaceText(text, value, userEnteredName);
                        node.replaceWith(document.createTextNode(replacedText));
                    }
                    else if (firstLetter in nameData && nameData[firstLetter].includes(value))
                    {
                        //console.log("\n\nWord to replace is: " + value + "\n\n");
                        var replacedText = replaceText(text, value, userEnteredName);
                        node.replaceWith(document.createTextNode(replacedText));
                        cachedFoundNames.push(value);
                    }
                });
            }
        }
    }
    console.log("\n\nFinished Name-Replacement Extension's replace method\n\n")
}

function replaceText(text, value, userEnteredName) {
    console.log("\n\n\nValue, the name to replace, is: " + value);
    console.log("UserEnteredName is: " + userEnteredName);
    var updatedText = text.replace(value, userEnteredName);
    console.log("Updated text: " + updatedText + "\n\n\n")
    return updatedText;
}
