[@ncfour-us/https-client](../index.md) / HttpsResponse

# Interface: HttpsResponse

HTTPS Response data

body contains the body of the response. (only if metadata.statusCode is 200 (OK))
metadata contains the result of the request

## Properties

### body

> **body**: `string`

The response body received (if metadata.statusCode is 200 (OK))

***

### metadata

> **metadata**: `object`

HTTPS resopnse metadata, including any HTTP headers

#### headers

> **headers**: `object`

HTTP headers received in the response

#### statusCode

> **statusCode**: `number`

HTTP status code received in response to the request

#### statusMessage

> **statusMessage**: `string`

HTTP status message received in response to the request
