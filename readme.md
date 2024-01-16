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
    - fileList : [ fileId : string ]

3. Objects
    - fileHash : string(16) \<unique>
    - fileName : string
    - fileSize : number
    - filePath : string
    - fileType : 'image' | 'video' | 'PDF' | 'other


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

#### Tests