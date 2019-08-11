var AWS = require('aws-sdk');
var DataMarshaller = require('@aws/dynamodb-data-marshaller');

var themeSchema = {
  ThemeFileURL: {
    type: 'String'
  },
  CreatedTimestamp: {
    type: 'String'
  },
  UserID: {
    type: 'String'
  },
  UserName: {
    type: 'String'
  },
  ThemeName: {
    type: 'String'
  },
  ThemeDescription: {
    type: 'String'
  },
}

AWS.config.update({
  region: 'us-west-2'
});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

var params = {
  TableName: 'OmniGallery_Themes'
};

exports.default = () => ddb.scan(params).promise().then((data) => data.Items.map((theme) => DataMarshaller.unmarshallItem(themeSchema, theme)), (err) => {
  console.error(err);
});