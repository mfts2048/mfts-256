export interface Response {
  success: boolean;
  data: any;
}

export function success(data: any): Response {
  return {
    success: true,
    data: data,
  };
}
