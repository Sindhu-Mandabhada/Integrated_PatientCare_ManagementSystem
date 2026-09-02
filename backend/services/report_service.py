import csv
import os

from database import get_db_connection


def get_report_summary():

    connection = get_db_connection()

    summary = {}

    summary["patients"] = connection.execute("""
        SELECT COUNT(*) AS count
        FROM patients
    """).fetchone()["count"]

    summary["doctors"] = connection.execute("""
        SELECT COUNT(*) AS count
        FROM doctors
    """).fetchone()["count"]

    summary["appointments"] = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
    """).fetchone()["count"]

    summary["consultations"] = connection.execute("""
        SELECT COUNT(*) AS count
        FROM consultations
    """).fetchone()["count"]

    summary["prescriptions"] = connection.execute("""
        SELECT COUNT(*) AS count
        FROM prescriptions
    """).fetchone()["count"]

    connection.close()

    return summary


def export_patients_csv(file_path):

    connection = get_db_connection()

    rows = connection.execute("""
        SELECT *
        FROM patients
    """).fetchall()

    connection.close()

    if not rows:
        return False

    os.makedirs(
        os.path.dirname(file_path),
        exist_ok=True
    )

    with open(
        file_path,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.writer(file)

        writer.writerow(rows[0].keys())

        for row in rows:
            writer.writerow(tuple(row))

    return True


def export_appointments_csv(file_path):

    connection = get_db_connection()

    rows = connection.execute("""
        SELECT *
        FROM appointments
    """).fetchall()

    connection.close()

    if not rows:
        return False

    os.makedirs(
        os.path.dirname(file_path),
        exist_ok=True
    )

    with open(
        file_path,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.writer(file)

        writer.writerow(rows[0].keys())

        for row in rows:
            writer.writerow(tuple(row))

    return True