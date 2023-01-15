from flask import Flask, jsonify, request
from process import chatbot, training
from process import craw_app

app = Flask(__name__)

# post chat 
@app.route('/chat', methods=['POST'])
def chat():
    # get message from request json
    message = request.json['message']
    # get response from chatbot
    response = chatbot.chatResponse(message)
    # return response
    return jsonify({'chat': response})

# create a route craw data and save to json file
@app.route('/craw', methods=['GET'])
def craw():
    # return response
    name_craw = "http://127.0.0.1:8080/"
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
