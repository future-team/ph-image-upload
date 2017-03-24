import {ImgUpload} from '../../src/index.js';
import {Overlay} from 'eg-overlay';

import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';


class Demo extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            imgSrc:'',
            imgList:[]
        }
    }
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
        //此处应该设置为response的图片路径
        this.setState({
            imgSrc:'./img/1.jpg'
        })
        console.log('success',file,response);
    }
    failCallback(file,response){
        this.setState({
            imgSrc:'./img/1.jpg'
        })
        console.log('fail',file,response);
    }
    completeCallback(uploadInfo,successNum){
        console.log('complete',uploadInfo,successNum)
    }
    delete(){
        this.setState({
            imgSrc:''
        })
    }
    simulateSuccess(){
        let fileName=Math.floor(Math.random()*10+1)+'.jpg';
        console.log(fileName);
        let imgList=this.state.imgList;
        imgList.push(fileName);
        this.setState({
            imgList:imgList
        });

    }
    remove(index){
        let {imgList}=this.state;
        imgList.splice(index,1);
        this.setState({
            imgList
        });
    }
    edit(index){
        this.refs.imgUploader.chooseFile();
    }
    render(){
        let _this=this;
        return (
            <div>
                <h2>场景1</h2>
                <div>
                    只传1张图片，上传成功的图片会替换上传按钮背景图
                    (成功回调successCallback需要对接后端上传接口，因此用failCallback来模拟上传成功)
                </div>
                <Overlay
                    show='hover'
                    overlayContent={
                        <div style={{color:'#fff',fontSize:'11px'}}>
                            <span onClick={::this.delete}>删除</span>
                        </div>
                    }
                    >
                    <ImgUpload
                               multiple
                               className='my-class'
                               filter={::this.filter}
                               successCallback={::this.successCallback}
                               failCallback={::this.failCallback}
                               completeCallback={::this.completeCallback}
                               uploadUrl="http://beta.ask.sankuai.com/attachment/upload" >
                        {this.state.imgSrc?<img style={{width:'200px',height:'120px'}} src={this.state.imgSrc} />:
                            <img style={{width:'200px',height:'120px'}} src='./img/upload.png' />
                        }
                    </ImgUpload>
                </Overlay>
                <h2>场景2</h2>
                <div>
                    上传多张图片
                </div>
                <div className='img-list'>
                    <ImgUpload ref='imgUploader'
                               multiple
                               className='my-class'
                               filter={::this.filter}
                               successCallback={::this.successCallback}
                               failCallback={::this.simulateSuccess}
                               completeCallback={::this.completeCallback}
                               uploadUrl="http://beta.ask.sankuai.com/attachment/upload" >
                    </ImgUpload>
                    {this.state.imgList.map(function(str,index){
                        return <div className='img-wrapper'>
                            <Overlay
                                position='bottom'
                                overlayContent={
                                <div style={{color:'#fff',fontSize:'11px'}}>
                                    <span onClick={function(){
                                        _this.edit(index);
                                    }}>编辑</span>
                                     <span onClick={function(){
                                        _this.remove(index)
                                    }} style={{marginLeft:'5px'}}>删除</span>
                                </div>
                            }>
                                <img src={'./img/'+str} />
                            </Overlay>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}



ReactDom.render(
    <Demo></Demo>,
    document.getElementById('root')
);