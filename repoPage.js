const cheerio= require('cheerio');
const request= require('request');
const getIssuesPageHtml= require('./issues');

function getReposPageHtml(url, topic){
    request(url, cb);

    function cb(err, response, html){
        if(err){
            console.log(err);
            
        } else{
            getReposLink(html);
        }
    }

    function getReposLink(html){
        let $=cheerio.load(html);
        let headingsArr=$(".f3.color-fg-muted.text-normal.lh-condensed");
        //console.log(headingsArr.length);
        //console.log(topic);
        
        
        for(let i=0; i<8; i++){
            let twoAnchors = $(headingsArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");

            let fullLink=`https://github.com/${link}/issues`;
            //console.log(fullLink);
            let repoName= link.split('/').pop();
            getIssuesPageHtml(fullLink, topic, repoName);
            
        }

        console.log("``````````````````````");
        
    }
}

module.exports= getReposPageHtml;