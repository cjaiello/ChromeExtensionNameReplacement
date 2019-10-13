function getNewName() {
  chrome.tabs.executeScript({
    file: 'getNewName.js'
  }, refreshPage);
}

function clearSetName() {
  chrome.tabs.executeScript({
    file: 'clearSetName.js'
  }, refreshPage);
}

function refreshPage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}

function clearSetName() {
  chrome.storage.sync.set({"userEnteredName": null});
}

document.getElementById('setNewName').addEventListener('click', getNewName);
document.getElementById('clearSetName').addEventListener('click', clearSetName);
