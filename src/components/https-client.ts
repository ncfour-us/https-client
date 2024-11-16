// Copyright (c) 2024 Tim Hahn

import * as https from "node:https";
import { Logger, LogLevel } from "@ncfour/logging";

export interface HTTPSRequest {
  body: string;
  options: any;
}

export interface HTTPSResponse {
  body: string;
  metadata: {
    statusCode: number;
    statusMessage: string;
    headers: object;
  };
}

export class HTTPSClient {
  public static async request(
    reqOptions: HTTPSRequest,
  ): Promise<HTTPSResponse> {
    const logger: Logger = Logger.getLogger("HTTPSClient");

    logger.log(
      LogLevel.DEBUG,
      `request body.length: ${reqOptions.body.length}, options: ${JSON.stringify(reqOptions.options, null, 2)}`,
    );

    const responsePromise = new Promise<HTTPSResponse>((resolve, reject) => {
      let response: HTTPSResponse = {
        metadata: {
          statusCode: 404,
          statusMessage: "",
          headers: {},
        },
        body: "",
      };

      const req = https.request(reqOptions.options, (res) => {
        response.metadata.statusCode = res.statusCode ? res.statusCode : 404;
        response.metadata.statusMessage = res.statusMessage
          ? res.statusMessage
          : "";
        response.metadata.headers = res.headers;

        res.on("data", (d) => {
          response.body = response.body + d;
        });

        res.on("end", () => {
          logger.log(
            LogLevel.DEBUG,
            `response body.length:${response.body.length}, metadata: ${JSON.stringify(response.metadata, null, 2)}`,
          );

          resolve(response);
        });
      });

      req.on("error", (e) => {
        reject(e);
      });

      // write any body provided
      if (
        reqOptions.body.length > 0 &&
        reqOptions.options.method !== "GET" &&
        reqOptions.options.method !== "OPTIONS"
      ) {
        logger.log(
          LogLevel.DEBUG,
          `writing body, body.length:${reqOptions.body.length}`,
        );

        req.write(reqOptions.body);
      }

      req.end();
    });

    return responsePromise;
  }
}
