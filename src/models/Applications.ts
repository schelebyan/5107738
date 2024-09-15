import theme from "../theme";
import { toUrl } from "../utils/string";
import BaseModel, { IBaseModelResponse } from "./baseModel";

export type IApplicationsResponse = IBaseModelResponse;

export interface Application {
  description: string;
  long_name: string;
  short_name: string;
  route: string;
  color: string;
}

enum colors {
  Timer = "#13780c",
}

export default class Applications extends BaseModel {
  apps: Application[];

  constructor(response: IApplicationsResponse) {
    super(response);
    const { data } = response;
    const apps = data as Application[];

    apps.forEach((app: Application) => {
      app.route = toUrl(app.short_name);
      app.color = (<never>colors)[app.short_name]
        ? (<never>colors)[app.short_name]
        : theme.palette.primary.main;
    });

    this.apps = apps;
  }
}
