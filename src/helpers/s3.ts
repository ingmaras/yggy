import * as AWS from 'aws-sdk'
import * as fs from 'fs'
import * as mime from 'mime-types'

import { randomString } from './random'

export const uploadFile = async (source: string): Promise<string> => {
  // Read content from the file
  const fileContent = fs.readFileSync(source)

  const key = `${randomString()}`
  const params = {
    Bucket: 'send.iggy.sh',
    Key: key, // File name you want to save as in S3
    Body: fileContent,
    ACL: 'public-read',
    ContentType: mime.lookup(source) || 'application/octet-stream',
  }

  const s3 = new AWS.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' })
  const result = await s3.upload(params).promise()
  return result.Location.replace('s3.eu-west-2.amazonaws.com/', '')
}
