# basic web server using flask run in host vps

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    from waitress import serve
    serve(app)
    app.run()