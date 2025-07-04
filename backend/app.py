from flask import Flask
from routes.upload import upload_bp
from routes.analyze import analyze_bp
from flask_cors import CORS
import os
from routes.lap_data import lap_data_bp


app = Flask(__name__)
CORS(app)  # allow frontend access

UPLOAD_FOLDER = os.path.join(os.getcwd(), "data/uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Register blueprints
app.register_blueprint(upload_bp)
app.register_blueprint(analyze_bp)
app.register_blueprint(lap_data_bp)

if __name__ == "__main__":
    app.run(debug=True)
