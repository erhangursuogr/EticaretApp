const response = async (res, callBack) => {
    try {
      callBack();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const response2 = (res, status, message, data, callBack) => {
    try {
        callBack();
        res.status(status).json({ message: message, data: data });
    } catch (error) {
        res.status(500).json({ message: "res: "+ error.message });
    }
};

module.exports = response;
