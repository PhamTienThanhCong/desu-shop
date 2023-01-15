from flask import Flask, jsonify
from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    # load data from data.json
    with open('./data/intents.json') as json_file:
        data = json.load(json_file)
    # return the data as a JSON response
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
