interface Window {
  __getTheme: () => 'light' | 'dark';
  __setTheme: (theme: 'light' | 'dark', save?: boolean, doc?: Document) => void;
  yes: any;
  no: any;
}
