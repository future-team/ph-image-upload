'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ImgUploadJs = require('./ImgUpload.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLibReactDOM = require('react/lib/ReactDOM');

var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

var filter = function filter(files) {
    var arrFiles = [];
    for (var i = 0, file; file = files[i]; i++) {
        arrFiles.push(file);
    }
    return arrFiles;
};

var Demo = (function (_Component) {
    _inherits(Demo, _Component);

    function Demo() {
        _classCallCheck(this, Demo);

        _Component.apply(this, arguments);
    }

    Demo.prototype.render = function render() {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(_ImgUploadJs.ImgUpload, { ref: 'uploader', filter: filter, uploadUrl: 'http://172.24.121.17:8080/attachment/upload', maxNumber: 5 })
        );
    };

    return Demo;
})(_react.Component);

_reactLibReactDOM2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('root'));

var _ImgUpload2 = require('./ImgUpload');

var _ImgUpload3 = _interopRequireDefault(_ImgUpload2);

exports.ImgUpload = _ImgUpload3['default'];