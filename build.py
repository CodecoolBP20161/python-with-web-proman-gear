from models import *


class Build:
    @staticmethod
    def connect():
        db.connect()
        print('Connected to database')

    @staticmethod
    def drop():
        db.drop_tables([Person, Applicant, City, Mentor, InterviewSlot, InterviewSlotMentor, EmailLog], safe=True)
        print('Deleted tables')

    @staticmethod
    def create():
        db.create_tables([Person, Applicant, City, Mentor, InterviewSlot, InterviewSlotMentor, EmailLog], safe=True)
        print("Created tables\n")
