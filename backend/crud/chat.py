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

    async def get_members(self, chat_id: int) -> List[str]:
        stmt = select(ChatUsers.username).where(ChatUsers.chat_id == chat_id)
        result = await self.db_session.execute(stmt)
        members = result.scalars().all()
        return members

    async def get_chats(self, username: str):
        stmt = (
            select(ChatModels)
            .options(lazyload(ChatModels.users))
            .where(
                ChatModels.created_by == username
                or ChatModels.users.any(username=username)
            )
        )
        result = await self.db_session.execute(stmt)
        chats = result.scalars().all()
        return chats

    async def create_chat(self, chat: chat_schema.ChatCreate, username: str):
        new_chat = ChatModels(name=chat.name, created_by=username)
        self.db_session.add(new_chat)
        await self.db_session.flush()  # Flush to generate the ID
        chat_id = new_chat.id
        chat_user = ChatUsers(chat_id=chat_id, username=username)
        self.db_session.add(chat_user)
        return new_chat

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

    async def update_chat(self, chat_id: int, chat: chat_schema.ChatCreate):
        stmt = update(ChatModels).where(ChatModels.id == chat_id).values(name=chat.name)
        stmt.execution_options(synchronize_session="fetch")
        await self.db_session.execute(stmt)
