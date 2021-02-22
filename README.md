# NudeNetDemo

## APIs
### Processing input image from form-data request 
- Endpoint: /process 
- Method: POST
- Request
    - Body Type: Form Data
    - Body Params: 
        - key: `image` -- value: input image file
- Response JSON
    - key: `message` -- value: Response message
    - key: `result_image_url` -- value: response_image_filtered_url
### Get all proceed images 
- Endpoint: /histories
- Method: GET
- Request params NONE
- Response
    - key: `histories` -- value: JSONArray of object{  
    `url`: string,  
    `name`: string,  
    `size`: number bytes unit,  
    `time_create`: timestamps  
    }
### Download proceed image by filename
- Endpoint: /download/&lt;filename&gt;
- Method: GET
- Request params
    - `filename`: string (file basename from /histories)
- Response
    - Image output
