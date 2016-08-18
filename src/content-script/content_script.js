// Script that opens an iframe to load the ng2 page

function createSidebar () {
  var iFrame = document.createElement("iframe");
  iFrame.src = chrome.extension.getURL('src/page-sidebar/index.html');
  iFrame.frameBorder = '0';
  iFrame.style.width = '100%';
  iFrame.style.height = '100%';
  iFrame.scrolling = 'no';
  iFrame.onmouseover = function() {
    document.body.style.overflow='hidden';
  };
  iFrame.onmouseout = function() {
    document.body.style.overflow='auto';
  };

  var newDiv = document.createElement("div");
  newDiv.id = 'domain-tabs-sidebar';

  setTimeout(function() {
    newDiv.appendChild(iFrame);
  }, 200);

  document.body.appendChild(newDiv);
}

function hideSidebar () {
  var element = document.getElementById('domain-tabs-sidebar');
  if (element.className.indexOf('domain-tabs-sidebar-closing') !== -1) {
    return;
  }
  element.className += ' domain-tabs-sidebar-closing';
  setTimeout(function() {
    document.body.removeChild(element);
  }, 100);
}

var sidebar = document.getElementById('domain-tabs-sidebar');
if (sidebar) {
  hideSidebar();
} else {
  createSidebar ();
}
