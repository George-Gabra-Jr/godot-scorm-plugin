import { Scorm12API, PR } from 'scorm-again';

let settings = {}

let API = new Scorm12API(settings);

API.on('LMSSetValue.cmi.*', function(_CMIElement, _value) {
    API.storeData(true);
    const cmiElement = document.getElementById('cmi');
    if (cmiElement) {
        cmiElement.innerHTML = 'window.API.cmi = ' + JSON.stringify(API.renderCommitCMI(true), null, 2);
        cmiElement.classList.remove('prettyprinted');
    }

    if (typeof PR !== 'undefined' && PR.prettyPrint) {
        PR.prettyPrint();
    }
  });

  
// Safe Unloading
let unloaded = false;

function unloadHandler() {
    if (!unloaded && !API.isTerminated()) {
        API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
        API.LMSCommit(''); //save all data that has already been set
        API.LMSTerminate(''); //close the SCORM API connection properly
        unloaded = true;
    }
    return false;
  }

window.onbeforeunload = unloadHandler;