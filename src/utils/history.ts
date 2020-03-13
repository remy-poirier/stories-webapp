import { createBrowserHistory } from "history";
import { config } from "conf/config";

export default createBrowserHistory({ basename: config.basePath });
