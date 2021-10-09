import S3FileUpload from 'react-s3'
import React from 'react'

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACESS_KEY

const config = {
  bucketName,
  region,
  accessKeyId,
  secretAccessKey
}

const uploadHandler = async event => {
  const imageURL = await S3FileUpload.uploadFile(event.target.files[0], config)
  console.log(imageURL)
}

export default uploadHandler
