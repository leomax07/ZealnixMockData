export interface ToastStoreType {
  severity: "success" | "info" | "error" | "warn";
  summary: "SUCCESS" | "ERROR" | "INFO" | "WARNING" | '';
  message: string;
  life?: 2000 | 3000 | 5000;
}

export interface ToastPayloadType {
  summary?: "SUCCESS" | "ERROR" | "INFO" | "WARNING";
  message: string;
  life?: 2000 | 3000 | 5000;
}
