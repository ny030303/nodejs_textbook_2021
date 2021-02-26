const axios = require("axios");
const iconv = require("iconv-lite");

const url = "https://www.weather.go.kr/weather/main.jsp#dong-forecast";

const getHtml = async () => {
  try {
    const {data} = await axios({url, responseType: "arraybuffer"});
    let data = iconv.decode(data, "EUC-KR").toString();
    return 
  } catch (error) {
    console.error(error);
  }
};



  module.exports.getHtml = getHtml;