# ph-image-upload

upload image or other file

demo地址 [https://future-team.github.io/ph-image-upload/example/index.html](https://future-team.github.io/ph-image-upload/example/index.html)


```jsx
 <ImgUpload multiple
            className='my-class'
            filter={::this.filter}
            successCallback={::this.successCallback}
            failCallback={::this.failCallback}
            completeCallback={::this.completeCallback}
            uploadUrl="http://beta.ask.sankuai.com/attachment/upload" >
            <label style={{display:'inline-block',width:'100px',height:'100px'}}>
                这是一个上传按钮
            </label>
</ImgUpload>
```
```js
 funnction filter(files, maxSize) {
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
    funnction successCallback(file,response){
        console.log('success',file,response);
    }
    funnction failCallback(file,response){
        console.log('fail',file,response);
    }
    funnction completeCallback(uploadInfo,successNum){
        console.log('complete',uploadInfo,successNum)
    }
```

##  API
View [example](/example/src/index.js) to get more details

#### `<ImgUpload>` Props:
- multiple 用来控制input file 的单选和多选 .
- successCallback 每当上传成功一个文件，该方法都会被调用.
- failCallback 每当一个文件上传失败，该方法都会被调用.
- beforeUploadCallback 当文件开始上传前调用.
- completeCallback 当所有文件都成功上传后，该方法会被调用.
- filter: 用于过滤用户选择的文件
- uploadUrl: 上传地址
- disabled: 是否禁止上传
- chooseFile方法 通过给ImgUpload添加ref的形式，可以通过chooseFile方法来手动触发上传图片

### Contributing

- Fork the project
- Run the project in development view demo: `$ npm run demo`
- Make changes.
- Add appropriate tests
- `$ npm run test`
- If tests don't pass, make them pass.
- Update README with appropriate docs.
- Rnn build
- `$ npm run build`
- Commit and PR.


