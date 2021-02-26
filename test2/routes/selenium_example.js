const webdriver = require('selenium-webdriver');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;

const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var chromCapabilities = webdriver.Capabilities.chrome();
const driver = new webdriver.Builder().withCapabilities(chromCapabilities).build();
function sleep(ms) {
    return new Promise((resolve) => setTimeout(()=> resolve(), ms));
}

async function example() {
    try {
        await driver.get('http://www.google.com/ncr');
        let inputq = driver.findElement(By.name('q'));
        //await inputq.sendKeys('wiki\n');
        await inputq.sendKeys('wiki');
        await sleep(1000);
        await inputq.sendKeys(webdriver.Key.ENTER);
        await driver.wait(check_title, 1000);
    } finally { 
        
    }
  }

function check_title() {
  return driver.getTitle().then(function (title) {
    if (title === 'wiki - Google 검색') {
      console.log('success');
      return true;
    } else {
      console.log('fail -- ' + title);
    }
  });
}

example();