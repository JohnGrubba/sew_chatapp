from typing import Generator

from database.config import async_session
from crud.user import UserCRUD
from crud.chat import ChatCRUD
from crud.message import MessageCRUD


async def get_db() -> Generator:
    async with async_session() as session:
        async with session.begin():
            yield session


async def get_user_crud() -> Generator:
    async with async_session() as session:
        async with session.begin():
            yield UserCRUD(session)


async def get_chat_crud() -> Generator:
    async with async_session() as session:
        async with session.begin():
            yield ChatCRUD(session)


async def get_messages_crud() -> Generator:
    async with async_session() as session:
        async with session.begin():
            yield MessageCRUD(session)
