from services.telemetry_parser import extract_stats
from flask import Blueprint, request, jsonify, current_app
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


upload_bp = Blueprint("upload", __name__)


@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    try:
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No file provided"}), 400

        save_path = os.path.join(
            current_app.config["UPLOAD_FOLDER"], file.filename)
        file.save(save_path)

        lap_id = file.filename.replace(".csv", "")
        stats = extract_stats(save_path)

        return jsonify({"lap_id": lap_id, "stats": stats})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
