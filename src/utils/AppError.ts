class AppError extends Error {
  status: "Error!" | "Fail!";
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "Error!" : "Fail!";
  }
}

export default AppError;
