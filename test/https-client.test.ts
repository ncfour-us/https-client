// Copyright (c) 2024 Tim Hahn

import { test, expect } from "@jest/globals";

import { HTTPSClient, HTTPSRequest, HTTPSResponse } from "../src";

test("http-client", async () => {
  const reqOptions: HTTPSRequest = {
    options: {
      hostname: "www.google.com",
      port: 443,
      path: "/",
      method: "GET",
    },
    body: "",
  };

  const response: HTTPSResponse = await HTTPSClient.request(reqOptions);

  expect(response.metadata.statusCode).toBe(200);
});

test("http-client-unknown-site", async () => {
  const reqOptions: HTTPSRequest = {
    options: {
      hostname: "ncfour.us",
      port: 443,
      path: "/",
      method: "GET",
    },
    body: "",
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
