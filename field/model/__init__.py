import datetime
import os
from typing import Any
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB

from field.constants import DEVVIT_BASE

# normal engine
engine = create_async_engine(
    url=os.environ["DATABASE_URL"],
)

sm = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

# autocommit engine
engine_autocommit = create_async_engine(
    url=os.environ["DATABASE_URL"],
    isolation_level="AUTOCOMMIT",
)

sm_autocommit = async_sessionmaker(
    engine_autocommit,
    expire_on_commit=False,
    class_=AsyncSession,
)


class Base(DeclarativeBase):
    type_annotation_map = {dict[str, Any]: JSONB}


class DictableBase(Base):
    __abstract__ = True

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class FieldMessage(DictableBase):
    __tablename__ = "field_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    reddit_id: Mapped[str] = mapped_column(unique=True)
    kind: Mapped[str]
    field: Mapped[str]
    timestamp: Mapped[datetime.datetime]
    backend_message: Mapped[dict[str, Any]]


class FieldPartitionUpdate(DictableBase):
    __tablename__ = "partition_updates"

    partition_x: Mapped[int] = mapped_column(primary_key=True)
    partition_y: Mapped[int] = mapped_column(primary_key=True)
    subredditId: Mapped[str] = mapped_column(primary_key=True)
    kind: Mapped[str] = mapped_column(primary_key=True)
    challengeNumber: Mapped[int] = mapped_column(primary_key=True)
    sequenceNumber: Mapped[int] = mapped_column(primary_key=True)
    noChange: Mapped[bool]
    pathPrefix: Mapped[str]

    @classmethod
    def from_payload(cls, message: dict):
        message = message.copy()

        if "partitionXY" in message:
            message["partition_x"] = int(message["partitionXY"]["x"])
            message["partition_y"] = int(message["partitionXY"]["y"])
            del message["partitionXY"]

        return cls(**message)

    @property
    def url(self):
        if self.kind == "deltas":
            kind_short = "d"
        else:
            kind_short = "p"

        return f"{DEVVIT_BASE}/a1/field-app/px_{self.partition_x}__py_{self.partition_y}/{self.subredditId}/{kind_short}/{self.challengeNumber}/{self.sequenceNumber}"
