from pydantic import BaseModel
from datetime import datetime


class ChatDB(BaseModel):
    id: int
    name: str
    created_at: datetime
    created_by: str


class MessageDB(BaseModel):
    id: int
    chat_id: int
    sender: str
    content: str
    sent_at: datetime


class ChatCreate(BaseModel):
    name: str


class MessageCreate(BaseModel):
    chat_id: int
    content: str


class AddChatMember(BaseModel):
    chat_id: int
    username: str
