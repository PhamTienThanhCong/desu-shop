from flask import Flask, jsonify, request
from process import chatbot, training
from process import craw_app
from flask_cors import cross_origin, CORS
# sleep
import time
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# post chat 
@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    # sleep 1s
    # time.sleep(1)
    # get message from request json
    message = request.json['message']
    # get response from chatbot
    response = chatbot.chatResponse(message)
    if response is None:
        response = "I don't understand"
    response = jsonify({'chat': response})
    # return response
    return response

# create a route craw data and save to json file
@app.route('/craw', methods=['GET'])
def craw():
    # return response
    name_craw = "http://localhost:8000/v1/chat"
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
    
# create a route train data from json file
@app.route('/training', methods=['GET'])
def train():
    # return response
    if training.training() != False:
        return jsonify({'train': 'success'})
    else:
        return jsonify({'train': 'fail'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
