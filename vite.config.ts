import replace from "@rollup/plugin-replace";
import { UserConfig } from "vite";

const apikey = process.env["MICROCMS_API_KEY"];
const apiname = process.env["MICROCMS_API_NAME"];

const config: UserConfig = {
  rollupInputOptions: {
    plugins: [
      replace({
        __microcms_api_key__: apikey,
        __microcms_api_name__: apiname,
      }),
    ],
  },
};

export default config;
