interface Result {
  success: boolean;
  errMsg?: string;
  data: any;
}

export const getRes = (data: any, errMsg?: string): Result => {
  return errMsg
    ? {
        success: false,
        errMsg,
        data,
      }
    : {
        success: true,
        data,
      };
};
