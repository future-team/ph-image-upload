'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cssImgUploadLess = require('../css/ImgUpload.less');

var _cssImgUploadLess2 = _interopRequireDefault(_cssImgUploadLess);

var ImgUpload = (function (_Component) {
    _inherits(ImgUpload, _Component);

    _createClass(ImgUpload, null, [{
        key: 'defaultProps',
        value: {
            completeCallback: function completeCallback() {},
            failCallback: function failCallback() {},
            successCallback: function successCallback() {
                return true;
            },
            selectedCallback: function selectedCallback(num) {
                return num;
            },
            filter: function filter(files, maxSize) {
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
        },
        enumerable: true
    }]);

    function ImgUpload(props, context) {
        _classCallCheck(this, ImgUpload);

        _Component.call(this, props, context);
        this.state = {
            uploading: false
        };
    }

    //获取文件列表

    ImgUpload.prototype.getFiles = function getFiles(e) {
        //e.stopPropagation();
        //e.preventDefault();

        if (this.props.disabled || this.state.uploading) {
            return;
        }
        var files = e.target.files || e.dataTransfer && e.dataTransfer.files || [];
        this.target = e.target;
        var filteredFiles = this.props.filter(files, this.props.maxSize);
        if (filteredFiles && filteredFiles.length && filteredFiles.length > 0) {
            this.props.selectedCallback(filteredFiles.length);
            for (var i = 0, file; file = filteredFiles[i]; i++) {
                //增加唯一索引值
                file.index = i;
            }
            this.upload(filteredFiles);
        } else {
            this.props.selectedCallback(0);
        }
    };

    ImgUpload.prototype.upload = function upload(fileList) {
        var _this2 = this;

        var _this = this,
            success = 0;
        this.setState({
            uploading: true
        });
        var uploadInfo = {};
        var beforeUploadCallback = this.props.beforeUploadCallback;

        var _loop = function (i, file) {

            (function (file) {
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {
                    xhr.onreadystatechange = function (e) {
                        if (i == fileList.length - 1) {
                            _this2.setState({
                                uploading: false
                            });
                            _this.refs.fileInput.value = '';
                        }
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                //成功回调
                                var isUpload = _this2.props.successCallback(file, JSON.parse(xhr.responseText || '{}'));

                                if (typeof isUpload == 'boolean' && !isUpload) {
                                    _this.props.failCallback(file, xhr.responseText);
                                } else {
                                    uploadInfo[file.name] = JSON.parse(xhr.responseText || '{}');
                                }

                                success += 1;
                                //全部加载完成
                                if (success == fileList.length) {
                                    _this.props.completeCallback(uploadInfo, fileList && fileList.length ? fileList.length : 0);
                                }
                            } else {
                                _this.props.failCallback(file, xhr.responseText);
                            }
                        }
                    };

                    xhr.open("POST", _this.props.uploadUrl, true);
                    xhr.setRequestHeader('X_FILENAME', encodeURIComponent(file.name));
                    var f = new FormData();
                    f.append(file.name, file);
                    beforeUploadCallback && beforeUploadCallback(file);
                    xhr.send(f);
                }
            })(file);
        };

        for (var i = 0, file = null; file = fileList[i]; i++) {
            _loop(i, file);
        }
    };

    ImgUpload.prototype.chooseFile = function chooseFile() {
        this.refs.fileInput.click();
    };

    ImgUpload.prototype.render = function render() {
        var disabled = this.props.disabled || this.state.uploading;
        return _react2['default'].createElement(
            'span',
            { className: 'img-upload ' + (this.props.className ? this.props.className : '') + (disabled ? ' disabled' : '') },
            this.props.children ? this.props.children : _react2['default'].createElement('label', { className: 'default-upload-theme' }),
            _react2['default'].createElement('input', { disabled: disabled, ref: 'fileInput', type: 'file', onChange: this.getFiles.bind(this), multiple: this.props.multiple ? true : false })
        );
    };

    return ImgUpload;
})(_react.Component);

exports['default'] = ImgUpload;
module.exports = exports['default'];