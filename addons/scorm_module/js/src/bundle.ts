import { Scorm12API, getSettingsFromParams, PR } from 'scorm-again';

const urlParams = new URLSearchParams(window.location.search);
let settings = getSettingsFromParams(urlParams);


// Initialize the SCORM API
declare global {
    interface Window {
        API: Scorm12API;
    }
}

window.API = new Scorm12API(settings);

window.API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
    window.API.storeData(true);
    const cmiElement = document.getElementById('cmi');
    if (cmiElement) {
        cmiElement.innerHTML = 'window.API.cmi = ' + JSON.stringify(window.API.renderCommitCMI(true), null, 2);
        cmiElement.classList.remove('prettyprinted');
    }

    if (typeof PR !== 'undefined' && PR.prettyPrint) {
        PR.prettyPrint();
    }
  });

  
// Safe Unloading
let unloaded = false;

function unloadHandler() {
    if (!unloaded && !window.API.isTerminated()) {
        window.API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
        window.API.LMSCommit(''); //save all data that has already been set
        window.API.LMSTerminate(''); //close the SCORM API connection properly
        unloaded = true;
    }
    return false;
  }

window.onbeforeunload = unloadHandler;