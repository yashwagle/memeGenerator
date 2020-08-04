from flask import Flask
from urllib.request import urlopen
import json



app = Flask(__name__)

@app.route('/')
def downloadImage():
    return "Hello World"


if __name__ == '__main__':
