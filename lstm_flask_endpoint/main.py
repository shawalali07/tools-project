from flask import Flask
from utils import response_dict, get_response_data, preprocess_data_and_prediction
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/prediction/", methods=["GET"])
@cross_origin()
def prediction():

    data = get_response_data()

    predicted_data = preprocess_data_and_prediction(data)

    return response_dict(
        data=predicted_data,
        success=True,
        message="Data Retrived Successfully",
        status_code=200,
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
