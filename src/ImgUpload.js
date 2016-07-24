
import React,{PropTypes,Component} from 'react';

import uploadStyle from '../css/ImgUpload.less';

export default class ImgUpload extends Component{
    static defaultProps = {
        completeCallback:()=>{},
        failCallback:()=>{},
        successCallback:()=>{return true},
        filter:(files,maxSize)=>{
            var arrFiles = [];
            for (var i = 0, file; file = files[i]; i++) {
                arrFiles.push(file);
                /*if (file.type.indexOf("image") == 0) {
                 if (file.size >= maxSize) {
                 alert(`您这张${file.name}图片大小过大，应小于${maxSize}k`);
                 } else {
                 arrFiles.push(file);
                 }
                 } else {
                 alert('文件"' + file.name + '"不是图片。');
                 }*/
            }
            return arrFiles;
        }
    };
    constructor(props,context){
        super(props,context);
        this.state={
            uploading:false
        }
    }


    //获取文件列表
    getFiles(e){
        //e.stopPropagation();
        //e.preventDefault();

        if(this.props.disabled||this.state.uploading){
            return
        }
        let files = e.target.files || (e.dataTransfer && e.dataTransfer.files) || [];
        this.target = e.target;
        let filteredFiles = this.props.filter(files,this.props.maxSize);
        if(filteredFiles && filteredFiles.length && filteredFiles.length >0){
            for (var i = 0, file; file = filteredFiles[i]; i++) {
                //增加唯一索引值
                file.index = i;
            }
            this.upload(filteredFiles);
        }

    }


    upload(fileList){
        let _this = this,
            success = 0;
        this.setState({
            uploading:true
        })
        let uploadInfo={};
        for(let i=0,file=null;file=fileList[i];i++ ){

            ((file)=>{
                let xhr = new XMLHttpRequest();
                if(xhr.upload){
                    xhr.onreadystatechange=(e)=>{
                        if(xhr.readyState == 4){
                            if(xhr.status == 200){
                                //成功回调
                                var isUpload = this.props.successCallback(file,JSON.parse(xhr.responseText ||'{}') );

                                if(typeof(isUpload)=='boolean'&& !isUpload){
                                    _this.props.failCallback(file,xhr.responseText );
                                }else{
                                    uploadInfo[file.name] = JSON.parse(xhr.responseText ||'{}');
                                    console.log('success',uploadInfo);
                                }

                                success+=1;
                                //全部加载完成
                                if(success ==fileList.length ){
                                    _this.props.completeCallback(uploadInfo,fileList && fileList.length ?fileList.length :0 );
                                }
                            }else{
                                _this.props.failCallback(file,xhr.responseText );
                            }
                        }
                    };

                    xhr.open("POST", _this.props.uploadUrl, true);
                    xhr.setRequestHeader('X_FILENAME', encodeURIComponent(file.name));
                    let f = new FormData();
                    f.append(file.name, file);
                    xhr.send(f);
                }
            })(file);
        }
    }


    render(){
        return(
            <span className='img-upload'>
                <label >
                    <input  type='file' onChange={::this.getFiles} multiple={this.props.multiple?true:false} />
                </label>
            </span>
        )
    }
}