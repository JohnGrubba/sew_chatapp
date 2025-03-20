from fastapi import APIRouter, Depends

from auth.action import get_current_user
from crud.chat import ChatCRUD
from crud.dependencies import get_chat_crud
import schemas.chat as chat_schema
import schemas.user as user_schema
from typing import List

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("")
async def get_chats(
    db: ChatCRUD = Depends(get_chat_crud),
):
    return await db.get_chats()


@router.post("")
async def create_chat(
    chat: chat_schema.ChatCreate,
    current_user: user_schema.Base = Depends(get_current_user),
    db: ChatCRUD = Depends(get_chat_crud),
):
    return await db.create_chat(chat, current_user.username)


@router.delete("")
async def delete_chat(
    chat: chat_schema.DeleteChat,
    db: ChatCRUD = Depends(get_chat_crud),
):
    return await db.remove_chat(chat.chat_id)


@router.patch("")
async def update_chat(
    chat_id: int,
    chat: chat_schema.ChatCreate,
    db: ChatCRUD = Depends(get_chat_crud),
):
    return await db.update_chat(chat_id, chat)


@router.post("/add_member")
async def add_member(
    chat: chat_schema.AddChatMember,
    db: ChatCRUD = Depends(get_chat_crud),
):
    return await db.add_member(chat.chat_id, chat.username)
