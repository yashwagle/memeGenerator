from flask import Flask
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

images = ""

@app.route('/getimages')
def sendImageURLS():
    global images
    return images.text




def getImages():
    global images
    images = requests.get("https://api.imgflip.com/get_memes")



if __name__ == '__main__':
    getImages()
    app.run(debug=True)
