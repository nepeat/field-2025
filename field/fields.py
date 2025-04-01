from dataclasses import dataclass


@dataclass
class Field:
    socket_id: str
    field: str
    subreddit_id: str


ALL_FIELDS = {
    "field": Field(
        socket_id="d705e66b-39d3-4568-b08b-b11655c064c3",
        field="field",
        subreddit_id="t5_2rbc9",
    ),
    "whatisfield": Field(
        socket_id="8b81865e-e76b-4d51-b1d9-30e4043e0a38",
        field="whatisfield",
        subreddit_id="t5_dpi3gj",
    ),
    "banned": Field(
        socket_id="076afb2c-8aa3-4bd8-8d68-973c0169974a",
        field="banned",
        subreddit_id="t5_dpi2wi",
    ),
    "banana": Field(
        socket_id="233820d3-60e3-48de-94ee-8853227c003c",
        field="banana",
        subreddit_id="t5_dkz0k9",
    ),
}
