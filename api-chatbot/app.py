from flask import Flask, jsonify, request
from process import training
from process import craw_app
from process import chatbot
from flask_cors import cross_origin, CORS
# sleep
import time
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# post chat 
@app.route('/')
def index():
    return jsonify({'message': 'Hello World'})

@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    # get message from request json
    message = request.json['message']
    # get response from chatbot
    response = chatbot.chatResponse(message)
    if response is None:
        response = "I don't understand"
    response = jsonify({'chat': response})
    # return response
    return response

# create a route train data from json file
@app.route('/training', methods=['GET'])
def train():
    # return response
    if training.training() != False:
        from process import chatbot
        return jsonify({'train': 'success'})
    else:
        return jsonify({'train': 'fail'})

# create a route craw data and save to json file
@app.route('/craw', methods=['GET'])
def craw():
    # return response
    name_craw = "https://nhat-desu-server.onrender.com/v1/chat"
    if craw_app.crawl_website(name_craw):
        return jsonify({'craw': 'success'})
    else:
        return jsonify({'craw': 'fail'})
    
# create a route read data from json file
@app.route('/read', methods=['GET'])
def read():
    # return response
    data = craw_app.read_json()
    if data is not None:
        return jsonify(data)
    else:
        return jsonify({'read': 'fail'})



if __name__ == '__main__':
    app.run()