export type IBaseModelResponse = {
  data: unknown;
};
export default class BaseModel {
  data: unknown;

  constructor(response: IBaseModelResponse) {
    const { data } = response;
    this.data = data;
  }
}
