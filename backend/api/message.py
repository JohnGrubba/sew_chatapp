from fastapi import APIRouter, Depends

from auth.action import get_current_user
from crud.message import MessageCRUD
from crud.dependencies import get_messages_crud
import schemas.chat as chat_schema
import schemas.user as user_schema
from typing import List

router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("")
async def get_chats(
    chat_id: int,
    db: MessageCRUD = Depends(get_messages_crud),
    current_user: user_schema.Base = Depends(get_current_user),
):
    msges = await db.get_messages(chat_id)
    for msg in msges:
        if msg.sender == current_user.username:
            msg.sender = "me"
    return msges


@router.post("")
async def send_message(
    message: chat_schema.MessageCreate,
    current_user: user_schema.Base = Depends(get_current_user),
    db: MessageCRUD = Depends(get_messages_crud),
):
    return await db.create_message(message, current_user.username)
