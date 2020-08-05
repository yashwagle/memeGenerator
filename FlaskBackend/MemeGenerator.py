from flask import Flask
from flask import request
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

images = ""
imageId = -1


@app.route('/getimages')
def sendImageURLS():
    # Send the image urls to
    # the client
    global images
    return images.text


@app.route('/downloadimage',methods=['POST'])
def sendImage():

    print(request.json)
    return "Ok"

@app.route('/setImage')
def setImage():
    # Sets the the index of the image
    # whenever the image changes
    global imageId
    imageId = request.args.get("id")
    print(imageId)
    return 'Ok'



def getImages():
    # Set the image url from the api
    global images
    images = requests.get("https://api.imgflip.com/get_memes")



if __name__ == '__main__':
    getImages()
    app.run(debug=True)
