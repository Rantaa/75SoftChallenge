from flask import request, jsonify, session, make_response
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import app, db
from models import User, Day

bcrypt = Bcrypt(app)
Session(app)

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorized"})
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.user_name
    })
    
@app.route("/register", methods=["POST"])
def register_user():
    user_name = request.json["userName"]
    password = request.json["password"]
    
    user_exists = User.query.filter_by(user_name=user_name).first() is not None
    
    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(user_name=user_name, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id": new_user.id,
        "username": new_user.user_name
    })
    
    
@app.route("/login", methods=["POST"])
def login_user():
    user_name = request.json["userName"]
    password = request.json["password"]
    
    user = User.query.filter_by(user_name=user_name).first()
    
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id
    
    return jsonify({
        "id": user.id,
        "username": user.user_name
    }), 201, 
    
    # {"Access-Control-Allow-Origin": "*"}
    
    # response = make_response(jsonify({
    #     "id": user.id,
    #     "username": user.user_name
    # }))
    # response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4173'
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    # return response, 201
    
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    # response = make_response("200")
    # response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4173'
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    # return response
    return "200"



@app.route("/create_user_days", methods=["POST"])
def create_user():
    user = request.json["userName"]
    proper_meals = False
    exercised = False
    water_count = False
    step_count = False
    read = False

    try:
        for i in range(75):
            new_user_day = Day(user=user, day_number=i+1, proper_meals=proper_meals, exercised=exercised, water_count=water_count, step_count=step_count, read=read)
            db.session.add(new_user_day)
            db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

@app.route("/get_user", methods=["GET"])
def get_user():
    user_days = Day.query.filter_by(user="VovLo").all()
    json_user_days = list(map(lambda x: x.to_json(), user_days))
    return jsonify({"user": json_user_days})

@app.route("/get_score_per_day", methods=["GET"])
def get_score_per_day():
    user_days = Day.query.filter_by(user="VovLo").all()
    json_user_days = list(map(lambda x: x.to_json(), user_days))
    scores = [list(user_day.values()).count(True) for user_day in json_user_days if user_day != 1]
    scores[0] = scores[0] - 2
    return jsonify({"score_per_day": scores})
    

@app.route("/get_user_day/<int:day>", methods=["GET"])
def get_user_day(day):
    user = "VovLo"
    user_day = Day.query.filter_by(user=user, day_number=day).first()
    json_user_day = user_day.to_json()
    return jsonify({"user_day": json_user_day})

@app.route("/update_user_day/<int:day>", methods=["PATCH"])
def update_user_day(day):
    user = "VovLo"
    user_day = Day.query.filter_by(user=user, day_number=day).first()
    
    data = request.json
    
    user_day.user = data.get("user", user_day.user)
    user_day.day_number = data.get("dayNumber", user_day.day_number)
    user_day.proper_meals = data.get("properMeals", user_day.proper_meals)
    user_day.exercised = data.get("exercised", user_day.exercised)
    user_day.water_count = data.get("waterCount", user_day.water_count)
    user_day.step_count = data.get("stepCount", user_day.step_count)
    user_day.read = data.get("read", user_day.read)

    db.session.commit()

    return jsonify({"message": "Day updated"}), 200
        

if __name__ == '__main__':
    with app.app_context():
        db.create_all()


    app.run(debug=True)