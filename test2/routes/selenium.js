const webdriver = require('selenium-webdriver');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;

const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const chromCapabilities = webdriver.Capabilities.chrome();
const driver = new webdriver.Builder().withCapabilities(chromCapabilities).build();

let cityList_example = {
    do: [
        { name: "강원도", guOptions: ['강릉시','고성군']}
    ],
    gu: [
        { name: "강릉시", dongOptions: ['강남동','강동면', '경포동']}
    ],
    // dong: [
    //     {guName: "강릉시", name: "강남동"}
    // ],
};

let cityList= { do: [],  gu: [],  dong: [] };


function sleep(ms) {
    return new Promise((resolve) => setTimeout(()=> resolve(), ms));
}

async function connectSite() {
    try {
        await driver.get('https://www.weather.go.kr/weather/main.jsp#dong-forecast');
        await sleep(1000);
        let doOptBoxs = await driver.findElements(By.css(`.select-box:nth-child(1) > ul a`));
        for(let k in  doOptBoxs) {
            await sleep(500);
             // 도 셀렉트 박스 선택 ====> 구 변경
            await driver.findElement(By.css(`.select-box:nth-child(1) > a`)).click(); 
           
            console.log("K: " + k);
            let addK = Number(k)+1;
            let doOptBtn = driver.findElement(By.css(`.select-box:nth-child(1) > ul a:nth-child(${addK})`));
            await doOptBtn.click();

            let guOptBoxs = await driver.findElements(By.css(`.select-box:nth-child(2) > ul a`));
            
            // 도 값들 넣어주기
            let doOptBtnName = await doOptBtn.getText();
            let guOptArr = await getElemsTexts(guOptBoxs);
            cityList.do.push({
                name: doOptBtnName,
                guOptions: guOptArr
            });

            for(let j in  guOptBoxs) {
                await sleep(500);
                 // 구 셀렉트 박스 선택 ====> 동 변경
                await driver.findElement(By.css('.select-box:nth-child(2) > a')).click();
               
                let addJ = Number(j)+1;
                console.log("j: " + j, "addJ: "+ addJ);
                await sleep(500);
                let guOptBtn = driver.findElement(By.css(`.select-box:nth-child(2) > ul a:nth-child(${addJ})`));
                // 
                await guOptBtn.click(); 
                
                // 동 셀렉트 박스 클릭
                await driver.findElement(By.css('.select-box:nth-child(3) > a')).click();
                let dongOptBoxs = await driver.findElements(By.css(`.select-box:nth-child(3) > ul a`));

                // 구 값들 넣어주기
                let guOptBtnName = await guOptBtn.getText();
                let dongOptArr = await getElemsTexts(dongOptBoxs);
                cityList.gu.push({
                    name: guOptBtnName,
                    dongOptions: dongOptArr
                });
                console.log(cityList);
            }
        }

        // let list = await getElemsTexts(await driver.findElements(By.css('.select-box:nth-child(1) > ul a')));
        console.log("다운로드 완료");
        // return cityList;
    } catch (error) {
        console.log(error);
    } finally { 
        
    }
}

connectSite();

async function getElemsTexts(elems) {
    let list = [];
    try {
        for (var i in elems){
            let t = await elems[i].getText();
            list.push(t);
        }
        return list;
    } catch (error) {
        console.log(error);
    }
}

// module.exports.connectSite = connectSite;