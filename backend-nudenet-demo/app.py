import os
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from NudeNet.nudenet.detector import Detector
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static')
CORS(app)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config['UPLOAD_FOLDER'] = APP_ROOT + '/static/uploads/'
app.config['OUTPUT_FOLDER'] = APP_ROOT + '/static/outputs/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])
if not os.path.exists(app.config['OUTPUT_FOLDER']):
    os.makedirs(app.config['OUTPUT_FOLDER'])

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    exts = filename.rsplit('.', 1)[1].lower()
    return '.' in filename and exts in ALLOWED_EXTENSIONS

def detect_image(inputPath, outputPath):
    detector = Detector()
    result = detector.censor(inputPath,
                             out_path=outputPath,
                             parts_to_blur=['EXPOSED_BREAST_F',
                                            'EXPOSED_GENITALIA_F',
                                            'EXPOSED_ANUS'])
    
def remove_if_exist(filename):
    inUploadFile = app.config['UPLOAD_FOLDER'] + filename
    inOutputFile = app.config['OUTPUT_FOLDER'] + filename
    if os.path.exists(inUploadFile):
        os.remove(inUploadFile)
    if os.path.exists(inOutputFile):
        os.remove(inOutputFile)

@app.errorhandler(500)
def not_found(e):
    return jsonify(error=True,message='Server Error!'), 500
@app.errorhandler(404)
def not_found(e):
    return jsonify(error=True,message='Request Not found!'), 404
@app.errorhandler(405)
def not_found(e):
    return jsonify(error=True,message='Method not allowed!'), 405
@app.route('/')
def hello_world():
    return jsonify(error=True,message='Hello World!!!', buzz='beeeeezz'), 200

@app.route('/process', methods=['POST'])
def process_file():
    # Handle undefined request
    if 'image' not in request.files:
        return jsonify(error=True,message='File not found'), 404
    f = request.files['image']
    if  f.filename == '':
        return jsonify(error=True,message='File not found'), 404
    
    if f and allowed_file(f.filename):
        try:
            filename = secure_filename(f.filename)
            inUploadFile = app.config['UPLOAD_FOLDER'] + filename
            inOutputFile = app.config['OUTPUT_FOLDER'] + filename
        
            # Save image first
            remove_if_exist(filename)
            f.save(os.path.join(inUploadFile))
            # Image processing
            detect_image(inUploadFile, inOutputFile)   
            return jsonify(result_image_url='/static/outputs/' + filename,
                           message='Image transform succesfully!')
        except Exception as e:
            return jsonify(error=True,message='Something wents wrong: ' + e.__class__.__name__)
        
    else:
        return jsonify(error=True,message='Unsupport file!'), 400
