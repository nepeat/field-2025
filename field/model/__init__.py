import datetime
import os
from typing import Any
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB

engine = create_async_engine(
    url=os.environ["DATABASE_URL"],
)

sm = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)


class Base(DeclarativeBase):
    type_annotation_map = {dict[str, Any]: JSONB}


class FieldMessage(Base):
    __tablename__ = "field_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    reddit_id: Mapped[str] = mapped_column(unique=True)
    kind: Mapped[str]
    field: Mapped[str]
    timestamp: Mapped[datetime.datetime]
    backend_message: Mapped[dict[str, Any]]
