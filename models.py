from peewee import *
from database_info import DatabaseInfo


# db = PostgresqlDatabase(DatabaseInfo.db_name(), {'user': DatabaseInfo.db_user_name(), 'password': DatabaseInfo.db_password()})
db = PostgresqlDatabase(DatabaseInfo.db_name(), DatabaseInfo.db_info)
# db = PostgresqlDatabase('6_teamwork_week',
#                         **{'user': Read_from_text.connect_data(), 'host': 'localhost', 'port': 5432, 'password': '753951'})


class BaseModel(Model):
    """A base model that will use our Postgresql database"""

    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Card(BaseModel):
    title = CharField()
    cardLocation = ForeignKeyField(Board, related_name='cards')
