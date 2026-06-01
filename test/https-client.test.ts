// Copyright (c) 2024 Tim Hahn

import { test, expect } from '@jest/globals';

import { HTTPSClient, HTTPSRequest, HTTPSResponse } from '../src';

test('http-client', async () => {
  const reqOptions: HTTPSRequest = {
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

  const response: HTTPSResponse = await HTTPSClient.request(reqOptions);

  // console.log(`Response is: ${JSON.stringify(response, null, 2)}`);

  expect(response.metadata.statusCode).toBe(200);
});

test('http-client-unknown-site', async () => {
  const reqOptions: HTTPSRequest = {
    options: {
      hostname: 'ncfour.us',
      port: 443,
      path: '/',
      method: 'GET',
    },
    body: '',
  };

  let errorCode: number = 0;

  try {
    await HTTPSClient.request(reqOptions);
  } catch (e: any) {
    errorCode = e.errno;
    console.log(`Type of e is ${typeof e}`);
    for (const key in e) {
      console.log(`key: ${key}\nvalue: ${e[key]}`);
    }
    console.log(e);
  }

  expect(errorCode).toBe(-3007);
});
