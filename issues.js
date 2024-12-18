const cheerio= require('cheerio');
const request= require('request');
const fs= require('fs');
const path= require('path');

function getIssuesPageHtml(url, topic, repoName){
    request(url, cb);

    function cb(err, response, html){
        if(err){
            console.log(err);
            
        } else{
            //console.log(html);
            getIssues(html);
        }
    }

    function getIssues(html){
        let $=cheerio.load(html);
        let issuesEleArr= $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        //console.log(issuesEleArr.length);
        let arr=[];
        let issueName='';

        for(let i=0; i<issuesEleArr.length; i++){
            let link=$(issuesEleArr[i]).attr("href");
            issueName= $(issuesEleArr[i]).text();
            arr.push(issueName+" "+`https://github.com${link}`);
        }
        console.log(topic,"      ", arr);
        let folderpath= path.join(__dirname, topic);
        dirCreator(folderpath);
        let filePath= path.join(folderpath, repoName + ".json");
        fs.writeFileSync(filePath, JSON.stringify(arr));
    }
}

module.exports= getIssuesPageHtml;

function dirCreator(folderpath){
    if (fs.existsSync(folderpath)== false){
        fs.mkdirSync(folderpath); 
    }
}