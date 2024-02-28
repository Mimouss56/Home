export interface ErrorAxios {
  statusCode : number,
  message : string,
}

export interface ErrorSanctionProps {
  response: {
    data: {
      message: string;
      error?: string;
    };
    status: number;
  };
}
