declare module "scorm-again" {
  interface ScormSettings {
    // Define the properties of ScormSettings based on your requirements
    [key: string]: any;
  }

  interface CMIElement {
    // Define the properties of CMIElement based on your requirements
    [key: string]: any;
  }

  export class Scorm12API {
    constructor(settings: ScormSettings);
    cmi: CMIElement;
    on(event: string, callback: (CMIElement: CMIElement, value: any) => void): void;
    storeData(commit: boolean): void;
    renderCommitCMI(commit: boolean): CMIElement;
    LMSSetValue(element: string, value: string): string;
    LMSCommit(param: string): string;
    LMSTerminate(param: string): string;
    isTerminated(): boolean;
  }

  export function getSettingsFromParams(params: URLSearchParams): ScormSettings;
  export const PR: any;
}
