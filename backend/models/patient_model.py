from database import get_db_connection


def create_patient(
    pid,
    user_id,
    name,
    age,
    gender,
    phone,
    email,
    blood_group,
    address
):

    connection = get_db_connection()

    connection.execute("""
        INSERT INTO patients
        (
            pid,
            user_id,
            name,
            age,
            gender,
            phone,
            email,
            blood_group,
            address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        pid,
        user_id,
        name,
        age,
        gender,
        phone,
        email,
        blood_group,
        address
    ))

    connection.commit()
    connection.close()


def get_patient(pid):

    connection = get_db_connection()

    patient = connection.execute("""
        SELECT *
        FROM patients
        WHERE pid = ?
    """, (pid,)).fetchone()

    connection.close()

    return patient


def get_patient_by_user_id(user_id):

    connection = get_db_connection()

    patient = connection.execute("""
        SELECT *
        FROM patients
        WHERE user_id = ?
    """, (user_id,)).fetchone()

    connection.close()

    return patient


def get_all_patients():

    connection = get_db_connection()

    patients = connection.execute("""
        SELECT *
        FROM patients
        ORDER BY created_at DESC
    """).fetchall()

    connection.close()

    return patients


def update_patient(
    pid,
    name,
    age,
    gender,
    phone,
    email,
    blood_group,
    address
):

    connection = get_db_connection()

    connection.execute("""
        UPDATE patients
        SET
            name = ?,
            age = ?,
            gender = ?,
            phone = ?,
            email = ?,
            blood_group = ?,
            address = ?
        WHERE pid = ?
    """, (
        name,
        age,
        gender,
        phone,
        email,
        blood_group,
        address,
        pid
    ))

    connection.commit()

    updated = connection.execute("""
        SELECT *
        FROM patients
        WHERE pid = ?
    """, (pid,)).fetchone()

    connection.close()

    return updated


def delete_patient(pid):

    connection = get_db_connection()

    connection.execute("""
        DELETE FROM patients
        WHERE pid = ?
    """, (pid,))

    connection.commit()
    connection.close()