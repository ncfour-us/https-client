// Copyright (c) 2024 Tim Hahn

import * as https from "node:https";

export interface HTTPSRequest {
  body: string;
  options: any;
}

export interface HTTPSResponse {
  body: string;
  metadata: any;
}

export class HTTPSClient {
  public static async request(
    reqOptions: HTTPSRequest,
  ): Promise<HTTPSResponse> {
    const responsePromise = new Promise<HTTPSResponse>((resolve, reject) => {
      let response: HTTPSResponse = {
        metadata: undefined,
        body: "",
      };

      const req = https.request(reqOptions.options, (res) => {
        response.metadata = res;

        res.on("data", (d) => {
          response.body = response.body + d;
        });
        res.on("end", () => {
          resolve(response);
        });
      });

      req.on("error", (e) => {
        reject(e);
      });

      req.end();
    });

    return responsePromise;
  }
}
