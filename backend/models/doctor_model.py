<<<<<<< HEAD
from database import get_db_connection


def create_doctor(
    did,
    user_id,
    name,
    specialization,
    phone,
    email,
    experience
):

    connection = get_db_connection()

    connection.execute("""
        INSERT INTO doctors
        (
            did,
            user_id,
            name,
            specialization,
            phone,
            email,
            experience
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        did,
        user_id,
        name,
        specialization,
        phone,
        email,
        experience
    ))

    connection.commit()
    connection.close()


def get_doctor(did):

    connection = get_db_connection()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE did = ?
    """, (did,)).fetchone()

    connection.close()

    return doctor


def get_doctor_by_user_id(user_id):

    connection = get_db_connection()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE user_id = ?
    """, (user_id,)).fetchone()

    connection.close()

    return doctor


def get_all_doctors():

    connection = get_db_connection()

    doctors = connection.execute("""
        SELECT *
        FROM doctors
        ORDER BY created_at DESC
    """).fetchall()

    connection.close()

    return doctors


def update_doctor(
    did,
    name,
    specialization,
    phone,
    email,
    experience,
    status
):

    connection = get_db_connection()

    connection.execute("""
        UPDATE doctors
        SET
            name = ?,
            specialization = ?,
            phone = ?,
            email = ?,
            experience = ?,
            status = ?
        WHERE did = ?
    """, (
        name,
        specialization,
        phone,
        email,
        experience,
        status,
        did
    ))

    connection.commit()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE did = ?
    """, (did,)).fetchone()

    connection.close()

    return doctor


def delete_doctor(did):

    connection = get_db_connection()

    connection.execute("""
        DELETE FROM doctors
        WHERE did = ?
    """, (did,))

    connection.commit()
=======
from database import get_db_connection


def create_doctor(
    did,
    user_id,
    name,
    specialization,
    phone,
    email,
    experience
):

    connection = get_db_connection()

    connection.execute("""
        INSERT INTO doctors
        (
            did,
            user_id,
            name,
            specialization,
            phone,
            email,
            experience
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        did,
        user_id,
        name,
        specialization,
        phone,
        email,
        experience
    ))

    connection.commit()
    connection.close()


def get_doctor(did):

    connection = get_db_connection()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE did = ?
    """, (did,)).fetchone()

    connection.close()

    return doctor


def get_doctor_by_user_id(user_id):

    connection = get_db_connection()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE user_id = ?
    """, (user_id,)).fetchone()

    connection.close()

    return doctor


def get_all_doctors():

    connection = get_db_connection()

    doctors = connection.execute("""
        SELECT *
        FROM doctors
        ORDER BY created_at DESC
    """).fetchall()

    connection.close()

    return doctors


def update_doctor(
    did,
    name,
    specialization,
    phone,
    email,
    experience,
    status
):

    connection = get_db_connection()

    connection.execute("""
        UPDATE doctors
        SET
            name = ?,
            specialization = ?,
            phone = ?,
            email = ?,
            experience = ?,
            status = ?
        WHERE did = ?
    """, (
        name,
        specialization,
        phone,
        email,
        experience,
        status,
        did
    ))

    connection.commit()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE did = ?
    """, (did,)).fetchone()

    connection.close()

    return doctor


def delete_doctor(did):

    connection = get_db_connection()

    connection.execute("""
        DELETE FROM doctors
        WHERE did = ?
    """, (did,))

    connection.commit()
>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    connection.close()