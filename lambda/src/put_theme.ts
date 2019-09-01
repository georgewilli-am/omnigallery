import DynamoDB from "aws-sdk/clients/dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import uuidv4 from 'uuid';


const client = new DynamoDB();
const table = process.env.TABLE_NAME;

declare namespace OmniGallery {
  interface UploadRequestFile {
    filename: string;
    size: number;
  }

  export interface UploadRequestBody {
    title: string;
    description: string;
    images: UploadRequestFile[];
    theme: UploadRequestFile;
  }
}

// todo: find validation library for specific 400 errors
function validateBody(body: OmniGallery.UploadRequestBody): boolean {
  return (
    !!body &&
    !!body.title &&
    !!body.description &&
    body.description.length < 1024 &&
    !!body.theme &&
    !!body.theme.filename &&
    !!body.theme.size &&
    body.theme.size < 3000000    
  );
}

exports.handler = (
  event: APIGatewayProxyEvent,
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!table) {
    throw new Error(
      "You must define the DynamoDB Table name as an environment variable!"
    );
  }

  let user = null;

  if (event.requestContext.authorizer && event.requestContext.authorizer.principalId) {
    user = event.requestContext.authorizer.principalId;
  } else {
    return Promise.resolve({
      statusCode: 403,
      body: "Missing User ID"
    });
  }

  if (event.body === null || !validateBody(JSON.parse(event.body))) {
    return Promise.resolve({
        statusCode: 400,
        body: "Malformed Request",
    });
  }

  const theme = JSON.parse(event.body);

  const requestParams: DynamoDB.PutItemInput = {
    TableName: table,
    Item: {
      "userId": {
        S: user
      },
      "themeId": {
        S: uuidv4()
      },
      "title": {
        S: theme.title,
      },
      "description": {
        S: theme.description
      },
      
      "theme": {
        M: {
          "filename": {
            S: theme.theme.filename
          },
          "size": {
            N: theme.theme.size.toString()
          },
        }
      },
      "published": {
        BOOL: false,
      },
    }
  };

  return new Promise ((resolve, reject) => {
    client.putItem(requestParams, (e: any, data: any) => {
      if (e) {
        resolve ({
          statusCode: 500,
          body: JSON.stringify({
            e,
            requestParams
          })
        });
      }


      resolve({
        statusCode: 200,
        body: JSON.stringify(data),
      });
    });
  });
};
