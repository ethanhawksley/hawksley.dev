interface Window {
  __getTheme: () => 'light' | 'dark';
  __setTheme: (theme: 'light' | 'dark', save?: boolean, doc?: Document) => void;
  yes: any;
  no: any;

  callPhantom?: unknown;
  _phantom?: unknown;
  phantom?: unknown;
  __nightmare?: unknown;
}

interface Document {
  prerendering?: boolean;

  __selenium_unwrapped?: unknown;
  __webdriver_evaluate?: unknown;
  __driver_evaluate?: unknown;
}

interface Navigator {
  readonly connection?: NetworkInformation;
}

interface NetworkInformation {
  readonly saveData?: boolean;
}
