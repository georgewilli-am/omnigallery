# OmniGallery
## Lamba Functions & Serverless Configuration

### Upload New Theme
Below is the structure that the upload function is expecting to receive in JSON format, please note that the file objects will not contain real file objects as we do not want to upload files via API Gateway, we will be sending the client back URLs to PUT the files to.

File sizes are sent in bytes and used to validate the file being uploaded as a security measure.

```json
{
	"title": "Sample Theme",
	"description": "Sample Theme Description.",
	"images": [
		{
			"filename": "theme1.jpg",
			"size": 500000
		},
		{
			"filename": "theme2.png",
			"size": 250000
		}
	],
	"theme": {
		"filename:" "sample_theme.ofstyle",
		"size": 500000
	}
}
```

Once this payload has been submitted to the uploading function, it will store the theme in the DynamoDB table and send the client a response which should be as follows:

```json
{
	"status": "OK",
	"data": {
		"theme": {
			"id": "1",
			"title": "Sample Theme",
			"description": "Sample Theme Description."
			"published": false
		},
		"upload_urls": {
			"theme": "https://xxxx.s3-xx-xxxx-x.amazonaws.com/"
			"images": [
				"https://xxxx.s3-xx-xxxx-x.amazonaws.com/",
				"https://xxxx.s3-xx-xxxx-x.amazonaws.com/",
			]
		}
	}
}
```

