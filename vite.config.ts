import replace from "@rollup/plugin-replace";
import { UserConfig } from "vite";

const apikey = process.env["MICROCMS_API_KEY"];

const config: UserConfig = {
  rollupInputOptions: {
    plugins: [
      replace({
        __microcms_api_key__: apikey,
      }),
    ],
  },
};

export default config;
