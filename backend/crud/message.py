from datetime import datetime

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from models.chat import ChatUsers, ChatModels, Message
import schemas.chat as chat_schema


class MessageCRUD:
    db_session = None

    def __init__(self, db_session: AsyncSession = None):
        self.db_session = db_session

    async def get_messages(self, chat_id: int):
        stmt = select(Message).where(Message.chat_id == chat_id).order_by(Message.sent_at.asc())
        result = await self.db_session.execute(stmt)
        chats = result.scalars().all()
        return chats

    async def create_message(self, chat: chat_schema.MessageCreate, username: str):
        chat = Message(chat_id=chat.chat_id, content=chat.content, sender=username)
        self.db_session.add(chat)
        await self.db_session.commit()
        return chat
