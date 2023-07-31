from flask import make_response, jsonify
import requests
import pandas as pd
import pandas_ta as ta
import keras
import numpy as np
from sklearn.preprocessing import MinMaxScaler


def response_dict(data={}, success=False, message="", status_code=400):
    """
    The function `response_dict` returns a dictionary with three keys: "data", "success", and "message",
    with the corresponding values passed as arguments.

    :param data: The `data` parameter is used to pass any relevant data that needs to be returned in the
    response. It can be of any data type, such as a string, list, dictionary, etc
    :param success: The "success" parameter is a boolean value that indicates whether the operation was
    successful or not
    :param message: The "message" parameter is a string that represents a message or description of the
    response. It can be used to provide additional information or context about the response
    :return: A dictionary is being returned.
    """
    response = make_response(
        jsonify({"data": data, "success": success, "message": message})
    )
    response.status_code = status_code
    return response


def get_response_data():
    symbol = "ETHBUSD"
    time_period = "3m"
    LIMIT = 300

    url = f"https://api.binance.com/api/v3/klines?symbol={symbol}&interval={time_period}&limit={LIMIT}"

    res_req = requests.get(url).json()

    res = [data for data in res_req]

    return res


def preprocess_data_and_prediction(response_data):
    dataset = pd.DataFrame(response_data)
    dataset.drop_duplicates(inplace=True)
    dataset["index"] = range(0, len(dataset))
    dataset = dataset.set_index("index")
    dataset.drop([0, 6, 7, 8, 9, 10, 11], axis=1, inplace=True)
    dataset.columns = ["Open", "High", "Low", "Close", "Volume"]
    dataset["Open"] = dataset["Open"].astype(float)
    dataset["High"] = dataset["High"].astype(float)
    dataset["Low"] = dataset["Low"].astype(float)
    dataset["Close"] = dataset["Close"].astype(float)
    dataset["Volume"] = dataset["Volume"].astype(float)
    dataset["RSI"] = ta.rsi(dataset["Close"], length=15)
    dataset["EMAF"] = ta.ema(dataset["Close"], length=20)
    dataset["EMAM"] = ta.ema(dataset["Close"], length=100)
    dataset["EMAS"] = ta.ema(dataset["Close"], length=150)
    dataset.drop(index=dataset.index[:150], axis=0, inplace=True)
    print(dataset)
    sc = MinMaxScaler(feature_range=(0, 1))
    data_set_scaled = sc.fit_transform(dataset)

    X = []

    backcandles = 30

    for j in range(8):
        X.append([])
        for i in range(backcandles, data_set_scaled.shape[0]):
            X[j].append(data_set_scaled[i - backcandles : i, j])
    X = np.moveaxis(X, [0], [2])

    X, yi = np.array(X), np.array(data_set_scaled[backcandles:, -1])
    X = X[-5:-1]

    model = keras.models.load_model("./static/trained_model.h5")
    predictions = model.predict(X).tolist()

    scale_prediction = np.zeros((4, 9))
    scale_prediction[:, 3:4] = np.array(predictions)


    predicted_value = sc.inverse_transform(scale_prediction)[:, 3][-1]

    last_open = dataset["Open"].values[-2]
    last_close = dataset["High"].values[-2]

    high, low = high_and_low_calulation_by_close_prediction(last_open, last_close, predicted_value)


    return [last_open, high, low, predicted_value]



def high_and_low_calulation_by_close_prediction(last_open, last_close, predict_close):
    if predict_close > last_close and predict_close > last_open:
        return predict_close * 1.001, last_open * 0.999
    else:
        return last_open * 1.001, predict_close * 0.999