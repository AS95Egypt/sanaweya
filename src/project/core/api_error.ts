import { ResponseErrorCodes } from "./constants";

export class ApiError extends Error {
  public success: boolean;

  constructor(
    message: string,
    public statusCode: number,
    public errorCode: string = ResponseErrorCodes.NORMAL
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.success = !(
      `${statusCode}`.startsWith("4") || !`${statusCode}`.startsWith("5")
    );
  }
}
