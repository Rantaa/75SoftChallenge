from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(80), unique=False, nullable=False)
    day_number = db.Column(db.Integer, unique=False, nullable=False)
    proper_meals = db.Column(db.Boolean, unique=False, default=False)
    exercised = db.Column(db.Boolean, unique=False, default=False)
    water_count = db.Column(db.Boolean, unique=False, default=False)
    step_count = db.Column(db.Boolean, unique=False, default=False)
    read = db.Column(db.Boolean, unique=False, default=False)

    def to_json(self):
        return {
            "id": self.id,
            "user": self.user,
            "dayNumber": self.day_number,
            "properMeals": self.proper_meals,
            "exercised": self.exercised,
            "waterCount": self.water_count,
            "stepCount": self.step_count,
            "read": self.read,
        }