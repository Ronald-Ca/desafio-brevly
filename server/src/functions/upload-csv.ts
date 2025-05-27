import { randomUUID } from 'crypto'
import { Readable } from 'stream'
import { extname } from 'path'
import { env } from '../env'
import { r2 } from '../infra/storage/client'
import { Upload } from '@aws-sdk/lib-storage'

interface UploadInput {
  folder: 'downloads'
  fileName: string
  contentType: string
  contentStream: Readable
}
export async function uploadFileToStorage({
  folder,
  fileName,
  contentType,
  contentStream,
}: UploadInput): Promise<{ key: string; url: string }> {
  const extension = extname(fileName)
  const uniqueName = `${folder}/${randomUUID()}-${Date.now()}${extension}`

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uniqueName,
    url: `${env.CLOUDFLARE_PUBLIC_URL}/${uniqueName}`,
  }
}
