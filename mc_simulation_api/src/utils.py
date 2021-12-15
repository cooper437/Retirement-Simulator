def null_safe_lowercase(maybe_null_str):
    return None if maybe_null_str is None else maybe_null_str.lower()
