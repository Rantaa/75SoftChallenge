from flask import request, jsonify
from config import app, db
from models import Contact, Day


@app.route("/create_user", methods=["POST"])
def create_user():
    user = "VovLo"
    day_number = 0
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
    
    
    # users = Day.query.filter_by(user="VovLo").all()
    # db.session.delete(users[0])
    # db.session.commit()

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
    # user_day = Day.query.filter_by(id=1).first()
    # json_user_day = list(map(lambda x: x.to_json(), user_day))
    
    data = request.json
    
    print(f"{'This is the data':#^150}")
    print(data)
    print(f"{'This is the user_day':#^150}")
    print(user_day)
    
    user_day.user = data.get("user", user_day.user)
    user_day.day_number = data.get("dayNumber", user_day.day_number)
    user_day.proper_meals = data.get("properMeals", user_day.proper_meals)
    user_day.exercised = data.get("exercised", user_day.exercised)
    user_day.water_count = data.get("waterCount", user_day.water_count)
    user_day.step_count = data.get("stepCount", user_day.step_count)
    user_day.read = data.get("read", user_day.read)

    db.session.commit()

    return jsonify({"message": "Day updated"}), 200
    
    


@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}), 
            400,)
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_nane = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "User updated"}), 200

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

        

if __name__ == '__main__':
    with app.app_context():
        db.create_all()


    app.run(debug=True)