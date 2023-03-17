from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

@app.route('/login', methods=['POST'])
def getLogin():

    username = "UWIsa"
    password = "browndawg2010"

    login = {
        "authenticated": "true"
    }

    failed = {
        
    }
    print("got request")
    

    data = request.get_json()
    print(data)
    if not("username" in data):
        return jsonify(failed)
    if not("password" in data):
        return jsonify(failed)

    if data["username"] == username and data["password"] == password:
        return jsonify(login)



    return jsonify(failed)