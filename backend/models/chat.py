from datetime import datetime
from sqlalchemy import Column, VARCHAR, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship

from database.config import Base


class ChatUsers(Base):
    __tablename__ = "chat_users"

    chat_id = Column(
        Integer, ForeignKey("chats.id", ondelete="cascade"), primary_key=True
    )
    username = Column(
        VARCHAR, ForeignKey("users.username", ondelete="cascade"), primary_key=True
    )
    joined_at = Column(DateTime, default=datetime.utcnow())

    # Relationships
    user = relationship("UserModels", back_populates="chats")
    chat = relationship("ChatModels", back_populates="users")

    def __init__(self, chat_id: int, username: str):
        self.chat_id = chat_id
        self.username = username

    def __repr__(self) -> str:
        return f"<ChatUsers(chat_id={self.chat_id}, username={self.username})>"


# Create Chat class
class ChatModels(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow())
    created_by = Column(VARCHAR, ForeignKey("users.username", ondelete="cascade"))

    # Relationships
    users = relationship("ChatUsers", back_populates="chat")
    messages = relationship("Message", back_populates="chat")

    def __init__(self, name: str, created_by: str = None):
        self.name = name
        self.created_by = created_by

    def __repr__(self) -> str:
        return f"<ChatModels(id={self.id}, name={self.name}, created_by={self.created_by})>"


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(
        Integer, ForeignKey("chats.id", ondelete="cascade"), nullable=False
    )
    sender = Column(
        VARCHAR, ForeignKey("users.username", ondelete="cascade"), nullable=False
    )
    content = Column(Text, nullable=False)
    sent_at = Column(DateTime, default=datetime.utcnow())

    # Relationships
    chat = relationship("ChatModels", back_populates="messages")
    user = relationship("UserModels")

    def __init__(self, chat_id: int, sender: str, content: str):
        self.chat_id = chat_id
        self.sender = sender
        self.content = content

    def __repr__(self) -> str:
        return f"<Message(id={self.id}, chat_id={self.chat_id}, sender={self.sender})>"
