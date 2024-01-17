## AWS S3 Bucket

#### Introduction

Build a AWS S3 like service. The following link has complete list of AWS S3 REST API.

[Link to AWS Docs](https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations_Amazon_Simple_Storage_Service.html)

#### Data modelling
1. Users
    - fullName : string
    - email : string
    - passwordHash : string

2. Buckets
    - bucketName : string \<unique>
    - CreatedBy : string
    - ObjectList : [{}]


#### Functions

1. Get object
    - Return the object 

2. Put object
    - Upload a file

3. Delete object
    - Delete the file

4. List objects
    - List all objects inside a bucket

5. List buckets
    - List all buckets of the user

### S3 API Endpoints

All endpoints are prefixed with `/api/v1/s3`.

#### List Buckets

- **Endpoint:** `GET /`
- **Description:** Retrieve a list of all S3 buckets.
- **Usage:** Retrieve information about existing S3 buckets.

#### Create Bucket

- **Endpoint:** `POST /`
- **Description:** Create a new S3 bucket.
- **Usage:** Provide the necessary parameters to create a new S3 bucket.

#### List Objects in a Bucket

- **Endpoint:** `GET /:bucketName`
- **Description:** Retrieve a list of objects within a specified S3 bucket.
- **Usage:** Provide the `bucketName` parameter to get a list of objects in the specified bucket.

#### Upload Object to Bucket

- **Endpoint:** `POST /:bucketName`
- **Description:** Upload an object to a specified S3 bucket.
- **Usage:** Provide the `bucketName` parameter and include the file in the request.

#### Get Object from Bucket

- **Endpoint:** `GET /:bucketName/:objectHash`
- **Description:** Retrieve a specific object from a specified S3 bucket.
- **Usage:** Provide the `bucketName` parameter and the `objectHash` parameter to get the specified object.

#### Delete Object from Bucket

- **Endpoint:** `DELETE /:bucketName/:objectHash`
- **Description:** Delete a specific object from a specified S3 bucket.
- **Usage:** Provide the `bucketName` parameter and the `objectHash` parameter to delete the specified object.


#### Tests