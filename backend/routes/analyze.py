from flask import Blueprint, jsonify
from services.ai_summary import generate_summary

analyze_bp = Blueprint("analyze", __name__)


@analyze_bp.route("/analyze/<lap_id>", methods=["GET"])
def analyze_lap(lap_id):
    filepath = f"data/uploads/{lap_id}.csv"
    try:
        result = generate_summary(filepath)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
