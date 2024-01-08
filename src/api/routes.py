"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)


@api.route('/register', methods=['POST'])
def create_user():    
    body = json.loads(request.data)    
    user = User(email = body["email"], password= body["password"], is_active = True)    
    db.session.add(user)    
    db.session.commit()

    response_body = {  "msg": " The new user has been created correctly "    }


    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)    
    password = request.json.get("password", None)    
    user = User.query.filter(User.email == email, User.password == password, User.is_active == True).first()    
    print(email,password)   
    if not user :      
          return jsonify({"msg": "Bad username or password"}), 401
    else:           
         access_token = create_access_token(identity=email)     
         response_body = {
            "email": email,                  
            "access_token": access_token}      
         return jsonify(response_body), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run()
    