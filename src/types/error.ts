import { AxiosError } from "axios";

export interface CustomAxiosError extends AxiosError {
  message: string;
}

export enum PageError {
  Forbidden = "403",
  NotFound = "404",
}
