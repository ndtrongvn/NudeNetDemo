# NudeNetDemo

## APIs
1. /process 
- Desc: Processing input image from form-data request
- Method: POST
- Request
    - Body Type: Form Data
    - Body Params: 
        - key: image -- value: input image file
- Response JSON
    - key: message -- value: Response message
    - key: result_image_url -- value: response_image_filtered_url
2. /histories
- Desc: Get all proceed files
- Method: GET
- Request params NONE
- Response JSON
    - key: histories -- value: JSONArray {url, name, size, time_create}
3. /download/<filename>
- Desc: Download proceed file by filename
- Method: GET
- Request params
    - filename: string (file basename from /histories)
- Response
    - Image output
