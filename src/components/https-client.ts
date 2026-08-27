// Copyright (c) 2024 Tim Hahn

import * as https from 'node:https';
import { ILogger } from '@ncfour-us/logging';

/**
 * HTTPS Request options
 *
 * body contains the body of the request.
 * options contains options to pass to the https:request call.
 */
export interface HttpsRequest {
  /**
   * The request body to send on the HTTPS request
   */
  body: string;

  /**
   * Options for the HTTPS request, including any HTTP headers
   */
  options: any;
}

/**
 * HTTPS Response data
 *
 * body contains the body of the response. (only if metadata.statusCode is 200 (OK))
 * metadata contains the result of the request
 */
export interface HttpsResponse {
  /**
   * The response body received (if metadata.statusCode is 200 (OK))
   */
  body: string;

  /**
   * HTTPS resopnse metadata, including any HTTP headers
   */
  metadata: {
    /**
     * HTTP status code received in response to the request
     */
    statusCode: number;

    /**
     * HTTP status message received in response to the request
     */
    statusMessage: string;

    /**
     * HTTP headers received in the response
     */
    headers: object;
  };
}

/**
 * Options for instantiating an Https Client
 */
export interface HttpsClientOptions {
  /**
   * optional ILogger instance for the Https Client to use.
   */
  logger?: ILogger;
}

export class HttpsClient {
  // dependencies
  private logger?: ILogger;

  /**
   * Creates a new HttpClient instance.
   *
   * @param logger optional ILogger logger for the HttpClient instance to use.
   */
  constructor(options?: HttpsClientOptions) {
    this.logger = options?.logger;
  }

  /**
   * Perform and asynchronous HTTPS request and return the response.
   *
   * If the response metadata.statusCode is 200 (OK) then the body of the response
   * contains the body of the HTTPS response.
   *
   * @param reqOptions
   * @returns the response from making the HTTPS request.
   */
  public async request(reqOptions: HttpsRequest): Promise<HttpsResponse> {
    this.logger?.log(
      'debug',
      `request body.length: ${reqOptions.body.length}, options: ${JSON.stringify(reqOptions.options, null, 2)}`,
    );

    const responsePromise = new Promise<HttpsResponse>((resolve, reject) => {
      let response: HttpsResponse = {
        metadata: {
          statusCode: 404,
          statusMessage: '',
          headers: {},
        },
        body: '',
      };

      const req = https.request(reqOptions.options, (res) => {
        response.metadata.statusCode = res.statusCode ? res.statusCode : 404;
        response.metadata.statusMessage = res.statusMessage ? res.statusMessage : '';
        response.metadata.headers = res.headers;

        res.on('data', (d) => {
          response.body = response.body + d;
        });

        res.on('end', () => {
          this.logger?.log(
            'debug',
            `response body.length:${response.body.length}, metadata: ${JSON.stringify(response.metadata, null, 2)}`,
          );

          resolve(response);
        });
      });

      req.on('error', (e) => {
        this.logger?.log('error', `error from HttpsClient.request(): ${e}`);
        reject(e);
      });

      // write any body provided
      if (
        reqOptions.body.length > 0 &&
        reqOptions.options.method !== 'GET' &&
        reqOptions.options.method !== 'OPTIONS'
      ) {
        this.logger?.log('debug', `writing body, body.length:${reqOptions.body.length}`);

        req.write(reqOptions.body);
      }

      req.end();
    });

    return responsePromise;
  }
}
