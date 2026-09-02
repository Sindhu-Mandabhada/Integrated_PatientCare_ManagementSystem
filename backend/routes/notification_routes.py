from flask import Blueprint, request, jsonify

from models.notification_model import (
    create_notification,
    get_user_notifications,
    mark_notification_read,
    delete_notification
)


notification_bp = Blueprint(
    "notifications",
    __name__
)


# ==============================
# GET USER NOTIFICATIONS
# ==============================

@notification_bp.route(
    "/user/<int:user_id>",
    methods=["GET"]
)
def notifications(user_id):

    rows = get_user_notifications(user_id)

    return jsonify({
        "success": True,
        "notifications": [dict(row) for row in rows]
    })


# ==============================
# CREATE NOTIFICATION
# ==============================

@notification_bp.route("", methods=["POST"])
def add_notification():

    data = request.get_json() or {}

    user_id = data.get("user_id")
    message = data.get("message")

    if not user_id or not message:

        return jsonify({
            "success": False,
            "message": "User ID and message are required"
        }), 400

    notification_id = create_notification(
        user_id,
        message
    )

    return jsonify({
        "success": True,
        "message": "Notification created",
        "notification_id": notification_id
    }), 201


# ==============================
# MARK AS READ
# ==============================

@notification_bp.route(
    "/<int:notification_id>/read",
    methods=["PUT"]
)
def mark_read(notification_id):

    data = request.get_json() or {}

    user_id = data.get("user_id")

    if not user_id:

        return jsonify({
            "success": False,
            "message": "User ID is required"
        }), 400

    mark_notification_read(
        notification_id,
        user_id
    )

    return jsonify({
        "success": True,
        "message": "Notification marked as read"
    })


# ==============================
# DELETE
# ==============================

@notification_bp.route(
    "/<int:notification_id>",
    methods=["DELETE"]
)
def remove_notification(notification_id):

    data = request.get_json() or {}

    user_id = data.get("user_id")

    if not user_id:

        return jsonify({
            "success": False,
            "message": "User ID is required"
        }), 400

    delete_notification(
        notification_id,
        user_id
    )

    return jsonify({
        "success": True,
        "message": "Notification deleted"
    })