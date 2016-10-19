from peewee import *
from database_info import DatabaseInfo


db = PostgresqlDatabase(DatabaseInfo.db_name(), DatabaseInfo.db_info)


class BaseModel(Model):
    """A base model that will use our Postgresql database"""

    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Card(BaseModel):
    title = CharField()
    cardLocation = ForeignKeyField(Board, related_name='cards')


