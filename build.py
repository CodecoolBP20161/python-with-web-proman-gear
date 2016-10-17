from models import *


class Build:
    @staticmethod
    def connect():
        db.connect()
        print('Connected to database')

    @staticmethod
    def drop():
        db.drop_tables([Board, Card], safe=True)
        print('Deleted tables')

    @staticmethod
    def create():
        db.create_tables([Board, Card], safe=True)
        print("Created tables\n")

Build.connect()
Build.create()
