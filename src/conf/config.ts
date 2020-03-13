const isProd: boolean = process.env.NODE_ENV === "production";

export interface Params {
  basePath: string;
  isProd: boolean;
}

const getParams = (): Params => {
  return {
    basePath: "",
    isProd,
  }
};

export const config = getParams();
