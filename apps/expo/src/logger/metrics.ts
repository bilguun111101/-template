export type MetricEvents = {
  init: {
    initMs: number;
  };
  "account:loggedIn": {
    logContext: "LoginForm" | "Settings";
    withPassword: boolean;
  };
  "account:loggedOut": {
    logContext: "Settings" | "Deactivated" | "Takendown" | "SignupQueued";
    scope: "current" | "every";
  };
  "router:navigate": {
    from?: string;
  };
  "deepLink:referrerReceived": {
    to: string;
    hostname: string;
    referrer: string;
  };
  "link:clicked": {
    domain: string;
    url: string;
  };
  "signup:backPressed": {
    activeStep: number;
  };
  "signup:captchaSuccess": {};
  "signup:captchaFailure": {};
  "signup:fieldError": {
    field: string;
    errorCount: number;
    errorMessage: string;
    activeStep: number;
  };
  "signup:backgrounded": {
    activeStep: number;
    backgroundCount: number;
  };
  "signup:handleTaken": { typeahead?: boolean };
  "signup:handleAvailable": { typeahead?: boolean };
  "signup:handleSuggestionSelected": { method: string };
  "signin:hostingProviderPressed": {
    hostingProviderDidChange: boolean;
  };
  "signin:hostingProviderFailedResolution": {};
  "signin:success": {
    failedAttemptsCount: number;
    isUsingCustomProvider: boolean;
    timeTakenSeconds: number;
  };
  "signin:backPressed": {
    failedAttemptsCount: number;
  };
  "signin:forgotPasswordPressed": {};
  "signin:passwordReset": {};
  "signin:passwordResetSuccess": {};
  "signin:passwordResetFailure": {};
};
