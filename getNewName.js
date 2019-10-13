var userInput = prompt("Enter a name, and all people's names in Chrome will be replaced with that name!");
userEnteredName = String(userInput);
chrome.storage.sync.set({"userEnteredName": userEnteredName});
