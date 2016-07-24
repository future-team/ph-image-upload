import {ImgUpload} from '../../src/index.js';
import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';


class Demo extends Component{
    filter(files, maxSize) {
        var arrFiles = [];
        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.indexOf("image") == 0 || file.type.indexOf("pdf") >= 0 || file.type.indexOf("msword") >= 0
                || file.type.indexOf("vnd.openxmlformats-officedocument.wordprocessingml.document") >= 0
                || file.type.indexOf("csv") >= 0 || file.type.indexOf("vnd.ms-excel") >= 0
                || file.type.indexOf("vnd.openxmlformats-officedocument.spreadsheetml.sheet") >= 0
                || file.type.indexOf("vnd.openxmlformats-officedocument.presentationml.presentation") >= 0
                || file.type.indexOf("vnd.ms-powerpoint") >= 0) {
                arrFiles.push(file);
            }else {
                alert('只能上传图片、doc、docx、xls、xlsx、pdf文件，上传文件"' + file.name + '"错误。');
            }
        }
        return arrFiles;
    }
    successCallback(file,response){
        console.log('success',file,response);
    }
    failCallback(file,response){
        console.log('fail',file,response);
    }
    completeCallback(uploadInfo,successNum){
        console.log('complete',uploadInfo,successNum)
    }
    render(){
        return (
            <div>
                <ImgUpload multiple
                           filter={::this.filter}
                           successCallback={::this.successCallback}
                           failCallback={::this.failCallback}
                           completeCallback={::this.completeCallback}
                           uploadUrl="http://beta.ask.sankuai.com/attachment/upload" maxNumber={5} />
            </div>
        )
    }
}



ReactDom.render(
    <Demo></Demo>,
    document.getElementById('root')
);