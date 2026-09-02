import logging
import os
from functools import wraps
from flask import request


# ==============================
# CREATE LOG DIRECTORY
# ==============================

LOG_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "logs"
)

os.makedirs(LOG_DIR, exist_ok=True)


# ==============================
# AUDIT LOGGER
# ==============================

audit_logger = logging.getLogger("MediTrackAudit")

audit_logger.setLevel(logging.INFO)

log_file = os.path.join(
    LOG_DIR,
    "audit.log"
)

file_handler = logging.FileHandler(
    log_file
)

formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s"
)

file_handler.setFormatter(formatter)

if not audit_logger.handlers:
    audit_logger.addHandler(file_handler)


# ==============================
# AUDIT DECORATOR
# ==============================

def audit_action(action):

    def decorator(f):

        @wraps(f)
        def decorated(*args, **kwargs):

            user = getattr(
                request,
                "user",
                {}
            )

            user_id = user.get(
                "user_id",
                "anonymous"
            )

            role = user.get(
                "role",
                "unknown"
            )

            try:

                response = f(
                    *args,
                    **kwargs
                )

                audit_logger.info(
                    "USER=%s ROLE=%s ACTION=%s METHOD=%s PATH=%s STATUS=SUCCESS",
                    user_id,
                    role,
                    action,
                    request.method,
                    request.path
                )

                return response

            except Exception as error:

                audit_logger.error(
                    "USER=%s ROLE=%s ACTION=%s METHOD=%s PATH=%s ERROR=%s",
                    user_id,
                    role,
                    action,
                    request.method,
                    request.path,
                    str(error)
                )

                raise

        return decorated

    return decorator