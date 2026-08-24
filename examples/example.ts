// This is an example of an example TypeScript program
// Compile this using:
//   pnpm compile:examples
// Run this using:
//   node examples/lib/examples/example.js

import { ILogger, createLogger } from '@ncfour-us/logging';
import { HttpsClient, HttpsResponse } from '@ncfour-us/https-client';

const myLogger: ILogger = createLogger('simple', {
  json: false,
  color: true,
  level: 'trace',
});

const myHttpClient = new HttpsClient(myLogger);

try {
  const response: HttpsResponse = await myHttpClient.request({
    options: {
      hostname: 'www.google.com',
      port: 443,
      path: '/',
      method: 'GET',
    },
    body: '',
  });

  if (response?.metadata.statusCode === 200) {
    myLogger.log(
      'info',
      `summary of response body: ${response.body.substring(0, 50)}...${response.body.substring(response.body.length - 50)}`,
    );
  } else {
    myLogger.log(
      'error',
      `problem with request, response metadata:\n ${JSON.stringify(response.metadata, null, 2)}`,
    );
  }
} catch (e) {
  myLogger.log('error', `problem with request, e: ${JSON.stringify(e, null, 2)}`);
}
