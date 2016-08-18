// On browser action clicked handler
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    file: 'src/content-script/content_script.js'
  });

  chrome.tabs.insertCSS(null, {
    file: "src/content-script/content_script.css"
  });
});

var domainTreePorts = [];

// Listener of tab sidebar continuous messaging
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === 'domain-tree') {
    domainTreePorts.push(port);
  }
  port.onMessage.addListener(function(message) {
    switch (message.type) {
      case 'get-tabs':
        getAllTabs(port);
        break;
      case 'close-tab':
        closeTab(message.data);
        break;
      case 'order-tabs':
        orderTabs(message.data);
        break;

      case 'select-tab':
        selectTab(message.data);
        break;
      case 'close-tabs':
        closeTabs(message.data);
        break;
    }
  });

  port.onDisconnect.addListener(function (port) {
    domainTreePorts.splice(domainTreePorts.indexOf(port), 1);
  });
});

// Listener for one time requests
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch(message.type) {
      case 'get-tab':
        chrome.tabs.get(message.data, function(tab) {
          if (tab) sendResponse(tab);
          else sendResponse(null);
        });
        break;
      default:
        sendResponse({type: 'Hello', data: ' Sidebar!'});
    }
    return true; // Allow async sendResponse
  }
);

// Sending functions
function _sendMessage (port, message) {
  port.postMessage(message);
}

function _sendMessageAll(message) {
  domainTreePorts.forEach(port => port.postMessage(message));
}

// Actions
function getAllTabs (port) {
  chrome.tabs.getAllInWindow(null, function(tabs){
    _sendMessage(port, {type: 'current-tabs', data: tabs});
  });
}

function closeTab(tab) {
  chrome.tabs.remove(tab._tabid);
}

function orderTabs(tabs) {
  chrome.tabs.move(tabs, {index: 0}, function() {
  });
}

function selectTab(tab) {
  chrome.tabs.update(tab._tabid, {active: true});
}

function closeTabs(tabs) {
  chrome.tabs.remove(tabs.map(tab => tab._tabid));
}
// Event listeners for tabs
chrome.tabs.onCreated.addListener(function(tab) {
  _sendMessageAll({type: 'new-tab', data: tab});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url || changeInfo.id || changeInfo.title) {
    _sendMessageAll({
      type: 'update-tab',
      data: {
        tabId: tabId,
        changeInfo: changeInfo,
        tab: tab
      }
    });
  }
});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
  _sendMessageAll({
    type: 'replace-tab',
    data: {
      addedTabId: addedTabId,
      removedTabId: removedTabId
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  _sendMessageAll({
    type: 'closed-tab',
    data: {
      tabid: tabId
    }
  });
});
