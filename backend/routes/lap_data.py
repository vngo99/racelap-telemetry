from flask import Blueprint, jsonify
import pandas as pd

lap_data_bp = Blueprint("lap_data", __name__)


@lap_data_bp.route("/lap/<lap_id>", methods=["GET"])
def get_lap_data(lap_id):
    filepath = f"data/uploads/{lap_id}.csv"
    df = pd.read_csv(filepath)
    df = df.round(3)
    return jsonify(df.to_dict(orient="records"))
