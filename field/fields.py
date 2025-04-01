from dataclasses import dataclass


@dataclass
class Field:
    sub_id: str
    field: str
    subreddit_id: str


ALL_FIELDS = {
    "field": Field(
        "d705e66b-39d3-4568-b08b-b11655c064c3",
        "field",
        "t5_2rbc9",
    ),
    "whatisfield": Field(
        "8b81865e-e76b-4d51-b1d9-30e4043e0a38",
        "whatisfield",
        "t5_dpi3gj",
    ),
    "banned": Field(
        "076afb2c-8aa3-4bd8-8d68-973c0169974a",
        "banned",
        "t5_dpi2wi",
    ),
    "banana": Field(
        "233820d3-60e3-48de-94ee-8853227c003c",
        "banana",
        "t5_dkz0k9",
    ),
}
