from datetime import datetime

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from models.chat import ChatUsers, ChatModels, Message
import schemas.chat as chat_schema
from sqlalchemy.orm import lazyload


class ChatCRUD:
    db_session = None

    def __init__(self, db_session: AsyncSession = None):
        self.db_session = db_session

    async def get_chats(self):
        stmt = select(ChatModels)
        result = await self.db_session.execute(stmt)
        chats = result.scalars().all()
        return chats

    async def create_chat(self, chat: chat_schema.ChatCreate, username: str):
        chat = ChatModels(name=chat.name, created_by=username)
        self.db_session.add(chat)
        await self.db_session.commit()
        return chat

    async def add_member(self, chat_id: int, username: str):
        chat_user = ChatUsers(chat_id=chat_id, username=username)
        self.db_session.add(chat_user)
        await self.db_session.commit()
        return chat_user

    async def remove_member(self, chat_id: int, username: str):
        stmt = (
            delete(ChatUsers)
            .where(ChatUsers.chat_id == chat_id)
            .where(ChatUsers.username == username)
        )
        await self.db_session.execute(stmt)
        await self.db_session.commit()

    async def remove_chat(self, chat_id: int):
        stmt = delete(ChatModels).where(ChatModels.id == chat_id)
        await self.db_session.execute(stmt)
        await self.db_session.commit()
