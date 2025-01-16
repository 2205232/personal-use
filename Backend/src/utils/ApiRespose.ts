class ApiRespose {
  status: number;
  data?: object;
  message: string;
  constructor(status: number, message: string, data?: object) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
export default ApiRespose;
