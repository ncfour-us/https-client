[@ncfour-us/https-client](../index.md) / HttpsClient

# Class: HttpsClient

## Constructors

### Constructor

> **new HttpsClient**(`logger?`): `HttpsClient`

Creates a new HttpClient instance.

#### Parameters

##### logger?

`ILogger`

optional ILogger logger for the HttpClient instance to use.

#### Returns

`HttpsClient`

## Methods

### request()

> **request**(`reqOptions`): `Promise`\<[`HttpsResponse`](../interfaces/HttpsResponse.md)\>

Perform and asynchronous HTTPS request and return the response.

If the response metadata.statusCode is 200 (OK) then the body of the response
contains the body of the HTTPS response.

#### Parameters

##### reqOptions

[`HttpsRequest`](../interfaces/HttpsRequest.md)

#### Returns

`Promise`\<[`HttpsResponse`](../interfaces/HttpsResponse.md)\>

the response from making the HTTPS request.
