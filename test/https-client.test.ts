// Copyright (c) 2024 Tim Hahn

import { test, expect } from '@jest/globals';

import { ILogger, createLogger } from '@ncfour-us/logging';
import { HttpsClient, HttpsRequest, HttpsResponse } from '@ncfour-us/https-client';

const logger: ILogger = createLogger('simple', {
  json: false,
  color: true,
  level: 'debug',
});

test('http-client', async () => {
  // Arrange - Given
  const httpsClient: HttpsClient = new HttpsClient();

  const reqOptions: HttpsRequest = {
    options: {
      hostname: 'www.google.com',
      // hostname: "test-userpool-01.auth.us-east-2.amazoncognito.com",
      port: 443,
      path: '/',
      // path: "/login?client_id=1v3069hugkkfp601d7jj7ou436&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Flocalhost",
      method: 'GET',
    },
    body: '',
  };

  // Act - When
  const response: HttpsResponse = await httpsClient.request(reqOptions);

  // console.log(`Response is: ${JSON.stringify(response, null, 2)}`);

  // Assert - Then
  expect(response.metadata.statusCode).toBe(200);
});

test('http-client-unknown-site', async () => {
  // Arrange - Given
  const httpsClient: HttpsClient = new HttpsClient(logger);

  const reqOptions: HttpsRequest = {
    options: {
      hostname: 'ncfour.us',
      port: 443,
      path: '/',
      method: 'GET',
    },
    body: '',
  };

  let errorCode: number = 0;

  // Act - When
  try {
    await httpsClient.request(reqOptions);
  } catch (e: any) {
    errorCode = e.errno;
    console.log(`Type of e is ${typeof e}`);
    for (const key in e) {
      console.log(`key: ${key}\nvalue: ${e[key]}`);
    }
    console.log(e);
  }

  // Assert - Then
  expect(errorCode).toBe(-3007);
});
