const cheerio= require('cheerio');
const request= require('request');
const getReposPageHtml = require('./repoPage');

const url="https://github.com/topics";

request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err.message);
        
    }
    else{
       getTopicLinks(html);
        
    }
}

function getTopicLinks(html){
    let $=cheerio.load(html);
    let linkEleArr=$(".no-underline.d-flex.flex-column.flex-justify-center");
    for(i=0; i<linkEleArr.length; i++){
        let href=$(linkEleArr[i]).attr("href");
        //console.log(href);
        let topic= href.split('/').pop();
          
        let fullLink= `https://github.com${href}`;
        let dummyLink= `https://github.com/aws`;
        // console.log(fullLink);
        
        getReposPageHtml(fullLink, topic);
    } 
}
