export interface ErrorAxios {
  statusCode : number,
  message : string,
}

interface ErrorSanctionProps {
  response: {
    data: {
      message: string;
      error?: string;
    };
    status: number;
  };
}
