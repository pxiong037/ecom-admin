import multiparty from 'multiparty';
import {DeleteObjectCommand , S3Client} from '@aws-sdk/client-s3';
import {mongooseConnect} from "@/lib/mongoose";
const bucketName = 'tech-comm-nextjs';

export default async function handle(req,res) {
    await mongooseConnect();

    const form = new multiparty.Form();
    const {fileNames} = await new Promise((resolve,reject) => {
        form.parse(req, (err, fileNames) => {
        if (err) reject(err);
        resolve({fileNames});
        });
    });

    const client = new S3Client({
        region: 'us-east-2',
        credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    const links = [];

    if(!!fileNames?.fileName){
        for (const fileName of fileNames.fileName) {
            await client.send(new DeleteObjectCommand ({
                Bucket: bucketName,
                Key: fileName
            }));
            const link = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
            links.push(link);
        }
    }
  
  return res.json({links});
}

export const config = {
  api: {bodyParser: false},
};