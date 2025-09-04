

var dis = document.getElementById("not_url_display");
dis.innerText = "Extension loaded. Click any button to proceed.\n";

// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

Array.from(document.getElementsByTagName("button")).forEach(btn => btn.addEventListener('click', () => {
  const selectedCV = btn.value; // Get the CV number from button value
  dis.innerText = `Button clicked! Selected CV ${selectedCV}. Checking active tab...\n`;
  browserAPI.tabs.query({ currentWindow: true, active: true },
    (tabs) => {
      if (tabs[0].url == "https://erp.iitkgp.ac.in/IIT_ERP3/showmenu.htm") {
        // Inject the selected CV number first, then execute main.js
        browserAPI.tabs.executeScript(tabs[0].id, {
          code: `window.selectedCV = ${selectedCV};`
        }, () => {
          if (browserAPI.runtime.lastError) {
            dis.innerText = "Error setting CV: " + browserAPI.runtime.lastError.message;
            return;
          }
          
          browserAPI.tabs.executeScript(tabs[0].id, {
            file: 'main.js'
          }, (result) => {
            if (browserAPI.runtime.lastError) {
              dis.innerText = "Error: " + browserAPI.runtime.lastError.message;
            } else {
              dis.innerText = `Script injected successfully for CV ${selectedCV}!`;
            }
          });
        });
      }
      else dis.innerText = "tab[0].url = " + tabs[0].url + "\nPlease open the ERP main menu page.";
    }
  );
}));