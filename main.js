console.log("Content script loaded.");

function getInjectedScriptCode() {
  return `
  function runScriptInMyframe() {
    console.log("[Injected] Script running inside myframe context");
    
    // Ensure hidden iframe exists
    function ensureHiddenIframe() {
      if (!document.getElementById("hiddenSave")) {
        const iframe = document.createElement("iframe");
        iframe.id = "hiddenSave";
        iframe.name = "hiddenSave";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }
    }

    function saveActiveElement() {
      return document.activeElement;
    }

    function restoreFocus(el) {
      if (el && typeof el.focus === "function") {
        setTimeout(() => el.focus(), 100); // delay so ERP finishes
      }
    }

    function syncEditors() {
      if (window.CKEDITOR) {
        for (const name in CKEDITOR.instances) {
          console.log("name");
          console.log(name);
          try { CKEDITOR.instances[name].updateElement(); } catch (e) {}
        }
      }
    }

    let cvPreviewWin = null;

    function openOrUpdatePreview(url) {
      const features = "width=800,height=1000,resizable=yes,scrollbars=yes";

      if (!cvPreviewWin || cvPreviewWin.closed) {
        // First time → open a new window
        cvPreviewWin = window.open(url, "cvPreviewWindow", features);
      } else {
        // Already open → just reload/redirect it
        cvPreviewWin.location.href = url;
        // cvPreviewWin.location.reload(); // true to force reload from server
      }
    }


    function saveProfileSilently() {
      ensureHiddenIframe();
      const form = document.getElementById("from2_stu");
      if (!form) {
        console.warn("[Injected] Form #from2_stu not found!");
        return;
      }

      syncEditors();

      form.target = "hiddenSave";
      const modeInput = document.getElementById("mode");
      if (modeInput) modeInput.value = "checkdata";

      console.log("[Injected] Submitting form silently...");
      form.submit();

      setTimeout(() => {
        const previewUrl = \`https://erp.iitkgp.ac.in/TrainingPlacementSSO/cvGenerate.jsp?resume_no=\${window.selectedCV || 1}\`;
        openOrUpdatePreview(previewUrl);

      }, 2000); // wait for backend
    }

    let saveTimer;
    function autoUpdateCV() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveProfileSilently, 500);
    }

    function attachListeners() {
      console.log("[Injected] Attaching listeners inside myframe...");

      document.querySelectorAll("input, select, textarea").forEach(el => {
        if (!el._hasAutoUpdateListener) {
          el.addEventListener("input", autoUpdateCV);
          el._hasAutoUpdateListener = true;
        }
      });

      if (window.CKEDITOR) {
        for (const name in CKEDITOR.instances) {
          const editor = CKEDITOR.instances[name];
          if (!editor._hasAutoUpdateListener) {
            editor.on("change", autoUpdateCV);
            editor._hasAutoUpdateListener = true;
          }
        }
      }
    }

    // Watch for dynamic changes and re-attach
    new MutationObserver(() => attachListeners())
      .observe(document.body, { childList: true, subtree: true });

    attachListeners();
    let previewUrl = "https://erp.iitkgp.ac.in/TrainingPlacementSSO/cvGenerate.jsp?resume_no=" + ${selectedCV};
    openOrUpdatePreview(previewUrl);
  }
  runScriptInMyframe();
  `;
}

// Find myframe and inject script into it
function injectIntoMyframe() {
  const iframe = document.getElementById("myframe");
  if (!iframe) {
    console.warn("myframe not found, retrying...");
    setTimeout(injectIntoMyframe, 1000);
    return;
  }

  try {
    const scriptCode = getInjectedScriptCode();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = scriptCode;
    iframe.contentDocument.documentElement.appendChild(script);
    script.remove();

    console.log("Injected script into myframe");
  } catch (e) {
    console.error("Failed to inject into myframe:", e);
  }
}

injectIntoMyframe();