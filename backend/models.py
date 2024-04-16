from config import db
from uuid import uuid4

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_name = db.Column(db.String(80), unique=True)
    password = db.Column(db.Text, nullable=False)


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