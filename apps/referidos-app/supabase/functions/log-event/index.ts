import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { forwardSupportLogsToObsIngest } from "../_shared/supportLogBridge.ts";

serve((req) => forwardSupportLogsToObsIngest(req));
