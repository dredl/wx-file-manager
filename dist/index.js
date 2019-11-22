'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactstrap = require('reactstrap');
var InputStyleOne = _interopDefault(require('input-style-one'));
var notify = require('wx-notify');
var notify__default = _interopDefault(notify);
var reactApollo = require('react-apollo');
var filesize = _interopDefault(require('filesize'));
var gql = _interopDefault(require('graphql-tag'));
var ApolloClient = _interopDefault(require('apollo-client'));
var apolloLinkHttp = require('apollo-link-http');
var apolloCacheInmemory = require('apollo-cache-inmemory');
var apolloLink = require('apollo-link');
var apolloUploadClient = require('apollo-upload-client');
var apolloLinkContext = require('apollo-link-context');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".documents-tab .f-manager{width:100%;height:auto}.f-manager{display:flex;flex-direction:column;margin:10px 0}.f-manager .jbtn{height:35px}.f-manager .sign-button{margin-top:10px;margin-left:auto}.f-manager__block{position:relative;padding:0 12px;display:flex;border-radius:5px;box-shadow:0 0 15px rgba(0,0,0,.32);background:#fff;height:46px;justify-content:space-between}.f-manager__block_item1,.f-manager__block_right{display:flex;align-items:center}.f-manager__block_item1{padding-left:0;margin-right:15px;width:100%;overflow:hidden}.f-manager__block_item1 .item1-text{overflow:hidden;width:60%;display:grid;flex-direction:column;align-items:start;padding:0;line-height:1.2}.f-manager__block_item1 .item1-text p{line-height:1;margin:0;font-size:15px;font-family:dinpro-bold;color:#333;white-space:nowrap;overflow:hidden;width:100%;text-overflow:ellipsis}.f-manager__block_item1 .item1-text span{font-size:11px;color:#b3b3b3;font-family:dinpro-med;text-align:left}.f-manager__block_item1 p{margin-bottom:0}.f-manager__block_item1 img{width:21px;height:21px;margin-right:10px}.f-manager__block_item4{box-shadow:none;background-color:transparent;border-left:1px solid #ccc;padding-left:10px;padding-right:0;display:flex;align-items:center;height:65%}.f-manager__block_item4 a{color:#333;font-family:dinpro-med;text-decoration:none;font-size:14px}.f-manager__block_new-doc{text-transform:uppercase;font-size:10px;border-top-right-radius:5px;border-bottom-right-radius:5px;padding:3px 15px;line-height:1;color:#fff;font-family:dinpro-bold;height:20px;position:absolute;right:0;top:14px;margin:auto -118px auto auto;background:linear-gradient(135deg,transparent 8px,#8d1843 0) 0 0,linear-gradient(45deg,transparent 8px,#8d1843 0) 0 100%;background-size:100% 50%;background-repeat:no-repeat}.f-manager__block_remove{cursor:pointer;border-left:1px solid #ccc;padding:0 7px 0 16px;background:#fff;margin-left:10px;display:flex;height:65%}.f-manager__block_remove img{width:15px}.f-manager__block_status{margin-bottom:0;font-size:12px;display:flex;line-height:1;align-items:center;font-family:dinpro-med;color:grey;max-width:176px;border-left:1px solid #ccc;padding-left:10px;padding-right:10px;height:65%}.f-manager__block_status img{width:15px;margin-right:10px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9maWxlLXZpZXdlci5zY3NzIiwic3JjL3N0eWxlcy9fZm9udHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSwwQkFFQyxVQUFXLENBQ1gsV0FBWSxDQUdiLFdBQ0UsWUFBYSxDQUNiLHFCQUFzQixDQUN0QixhQUFjLENBSGhCLGlCQUtJLFdBQVksQ0FMaEIsd0JBUUMsZUFBZ0IsQ0FDaEIsZ0JBQWlCLENBRWhCLGtCQUNFLGlCQUFrQixDQUNsQixjQUFpQixDQUNqQixZQUFhLENBQ2IsaUJBQWtCLENBQ2xCLG1DQUF3QyxDQUN4QyxlQUFtQixDQUNuQixXQUFZLENBQ2YsNkJBQThCLENBSzNCLGdEQUhBLFlBQWEsQ0FDYixrQkFVa0IsQ0FSbEIsd0JBQ0UsY0FBZSxDQUNmLGlCQUFrQixDQUNsQixVQUFXLENBS1gsZUFBZ0IsQ0FSakIsb0NBVUcsZUFBZ0IsQ0FDaEIsU0FBVSxDQUNWLFlBQWEsQ0FDYixxQkFBc0IsQ0FDdEIsaUJBQWtCLENBQ2xCLFNBQVUsQ0FDVixlQUFnQixDQWhCbkIsc0NBa0JLLGFBQWMsQ0FDZCxRQUFTLENBQ1QsY0FBZSxDQUNmLHVCQ25EYSxDRG9EYixVQUFjLENBQ2Qsa0JBQW1CLENBQ25CLGVBQWdCLENBQ2hCLFVBQVcsQ0FDWCxzQkFBbUQsQ0ExQnhELHlDQTZCSyxjQUFlLENBQ2YsYUFBYyxDQUNkLHNCQzlEVyxDRCtEWCxlQUFnQixDQWhDckIsMEJBb0NHLGVBQWdCLENBcENuQiw0QkF1Q0csVUFBVyxDQUNYLFdBQVksQ0FDWixpQkFBa0IsQ0FHdEIsd0JBQ0UsZUFBZ0IsQ0FDaEIsNEJBQTZCLENBRzdCLDBCQUE4QixDQUM5QixpQkFBa0IsQ0FDbEIsZUFBZ0IsQ0FDaEIsWUFBYSxDQUNiLGtCQUFtQixDQUNuQixVQUFXLENBVlosMEJBWUcsVUFBYyxDQUNkLHNCQ3hGYSxDRHlGYixvQkFBcUIsQ0FDckIsY0FBZSxDQUduQiwwQkFDRSx3QkFBeUIsQ0FDekIsY0FBZSxDQUNmLDJCQUE0QixDQUM1Qiw4QkFBK0IsQ0FDL0IsZ0JBQWlCLENBQ2pCLGFBQWMsQ0FDZCxVQUFZLENBQ1osdUJDcEdpQixDRHFHakIsV0FBWSxDQUVaLGlCQUFrQixDQUNsQixPQUFRLENBQ1IsUUFBUyxDQUNULDRCQUFvQixDQUNwQix3SEFDOEQsQ0FDOUQsd0JBQXlCLENBQ3pCLDJCQUE0QixDQUU5Qix5QkFDRSxjQUFlLENBQ2YsMEJBQThCLENBQzlCLG9CQUFxQixDQUNyQixlQUFpQixDQUNqQixnQkFBaUIsQ0FDakIsWUFBYSxDQUNiLFVBQVcsQ0FQWiw2QkFTRyxVQUFXLENBR2YseUJBQ0UsZUFBZ0IsQ0FDaEIsY0FBZSxDQUNmLFlBQWEsQ0FDYixhQUFjLENBQ2Qsa0JBQW1CLENBQ25CLHNCQ25JZSxDRG9JZixVQUFjLENBQ2QsZUFBZ0IsQ0FDaEIsMEJBQThCLENBQzlCLGlCQUFrQixDQUNsQixrQkFBbUIsQ0FDbkIsVUFBVyxDQVpaLDZCQWNHLFVBQVcsQ0FDWCxpQkFBa0IiLCJmaWxlIjoiZmlsZS12aWV3ZXIuc2NzcyJ9 */";
styleInject(css);

var fileFragments = {
    common: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment CommonFiles on Files {\n      _id\n      path\n      name\n      size\n      createTime\n      metadata {\n        title\n        objId\n        objType\n        creatorId\n        categoryId\n        signs {\n          userId\n          time\n          signed\n          label\n        }\n      }\n    }\n  "], ["\n    fragment CommonFiles on Files {\n      _id\n      path\n      name\n      size\n      createTime\n      metadata {\n        title\n        objId\n        objType\n        creatorId\n        categoryId\n        signs {\n          userId\n          time\n          signed\n          label\n        }\n      }\n    }\n  "])))
};
var UPLOADFILE_LINK_MUTATION = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation singleUpload($file: Upload, $metadata: MetadataInput) {\n    singleUpload(file: $file, metadata: $metadata) {\n      ...CommonFiles\n    }\n  }\n  ", "\n"], ["\n  mutation singleUpload($file: Upload, $metadata: MetadataInput) {\n    singleUpload(file: $file, metadata: $metadata) {\n      ...CommonFiles\n    }\n  }\n  ", "\n"])), fileFragments.common);
var CHECK_EDS_DATA = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation checkEDSData($p12Base64: String, $password: String) {\n    checkEDSData(p12Base64: $p12Base64, password: $password) {\n      owner\n      issuer\n      expireTime\n      iin\n      bin\n    }\n  }\n"], ["\n  mutation checkEDSData($p12Base64: String, $password: String) {\n    checkEDSData(p12Base64: $p12Base64, password: $password) {\n      owner\n      issuer\n      expireTime\n      iin\n      bin\n    }\n  }\n"])));
var REMOVE_LINK_MUTATION = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  mutation deleteFile($fileId: String) {\n    deleteUpload(fileId: $fileId)\n  }\n"], ["\n  mutation deleteFile($fileId: String) {\n    deleteUpload(fileId: $fileId)\n  }\n"])));
var SIGN_FILE = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  mutation signDocument($fileId: String, $p12Base64: String, $password: String) {\n    signDocument(fileId: $fileId, p12Base64: $p12Base64, password: $password) {\n      ...CommonFiles\n    }\n  }\n  ", "\n"], ["\n  mutation signDocument($fileId: String, $p12Base64: String, $password: String) {\n    signDocument(fileId: $fileId, p12Base64: $p12Base64, password: $password) {\n      ...CommonFiles\n    }\n  }\n  ", "\n"])), fileFragments.common);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

//@ts-ignore
var globalAny = global;
var token = localStorage.getItem("loginToken");
var httpLink = apolloLinkHttp.createHttpLink({
    uri: "http://109.233.109.170:4003/graphql"
    // uri: "http://localhost:4003/graphql" //dev only, comment before publish
});
var uploadLink = apolloUploadClient.createUploadLink({
    uri: "http://109.233.109.170:4003/graphql",
    // uri: "http://localhost:4003/graphql" //dev only, comment before publish
    fetch: typeof window === "undefined" ? globalAny.fetch : customFetch
});
var authLink = apolloLinkContext.setContext(function (_, _a) {
    var headers = _a.headers;
    // get the authentication token from local storage if it exists
    var token = localStorage.getItem("loginToken");
    var language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "en-US";
    // return the headers to the context so httpLink can read them
    return {
        headers: __assign({}, headers, { "authorization": token ? token : "", "accept-language": language })
    };
});
var isObject = function (node) { return typeof node === "object" && node !== null; };
var hasFiles = function (node, found) {
    if (found === void 0) { found = []; }
    Object.keys(node).forEach(function (key) {
        if (!isObject(node[key]) || found.length > 0) {
            return;
        }
        if ((typeof File !== "undefined" && node[key] instanceof File) ||
            (typeof Blob !== "undefined" && node[key] instanceof Blob)) {
            found.push(node[key]);
            return;
        }
        hasFiles(node[key], found);
    });
    return found.length > 0;
};
var link2 = apolloLink.split(function (_a) {
    var variables = _a.variables;
    return hasFiles(variables);
}, uploadLink, httpLink);
var client = new ApolloClient({
    link: apolloLink.ApolloLink.from([authLink, link2]),
    cache: new apolloCacheInmemory.InMemoryCache({
        dataIdFromObject: function (o) {
            return o.id ? o.__typename + ":" + o.id : null;
        }
    })
});
function customFetch(url, opts) {
    if (opts === void 0) { opts = {}; }
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || "get", url);
        for (var k in opts.headers || {})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = function (e) {
            var eAny = e;
            resolve({
                ok: true,
                text: function () { return Promise.resolve(eAny.target.responseText); },
                json: function () { return Promise.resolve(JSON.parse(eAny.target.responseText)); }
            });
        };
        xhr.onerror = reject;
        if (xhr.upload)
            xhr.upload.onprogress = function (event) { return console.log((event.loaded / event.total) * 100 + "% uploaded"); };
        xhr.send(opts.body);
    });
}

var _this = undefined;
var FilesContext = React__default.createContext({
    file: null,
    handleUpload: null,
    handleRemove: null,
    handleSign: null,
    handleFakeRemove: null,
    // checkEDSData: null,
    userId: null
});
var FilesProvider = function (props) {
    var uploadMutation = reactApollo.useMutation(UPLOADFILE_LINK_MUTATION, { client: client });
    var removeMutation = reactApollo.useMutation(REMOVE_LINK_MUTATION, { client: client });
    var signMutation = reactApollo.useMutation(SIGN_FILE, { client: client });
    var children = props.children, userId = props.userId;
    var _a = React.useState(props.file), file = _a[0], setFile = _a[1];
    React.useEffect(function () {
        setFile(props.file);
    }, [props.file]);
    var upload = function (e, _a) {
        var objId = _a.objId, objType = _a.objType, objCode = _a.objCode, needToSign = _a.needToSign;
        return __awaiter(_this, void 0, void 0, function () {
            var _b, validity, file, fileObj, metadata, randId, fileFromServer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = e.target, validity = _b.validity, file = _b.files[0];
                        fileObj = null;
                        metadata = {
                            objType: objType,
                            objId: objId,
                            objCode: objCode,
                            needToSign: needToSign
                        };
                        randId = Math.floor(Math.random() * (10000 - 1)) + 1;
                        /** default template until file is loading */
                        fileObj = {
                            _id: randId,
                            loading: true,
                            name: file.name,
                            size: filesize(file.size),
                            metadata: {
                                signs: [],
                                title: file.name
                            }
                        };
                        if (!validity.valid) return [3 /*break*/, 2];
                        setFile(fileObj);
                        return [4 /*yield*/, uploadMutation[0]({
                                variables: { file: file, metadata: metadata }
                            }).then(function (_a) {
                                var data = _a.data;
                                /** when is uploaded, replace fileObject to real file from server*/
                                fileObj = __assign({}, data.singleUpload, { loading: false });
                                setFile(fileObj);
                                return fileObj;
                            })];
                    case 1:
                        fileFromServer = _c.sent();
                        return [2 /*return*/, fileFromServer];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // const checkEDS = async e => {
    // }
    var remove = function (fileId) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, removeMutation[0]({ variables: { fileId: fileId } }).then(function (_a) {
                        var data = _a.data;
                        setFile(null);
                        return true;
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    }); };
    var fakeRemove = function (fileId) {
        setFile(null);
        return true;
    };
    var sign = function (fileId, p12Base64, password) { return __awaiter(_this, void 0, void 0, function () {
        var file, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, signMutation[0]({ variables: { fileId: fileId, p12Base64: p12Base64, password: password } })];
                case 2:
                    file = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    notify.notifyServer({
                        Content: function () {
                            return React__default.createElement("span", null, error_1.graphQLErrors[0].message);
                        },
                        type: "error"
                    });
                    return [3 /*break*/, 4];
                case 4:
                    notify__default({
                        header: "Файл подписан",
                        description: "Файл успешно подписан!!!"
                    });
                    setFile(file.data.signDocument);
                    return [2 /*return*/, file.data.signDocument];
            }
        });
    }); };
    return (React__default.createElement(FilesContext.Provider, { value: {
            file: file,
            userId: userId,
            handleUpload: upload,
            // checkEDSData: e => checkEDS(e),
            handleRemove: function (fileId) { return remove(fileId); },
            handleFakeRemove: function (fileId) { return fakeRemove(); },
            handleSign: function (fileId, p12Base64, password) { return sign(fileId, p12Base64, password); }
        } }, children));
};

var token$1 = localStorage.getItem("loginToken");
var httpLink$1 = apolloLinkHttp.createHttpLink({
    uri: "http://109.233.109.170:4000/graphql"
    // uri: "http://localhost:4003/graphql" //dev only, comment before publish
});
// const uploadLink = createUploadLink({
//   uri: "http://78.40.109.27:4003/graphql",
//   // uri: "http://localhost:4003/graphql" //dev only, comment before publish
//   fetch: typeof window === "undefined" ? globalAny.fetch : customFetch
// })
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("loginToken")
//   const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "en-US"
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       "authorization": token ? token : "", // `Bearer ${token}` : "",
//       "accept-language": language
//     }
//   }
// })
// const isObject = node => typeof node === "object" && node !== null
// const hasFiles = (node, found = []) => {
//   Object.keys(node).forEach(key => {
//     if (!isObject(node[key]) || found.length > 0) {
//       return
//     }
//     if (
//       (typeof File !== "undefined" && node[key] instanceof File) ||
//       (typeof Blob !== "undefined" && node[key] instanceof Blob)
//     ) {
//       found.push(node[key])
//       return
//     }
//     hasFiles(node[key], found)
//   })
//   return found.length > 0
// }
// const link2 = split(({ variables }) => hasFiles(variables), uploadLink, httpLink)
var gatewayClient = new ApolloClient({
    link: apolloLink.ApolloLink.from([httpLink$1]),
    cache: new apolloCacheInmemory.InMemoryCache({
        dataIdFromObject: function (o) {
            return o.id ? o.__typename + ":" + o.id : null;
        }
    })
});
// function customFetch(url, opts = {} as any) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.open(opts.method || "get", url)
//     for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k])
//     xhr.onload = e => {
//       const eAny: any = e
//       resolve({
//         ok: true,
//         text: () => Promise.resolve(eAny.target.responseText),
//         json: () => Promise.resolve(JSON.parse(eAny.target.responseText))
//       })
//     }
//     xhr.onerror = reject
//     if (xhr.upload) xhr.upload.onprogress = event => console.log(`${(event.loaded / event.total) * 100}% uploaded`)
//     xhr.send(opts.body)
//   })
// }

var messages = {
    en: {
        "chooseFile": "Choose File",
        "download": "Download",
        "sign": "Sign",
        "Select the file with EDS": "Select EDS file (GOST)",
        "EDS": "EDS",
        "BIN": "BIN",
        "IIN": "IIN",
        "Owner of EDS": "Owner of EDS",
        "Authority issuing EDS": "Authority issuing EDS",
        "Valid thought": "Valid thought"
    },
    ru: {
        "chooseFile": "Выберите файл",
        "download": "Скачать",
        "sign": "Подписать",
        "Select the file with EDS": "Выберите файл ЭЦП (GOST)",
        "EDS": "ЭЦП",
        "BIN": "БИН",
        "IIN": "ИИН",
        "Owner of EDS": "Владелец ЭЦП",
        "Authority issuing EDS": "Орган, выдавший ЭЦП",
        "Valid thought": "Действителен до",
        "Key algorithm": "Алгоритм ключа"
    },
    kk: {
        "chooseFile": "Файлды тандаңыз",
        "download": "Жүктеу",
        "sign": "Қол қою",
        "Select the file with EDS": "ЭЦҚ файлын таңданыз (GOST)",
        "EDS": "ЭЦҚ",
        "BIN": "БСН",
        "BIK": "БСК",
        "IIC": "ЖСК",
        "IIN": "ЖСН",
        "Beneficiary Code": "Кбе",
        "Owner of EDS": "ЭЦҚ иесі",
        "Authority issuing EDS": "ЭЦҚ берілген мекеме",
        "Valid thought": "Жарамдылық мерзімі",
        "Key algorithm": "Кілт алгоритмі"
    }
};

var _this$1 = undefined;
var language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru";
var SignFile = function (props) {
    var _a = React.useState(false), modal = _a[0], setModal = _a[1];
    var _b = React.useState(false), modal2 = _b[0], setModal2 = _b[1];
    var _c = React.useState({ value: "WessarIT12", isValid: false }), password = _c[0], setPassword = _c[1];
    var _d = React.useState(null), p12Base64 = _d[0], setP12Base64 = _d[1];
    var _e = React.useState(false), signLoading = _e[0], setSignLoading = _e[1]; //loader загрузки при подписи данных (если файл большой, она долго подписывается)
    React.useEffect(function () {
        // console.log("mounter")
        return function () {
            // console.log("unmounted")
        };
    }, []);
    /** Управление первой модалкой (данные ЭЦП) */
    var toggle = function (e) {
        e.preventDefault();
        setModal(!modal);
    };
    /** Управление второй модалкой (пароль ЭЦП) */
    var toggle2 = function (e) {
        e.preventDefault();
        setModal2(!modal2);
    };
    /** Обычный handler поля */
    var handleChange = function (result, setStateCallback) {
        var value = result.value, isValid = result.isValid;
        setStateCallback({ value: value, isValid: isValid });
    };
    /** handler родителя */
    var handleSignParent = props.handleSign;
    var file = React.useContext(FilesContext).file;
    /** handler контекста */
    var handleSignContext = React.useContext(FilesContext).handleSign;
    var _f = React.useState(null), EDSdata = _f[0], setEDSData = _f[1];
    var _g = reactApollo.useMutation(CHECK_EDS_DATA, { client: gatewayClient }), checkEDSData = _g[0], _h = _g[1], loading = _h.loading, error = _h.error;
    var handleSign = function (e, fileId) { return __awaiter(_this$1, void 0, void 0, function () {
        var file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, handleSignContext(fileId, p12Base64, password.value)
                        // setSignLoading(false)
                    ];
                case 1:
                    file = _a.sent();
                    // setSignLoading(false)
                    handleSignParent && handleSignParent(file);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEDS = function (e) {
        e.preventDefault();
        var reader = new FileReader();
        var _a = e.target, validity = _a.validity, file = _a.files[0];
        if (validity.valid) {
            reader.readAsDataURL(file);
            reader.onload = function () {
                setModal2(!modal2);
                setP12Base64(reader.result);
            };
        }
    };
    var handlePasswordSubmit = function (e) {
        e.preventDefault();
        checkEDSData({ variables: { p12Base64: p12Base64, password: password.value } })
            .then(function (_a) {
            var data = _a.data;
            setEDSData(data.checkEDSData);
            setModal2(false);
            notify.notifyServer({ dismiss: true });
        })
            .catch(function (e) {
            var errors = e.graphQLErrors[0].extensions.exception.inputErrors;
            notify.notifyServer({
                Content: function () {
                    return (React__default.createElement("ul", { style: { padding: 0, margin: 0 } }, errors.map(function (error, key) {
                        return React__default.createElement("li", { key: key }, error.message);
                    })));
                },
                type: "error"
            });
        });
    };
    var RenderContent = function () {
        var randInd = Math.floor(Math.random() * (10000 - 1)) + 1;
        if (loading) {
            return React__default.createElement("p", null, "\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435 \u042D\u0426\u041F...");
        }
        if (EDSdata) {
            return (React__default.createElement("ul", { className: "reg-info" },
                React__default.createElement("li", null,
                    React__default.createElement("p", null,
                        messages[language]["Owner of EDS"],
                        ":"),
                    React__default.createElement("p", { className: "ecp-info" }, EDSdata.owner)),
                React__default.createElement("li", null,
                    React__default.createElement("p", null,
                        messages[language]["Authority issuing EDS"],
                        ":"),
                    React__default.createElement("p", { className: "ecp-info" }, EDSdata.issuer)),
                React__default.createElement("li", null,
                    React__default.createElement("p", null,
                        messages[language]["Valid thought"],
                        ":"),
                    React__default.createElement("p", { className: "ecp-info" }, EDSdata.expireTime)),
                React__default.createElement("li", null,
                    React__default.createElement("p", null,
                        messages[language]["IIN"],
                        ":"),
                    React__default.createElement("p", { className: "ecp-info" }, EDSdata.iin)),
                React__default.createElement("li", null,
                    React__default.createElement("p", null,
                        messages[language]["BIN"],
                        ":"),
                    React__default.createElement("p", { className: "ecp-info" }, EDSdata.bin))));
        }
        return (React__default.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "45px" } },
            React__default.createElement("input", { type: "file", id: "EDS-sign-" + randInd, required: true, onChange: function (e) { return handleEDS(e); }, accept: ".p12", style: { display: "none" } }),
            React__default.createElement("label", { htmlFor: "EDS-sign-" + randInd, className: "jbtn jbtn-fuksiya" }, messages[language]["Select the file with EDS"])));
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: "sign-button" },
            React__default.createElement("button", { className: "jbtn jbtn-wide jbtn-green", onClick: function (e) { return toggle(e); } }, messages[language].sign)),
        React__default.createElement(reactstrap.Modal, { isOpen: modal, className: "prompt", centered: true, toggle: toggle },
            React__default.createElement(reactstrap.ModalHeader, null, "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430"),
            signLoading && React__default.createElement("p", null, "Sign LADING"),
            React__default.createElement("form", { className: "mad-form", onSubmit: function (e) { return handleSign(e, file._id); } },
                React__default.createElement(reactstrap.ModalBody, null,
                    React__default.createElement("p", { style: { fontFamily: "dinpro-med", fontSize: "13px", lineHeight: "1.3" } }, "\u0421\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0441\u0442\u0430\u0442\u044C\u0438 24 \u0417\u0430\u043A\u043E\u043D\u0430 \u0420\u041A \u043E\u0442 7.01.2003 \u2116 370 \u00AB\u041E\u0431 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0435 \u0438 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u0439 \u043F\u043E\u0434\u043F\u0438\u0441\u0438\u00BB, \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u043D\u044B\u0439 \u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0440\u0430\u0432\u043D\u043E\u0437\u043D\u0430\u0447\u0435\u043D \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443 \u043D\u0430 \u0431\u0443\u043C\u0430\u0436\u043D\u043E\u043C \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0435."),
                    React__default.createElement("p", { style: { fontFamily: "dinpro-med", fontSize: "13px", lineHeight: "1.3" } }, "\u0414\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u044D\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0433\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0412\u0430\u0448 \u042D\u0426\u041F (GOST \u0438\u043B\u0438 RSA)"),
                    React__default.createElement(RenderContent, null)),
                React__default.createElement(reactstrap.ModalFooter, null,
                    React__default.createElement("button", { className: "jbtn jbtn-low jbtn-cancel", onClick: function (e) { return toggle(e); } }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    React__default.createElement("button", { className: "jbtn jbtn-low jbtn-green", type: "submit", disabled: !EDSdata }, "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C")))),
        React__default.createElement(reactstrap.Modal, { isOpen: modal2, className: "eds-pass", centered: true, backdrop: true },
            React__default.createElement("form", { className: "mad-form", onSubmit: function (e) { return handlePasswordSubmit(e); } },
                React__default.createElement(reactstrap.ModalBody, null,
                    React__default.createElement(InputStyleOne, { label: "\u041F\u0430\u0440\u043E\u043B\u044C \u042D\u0426\u041F", name: "password", value: password.value, enableTooltip: false, rules: ["required"], inputType: "password", handleChange: function (result) { return handleChange(result, setPassword); } })),
                React__default.createElement(reactstrap.ModalFooter, null,
                    React__default.createElement("button", { className: "jbtn jbtn-low jbtn-cancel", onClick: function (e) { return toggle2(e); } }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    React__default.createElement("button", { className: "jbtn jbtn-low jbtn-green", type: "submit", disabled: password.value == "" }, "\u041F\u043E\u0434\u0432\u0435\u0440\u0434\u0438\u0442\u044C"))))));
};

var galka = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iZ2Fsa2Euc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjIuNDMxMTk5NSINCiAgICAgaW5rc2NhcGU6Y3g9IjExMS4xMTY3OCINCiAgICAgaW5rc2NhcGU6Y3k9IjY1LjIzMDQ0OSINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiDQogICAgIHNob3dncmlkPSJmYWxzZSINCiAgICAgdW5pdHM9InB4Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjExNTMiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc0NSINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjU2MyINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ijc5Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIiAvPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhNSI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8Zw0KICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSINCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciINCiAgICAgaWQ9ImxheWVyMSINCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjU0LjY2NjY1KSI+DQogICAgPGcNCiAgICAgICBpZD0iZzM4MTYiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS4xMDI0Mjc3LDAsMCwxLjEwMjQyNzcsNi42MTQ1NjYyZS00LDI1NC42NjY1NCkiPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDM4MDIiDQogICAgICAgICBzdHlsZT0iZmlsbDojNDVhMTI1O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgZD0iTSAtNmUtNCwxNS4xOTc1IDE0LjQ1MjcsMzMuMjAzNyAzOC40MDAyLDUuMTk2MiAxMy44NDg5LDIyLjc3MDMgWiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgzODA0Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZSINCiAgICAgICAgIGQ9Ik0gMWUtNCwxZS00IFYgMzguNDAwMiBIIDM4LjQwMDIgViAxZS00IFoiIC8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4=';

var clock = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0i0YfQsNGB0YvRgS5zdmciPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczIiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9ImJhc2UiDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6em9vbT0iMC4zNSINCiAgICAgaW5rc2NhcGU6Y3g9IjQwMCINCiAgICAgaW5rc2NhcGU6Y3k9IjU2MCINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiDQogICAgIHNob3dncmlkPSJmYWxzZSINCiAgICAgdW5pdHM9InB4Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2MDAiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjgzNyINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnMjQiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS4xMDI0MTkxLDAsMCwxLjEwMjQxOTEsMCwyNTQuNjY2ODcpIj4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgxMCINCiAgICAgICAgIHN0eWxlPSJmaWxsOiM4MDgwODA7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICBkPSJtIDE5LjI5MzYsNy41NzEyIGMgMS4wNzE4LDAgMS45NDU5LDAuODc0IDEuOTQ1OSwxLjk0NTkgdiA3LjUyMSBoIDcuNTIxIGMgMS4wNzE5LDAgMS45NDU5LDAuODc0IDEuOTQ1OSwxLjk0NTkgMCwxLjA3MTkgLTAuODc0LDEuOTQ1OSAtMS45NDU5LDEuOTQ1OSBoIC05LjQxNjYgYyAtMS4xMDA2LDAgLTEuOTk2MiwtMC44MzA5IC0xLjk5NjIsLTEuOTQ1OSBWIDkuNTE3MSBjIDAsLTEuMDcxOSAwLjg3NCwtMS45NDU5IDEuOTQ1OSwtMS45NDU5IHogTSAxOS4yLC0yZS00IGMgMTAuNjAzNiwwIDE5LjIwMDEsOC41OTY1IDE5LjIwMDEsMTkuMiAwLDEwLjYwMzYgLTguNTk2NSwxOS4yMDAxIC0xOS4yMDAxLDE5LjIwMDEgQyA4LjU5NjUsMzguMzk5OSAwLDI5LjgwMzQgMCwxOS4xOTk4IDAsOC41OTYzIDguNTk2NSwtMmUtNCAxOS4yLC0yZS00IFogbSAwLDQuNjE4MyBjIDguMDUzNCwwIDE0LjU4MTcsNi41MjgzIDE0LjU4MTcsMTQuNTgxNyAwLDguMDUzNCAtNi41MjgzLDE0LjU4MTcgLTE0LjU4MTcsMTQuNTgxNyAtOC4wNTMzLDAgLTE0LjU4MTYsLTYuNTI4MyAtMTQuNTgxNiwtMTQuNTgxNyAwLC04LjA1MzQgNi41MjgzLC0xNC41ODE3IDE0LjU4MTYsLTE0LjU4MTcgeiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgxMiINCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmUiDQogICAgICAgICBkPSJNIDFlLTQsMWUtNCBWIDM4LjQwMDIgSCAzOC40MDAyIFYgMWUtNCBaIiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

var doc10 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSI2NCINCiAgIGhlaWdodD0iNjQiDQogICB2aWV3Qm94PSIwIDAgMTYuOTMzMzMzIDE2LjkzMzMzNCINCiAgIHZlcnNpb249IjEuMSINCiAgIGlkPSJzdmc4Ig0KICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4xIHIxNTM3MSINCiAgIHNvZGlwb2RpOmRvY25hbWU9IjRkLnN2ZyI+DQogIDxkZWZzDQogICAgIGlkPSJkZWZzMiI+DQogICAgPHBhdHRlcm4NCiAgICAgICB5PSIwIg0KICAgICAgIHg9IjAiDQogICAgICAgaGVpZ2h0PSI2Ig0KICAgICAgIHdpZHRoPSI2Ig0KICAgICAgIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiDQogICAgICAgaWQ9IkVNRmhiYXNlcGF0dGVybiIgLz4NCiAgPC9kZWZzPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjMuMDkxNjY2NyINCiAgICAgaW5rc2NhcGU6Y3g9IjExNS44MTcyNCINCiAgICAgaW5rc2NhcGU6Y3k9IjI2LjkxNzc3NSINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiDQogICAgIHNob3dncmlkPSJmYWxzZSINCiAgICAgdW5pdHM9InB4Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciDQogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAvPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhNSI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8Zw0KICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSINCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciINCiAgICAgaWQ9ImxheWVyMSINCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjgwLjA2NjY1KSI+DQogICAgPHBhdGgNCiAgICAgICBpZD0icGF0aDQ1Ig0KICAgICAgIGQ9Im0gMi41NzYzNDA3LDI4MC41NzQ0OSBoIDguMDQ3NjcyMyBsIDQuMDg2NzA4LDQuMDQyNjggdiAxMi4wMzQ3MiBIIDIuNTc2MzQwNyBaIG0gOC4wNDc2NzIzLDEuMDg4NDIgMi45ODY0NDEsMi45NTQyNiBoIC0yLjk4NjQ0MSB6Ig0KICAgICAgIHN0eWxlPSJmaWxsOiM0ZDRkNGQ7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuODI4NTAwNzUiDQogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4NCiAgPC9nPg0KPC9zdmc+';

var cross = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iMzRDcm9zcy5zdmciPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczIiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9ImJhc2UiDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6em9vbT0iMi4xMSINCiAgICAgaW5rc2NhcGU6Y3g9IjczLjg5ODQxMyINCiAgICAgaW5rc2NhcGU6Y3k9IjY5LjYxNDA4MyINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiDQogICAgIHNob3dncmlkPSJmYWxzZSINCiAgICAgdW5pdHM9InB4Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9Ijc0MyINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNTkxIg0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iNzEwIg0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iNzUiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnMzk5MSINCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjA4NjkwMjYsMCwwLDEuMDg2OTAyNiwwLjI5ODE5MTczLDI1NC45Njc2NykiPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDM5NzciDQogICAgICAgICBzdHlsZT0iZmlsbDojOTk5OTk5O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgZD0ibSAxLjMyMTksMzcuMDc1NCB2IDAgcSAzLjE5MjUsMy4xOTI1IDYuMzg1LDAgTCAzNy4wNzgsNy43MDQ0IHEgMy4xOTI1LC0zLjE5MjUgMCwtNi4zODUgdiAwIHEgLTMuMTkyNSwtMy4xOTI1IC02LjM4NSwwIEwgMS4zMjE5LDMwLjY5MDQgcSAtMy4xOTI1LDMuMTkyNSAwLDYuMzg1IHoiIC8+DQogICAgICA8cGF0aA0KICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgIGlkPSJwYXRoMzk3OSINCiAgICAgICAgIHN0eWxlPSJmaWxsOiM5OTk5OTk7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICBkPSJtIDEuMzIwNSw3LjcwODQgMjkuMzc0LDI5LjM3MzcgYyAxLjc1NDcsMS43NTUgNC42MjczLDEuNzU1IDYuMzgyLDAgbCAwLjAwMzEsLTAuMDAyOCBjIDEuNzU0NiwtMS43NTQ5IDEuNzU0NiwtNC42MjczIDAsLTYuMzgyMiBMIDcuNzA1NiwxLjMyMzQgYyAtMS43NTUsLTEuNzU1IC00LjYyNzMsLTEuNzU1IC02LjM4MjIsMCBMIDEuMzIwNSwxLjMyNjIgYyAtMS43NTQ5LDEuNzU0NiAtMS43NTQ5LDQuNjI3MyAwLDYuMzgyMiB6IiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

var _this$2 = undefined;
var language$1 = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru";
var StdSpinner = function () {
    return (React__default.createElement("div", { className: "mad-uploader-spinner" },
        React__default.createElement("div", { className: "sk-three-bounce" },
            React__default.createElement("div", { className: "sk-bounce-1 sk-child" }),
            React__default.createElement("div", { className: "sk-bounce-2 sk-child" }),
            React__default.createElement("div", { className: "sk-bounce-3 sk-child" }))));
};
var SignFileStatus = function (_a) {
    var signs = _a.signs;
    return signs.map(function (sign, key) { return (React__default.createElement("div", { className: "f-manager__block_status", key: key },
        React__default.createElement("img", { src: sign.signed ? galka : clock, alt: "" }),
        React__default.createElement("span", null, sign.label))); });
};
var Download = function (_a) {
    var path = _a.path;
    return (React__default.createElement("span", { className: "f-manager__block_item4" },
        React__default.createElement("a", { href: path, download: true, target: "_blank" }, messages[language$1].download)));
};
var Remove = function (_a) {
    var removeDoc = _a.removeDoc;
    return (React__default.createElement("span", { className: "f-manager__block_remove", onClick: function (e) { return removeDoc(e); } },
        React__default.createElement("img", { src: cross, alt: "" })));
};
var FakeRemove = function (_a) {
    var handleFakeRemove = _a.handleFakeRemove;
    return (React__default.createElement("span", { className: "f-manager__block_remove", onClick: function (e) { return handleFakeRemove(e); } },
        React__default.createElement("img", { src: cross, alt: "" })));
};
var Viewer = function (_a) {
    var _b = _a.enableRemove, enableRemove = _b === void 0 ? false : _b, _c = _a.file, file = _c === void 0 ? null : _c, _d = _a.handleRemove, handleRemove = _d === void 0 ? null : _d, _e = _a.handleSign, handleSign = _e === void 0 ? null : _e, _f = _a.ExtraContent, ExtraContent = _f === void 0 ? null : _f, _g = _a.enableFakeRemove, enableFakeRemove = _g === void 0 ? false : _g, _h = _a.handleFakeRemove, handleFakeRemove = _h === void 0 ? null : _h;
    var handleRemoveContext = React.useContext(FilesContext).handleRemove;
    var handleFakeRemoveContext = React.useContext(FilesContext).handleFakeRemove;
    var fileContext = React.useContext(FilesContext).file;
    var isLoading = fileContext ? fileContext.loading : false;
    var userId = React.useContext(FilesContext).userId;
    React.useEffect(function () {
        // console.log("File viewer mounted")
        return function () {
            // console.log("File viewer unmounted")
        };
    }, []);
    /** Если userId = null то кнопка подписи отсутсвует */
    var SignButton = function (_a) {
        var signs = _a.signs, fileId = _a.fileId;
        var needToSign = false; //Нужно ли currentUser-у подписывать документ
        var signed = false; // подписал ли currentUser документ
        /** Если он есть в списке sings то ему нужно подписать дкумент */
        signs.forEach(function (sign) {
            if (userId && sign.userId == userId) {
                needToSign = true;
                if (sign.signed) {
                    signed = true;
                }
            }
        });
        return needToSign && !signed ? React__default.createElement(SignFile, { fileId: fileId, handleSign: handleSign }) : React__default.createElement("div", null);
    };
    var onRemove = function (e, fileId) { return __awaiter(_this$2, void 0, void 0, function () {
        var isRemoved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, handleRemoveContext(fileId)];
                case 1:
                    isRemoved = _a.sent();
                    if (isRemoved) {
                        handleRemove && handleRemove(fileId);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var onFakeRemove = function (e, fileId) {
        handleFakeRemoveContext(fileId);
        handleFakeRemove(fileId);
    };
    return (React__default.createElement("div", { className: "f-manager" },
        React__default.createElement("div", { className: "f-manager__block" },
            React__default.createElement("div", { className: "f-manager__block_item1" },
                React__default.createElement("img", { src: doc10, alt: "" }),
                React__default.createElement("div", { className: "item1-text" },
                    React__default.createElement("p", { title: fileContext.metadata.title }, fileContext.metadata.title),
                    React__default.createElement("span", null, fileContext.size))),
            React__default.createElement("div", { className: "f-manager__block_right" },
                React__default.createElement(SignFileStatus, { signs: fileContext.metadata.signs }),
                !isLoading && React__default.createElement(Download, { path: fileContext.path }),
                !isLoading && ExtraContent && React__default.createElement(ExtraContent, null),
                !isLoading && enableRemove && React__default.createElement(Remove, { removeDoc: function (e) { return onRemove(e, fileContext._id); } }),
                enableFakeRemove && React__default.createElement(FakeRemove, { handleFakeRemove: function (e) { return onFakeRemove(e, fileContext._id); } }),
                isLoading && React__default.createElement(StdSpinner, null))),
        React__default.createElement(SignButton, { signs: fileContext.metadata.signs, fileId: file._id })));
};

var addFile = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iTGlsRG9jV2l0aFBsdXMuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjAuMzUiDQogICAgIGlua3NjYXBlOmN4PSItNTAxLjQyODU3Ig0KICAgICBpbmtzY2FwZTpjeT0iMjYwIg0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICB1bml0cz0icHgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTYwMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODM3Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4NCiAgPG1ldGFkYXRhDQogICAgIGlkPSJtZXRhZGF0YTUiPg0KICAgIDxyZGY6UkRGPg0KICAgICAgPGNjOldvcmsNCiAgICAgICAgIHJkZjphYm91dD0iIj4NCiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+DQogICAgICAgIDxkYzp0eXBlDQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+DQogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPg0KICAgICAgPC9jYzpXb3JrPg0KICAgIDwvcmRmOlJERj4NCiAgPC9tZXRhZGF0YT4NCiAgPGcNCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiDQogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiDQogICAgIGlkPSJsYXllcjEiDQogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTI1NC42NjY2NSkiPg0KICAgIDxnDQogICAgICAgaWQ9Imc0MyINCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjEwMjQyNzcsMCwwLDEuMTAyNDI3NywtMzEzLjgwMDMxLC0yNDEuMzc3NTMpIj4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgyNiINCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmUiDQogICAgICAgICBkPSJtIDI4NC42NDQ4LDQ0OS45NTYyIHYgMzguNDAwMSBoIDM4LjQwMDEgdiAtMzguNDAwMSB6IiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDI4Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6Izk5OTk5OTtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Im0gMjg0LjY0NDgsNDU4LjMzNTMgaCAxMy4yMjM2IGwgNi43MTgsNi43MTc5IHYgMTkuOTI2NyBoIC0xOS45NDE2IHogbSAxMy4yMjUsMS44MTg4IDQuODk3OSw0Ljg5NzggaCAtNC44OTc5IHoiIC8+DQogICAgICA8cGF0aA0KICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgIGlkPSJwYXRoMzAiDQogICAgICAgICBzdHlsZT0iZmlsbDojOTk5OTk5O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgZD0ibSAzMTIuOTM3NCw0NTMuMzMyNiBoIDUuMDI0MiB2IDUuMDgzMiBoIDUuMDgzMyB2IDUuMDI0NCBoIC01LjA4MzMgdiA1LjA4NDUgaCAtNS4wMjQyIHYgLTUuMDg0NSBoIC01LjA4NDYgdiAtNS4wMjQ0IGggNS4wODQ2IHoiIC8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4=';

var css$1 = ".mad-uploader{display:flex;flex-grow:1}.mad-uploader-button input[type=file]{display:none}.mad-uploader-select-file{display:flex;flex-direction:column;align-items:flex-start;flex-grow:1}.mad-uploader-select-file input[type=file]{display:none}.mad-uploader-select-file>p{font-family:dinpro-med;margin-bottom:5px}.mad-uploader-select-file label{width:100%;cursor:pointer;border:2px dashed #b3b3b3;border-radius:5px;padding:9px 30px;margin-bottom:0;display:flex;justify-content:center;align-self:flex-start}.mad-uploader-select-file label img{width:25px;margin-left:4px}.mad-uploader-select-file label span{color:#999;font-size:16px;font-family:dinpro-med;margin-left:10px}.mad-uploader-uploaded{flex-grow:1;box-shadow:0 0 15px rgba(0,0,0,.32);border-radius:5px;padding:10px;margin-bottom:20px}.mad-uploader-uploaded-file{display:flex;flex-direction:row;align-items:center}.mad-uploader-uploaded img{width:25px}.mad-uploader-uploaded span{line-height:1.1;margin-left:10px}.mad-uploader-uploaded span:first-child{font-size:16px;font-family:dinpro-bold}.mad-uploader-uploaded span:nth-child(2){color:#b3b3b3;font-size:13px;font-family:dinpro-bold}.mad-uploader-spinner{align-self:center;margin-left:15px;padding-left:15px;padding-right:15px}.mad-uploader-download{align-self:center;margin-left:15px;padding:0 10px;border-left:1px solid #ccc}.mad-uploader-download a{text-decoration:none}.mad-uploader-remove{align-self:center;cursor:pointer;border-left:1px solid #ccc;padding:0 7px 0 16px}.mad-uploader-remove img{width:15px}.mad-uploader-load{display:flex;flex-direction:row;align-items:center;justify-content:center}.mad-uploader .f-manager,.mad-uploader .f-manager__block{width:100%}.mad-uploader .f-manager__block_item1{max-width:250px;width:100%}.mad-uploader .f-manager__block_item1 .item1-text p{max-width:200px}.sk-three-bounce{width:3.2em;margin:auto;text-align:center}.sk-three-bounce .sk-child{width:.8em;height:.8em;background-color:#666;border-radius:100%;display:inline-block;animation:sk-three-bounce 1.4s ease-in-out 0s infinite both}.sk-three-bounce .sk-bounce-1{animation-delay:-.32s;margin-left:2px}.sk-three-bounce .sk-bounce-2{animation-delay:-.16s;margin-left:2px}@keyframes sk-three-bounce{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}.eds-pass{display:flex;justify-content:center}.eds-pass .modal-content{width:440px}.eds-pass .modal-body{margin-top:0}.reg-info{margin-top:18px;padding-left:0;margin-bottom:18px}.reg-info li{margin-bottom:5px;list-style-type:none}.reg-info li .ecp-info{color:#4b4b4d;font-family:dinpro-bold}.reg-info li p{color:#999;font-size:12px;margin-bottom:0}.Toastify__toast-body ul{margin:0;padding:0}.Toastify__toast-body ul li{line-height:1.3;list-style:none;margin-top:15px}.Toastify__toast-body ul li:first-child{margin-top:0}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5zY3NzIiwic3JjL3N0eWxlcy9fZm9udHMuc2NzcyIsInNyYy9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLGNBQ0UsWUFBYSxDQUNiLFdBQVksQ0FDWCxzQ0FFRyxZQUFhLENBR2pCLDBCQUNFLFlBQWEsQ0FDYixxQkFBc0IsQ0FDdEIsc0JBQXVCLENBQ3ZCLFdBQVksQ0FKYiwyQ0FNRyxZQUFhLENBTmhCLDRCQVNHLHNCQ3BCZSxDRHFCZixpQkFBa0IsQ0FWckIsZ0NBYUcsVUFBVyxDQUNYLGNBQWUsQ0FDZix5QkFBMEIsQ0FDMUIsaUJBQWtCLENBQ2xCLGdCQUFpQixDQUNqQixlQUFnQixDQUNoQixZQUFhLENBQ2Isc0JBQXVCLENBQ3ZCLHFCQUFzQixDQXJCekIsb0NBdUJLLFVBQVcsQ0FDWCxlQUFnQixDQXhCckIscUNBMkJLLFVBQWMsQ0FDZCxjQUFlLENBQ2Ysc0JDeENhLENEeUNiLGdCQUFpQixDQUl2Qix1QkFDRSxXQUFZLENBQ1osbUNFM0NrRCxDRjRDbEQsaUJBQWtCLENBQ2xCLFlBQWEsQ0FDYixrQkFBbUIsQ0FDbkIsNEJBQ0UsWUFBYSxDQUNiLGtCQUFtQixDQUNuQixrQkFBbUIsQ0FUdEIsMkJBWUcsVUFBVyxDQVpkLDRCQWVHLGVBQWdCLENBQ2hCLGdCQUFpQixDQWhCcEIsd0NBa0JLLGNBQWUsQ0FDZix1QkMvRGUsQ0Q0Q3BCLHlDQXNCSyxhQUFjLENBQ2QsY0FBZSxDQUNmLHVCQ3BFZSxDRHdFckIsc0JBQ0UsaUJBQWtCLENBQ2xCLGdCQUFpQixDQUNqQixpQkFBa0IsQ0FDbEIsa0JBQW1CLENBRXJCLHVCQUNFLGlCQUFrQixDQUNsQixnQkFBaUIsQ0FDakIsY0FBZSxDQUNmLDBCQUE4QixDQUovQix5QkFNRyxvQkFBcUIsQ0FHekIscUJBQ0UsaUJBQWtCLENBQ2xCLGNBQWUsQ0FDZiwwQkFBOEIsQ0FDOUIsb0JBQXFCLENBSnRCLHlCQU1HLFVBQVcsQ0FHZixtQkFDRSxZQUFhLENBQ2Isa0JBQW1CLENBQ25CLGtCQUFtQixDQUNuQixzQkFBdUIsQ0FsRzNCLHlEQXVHTSxVQUFXLENBdkdqQixzQ0F5R1EsZUFBZ0IsQ0FDaEIsVUFBVyxDQTFHbkIsb0RBNkdZLGVBQWdCLENBVzVCLGlCQUdFLFdBQTBCLENBQzFCLFdBQVksQ0FDWixpQkFBa0IsQ0FMcEIsMkJBUUksVUFBMEIsQ0FDMUIsV0FBMkIsQ0FDM0IscUJBWDJCLENBYTNCLGtCQUFtQixDQUNuQixvQkFBcUIsQ0FDckIsMkRBQTBFLENBZDlFLDhCQWtCSSxxQkFoQmdCLENBaUJoQixlQUFnQixDQW5CcEIsOEJBc0JJLHFCQUFtQyxDQUNuQyxlQUFnQixDQUlwQiwyQkFDRSxVQUNFLGtCQUFtQixDQUVyQixJQUNFLGtCQUFxQixDQUFBLENBR3pCLFVBQ0UsWUFBYSxDQUNiLHNCQUF1QixDQUZ6Qix5QkFJSSxXQUFZLENBSmhCLHNCQU9JLFlBQ0YsQ0FFRixVQUNFLGVBQWdCLENBQ2hCLGNBQWUsQ0FDZixrQkFBbUIsQ0FIckIsYUFNSSxpQkFBa0IsQ0FDbEIsb0JBQXFCLENBUHpCLHVCQVNNLGFBQWMsQ0FDZCx1QkNqTGlCLENEdUt2QixlQWFNLFVBQWMsQ0FDZCxjQUFlLENBQ2YsZUFBZ0IsQ0FJdEIseUJBRUksUUFBUyxDQUNULFNBQVUsQ0FIZCw0QkFLTSxlQUFnQixDQUNoQixlQUFnQixDQUNoQixlQUFnQixDQVB0Qix3Q0FVUSxZQUNGIiwiZmlsZSI6ImluZGV4LnNjc3MifQ== */";
styleInject(css$1);

var css$2 = ".mad-logo-uploader{width:75px;height:75px;margin-right:20px}.mad-logo-uploader input[type=file]{display:none}.mad-logo-uploader label{margin-bottom:0;cursor:pointer}.mad-logo-uploader img:first-child{border-radius:50%;height:100%;width:100%;object-fit:cover}.mad-logo-uploader:hover .mad-logo-uploader__remove{display:inline-block}.mad-logo-uploader__remove{position:absolute;width:20px;height:20px;cursor:pointer}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9sb2dvLXVwbG9hZGVyL2luZGV4LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUJBQ0UsVUFBVyxDQUNYLFdBQVksQ0FDWixpQkFBa0IsQ0FIcEIsb0NBTUksWUFBYSxDQU5qQix5QkFVSSxlQUFnQixDQUNoQixjQUFlLENBWG5CLG1DQWdCSSxpQkFBa0IsQ0FDbEIsV0FBWSxDQUNaLFVBQVcsQ0FDWCxnQkFBaUIsQ0FuQnJCLG9EQXVCSSxvQkFBcUIsQ0FHdkIsMkJBRUUsaUJBQWtCLENBQ2xCLFVBQVcsQ0FDWCxXQUFZLENBQ1osY0FBZSIsImZpbGUiOiJpbmRleC5zY3NzIn0= */";
styleInject(css$2);

var addImg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iYWRkaW1nLnN2ZyI+DQogIDxkZWZzDQogICAgIGlkPSJkZWZzMiIgLz4NCiAgPHNvZGlwb2RpOm5hbWVkdmlldw0KICAgICBpZD0iYmFzZSINCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIg0KICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiINCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIg0KICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIg0KICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIg0KICAgICBpbmtzY2FwZTp6b29tPSIyLjgiDQogICAgIGlua3NjYXBlOmN4PSIxMjcuMjc0NzgiDQogICAgIGlua3NjYXBlOmN5PSIxMTUuMzg5NjUiDQogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSINCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIg0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIHVuaXRzPSJweCINCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjAwIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4MzciDQogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAvPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhNSI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8Zw0KICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSINCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciINCiAgICAgaWQ9ImxheWVyMSINCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjU0LjY2NjY1KSI+DQogICAgPGcNCiAgICAgICBpZD0iTGF5ZXIxMDAwIg0KICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuMTA1OTA2NywwLDAsMS4xMDU5MDY3LC0wLjA2Njc5Njc2LDI1NC41MzMzNCkiPg0KICAgICAgPGcNCiAgICAgICAgIGlkPSJMYXllcjEwMDEiPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgICBpZD0icGF0aDMwIg0KICAgICAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgICBkPSJNIDMwLjY4OSwzLjY5ODEgQyAyOS43NDc5LDMuMDcwNSAyOC44NTI0LDIuNTUxNyAyNy44MjQsMi4wNzY5IGwgLTAuNjQ4NSwxLjQzOTIgYyAwLjkyMDcsMC40MDkzIDEuNzg1OCwwLjkyNjQgMi42MjI2LDEuNDg0MiB6IiAvPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgICBpZD0icGF0aDMyIg0KICAgICAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgICBkPSJNIDM1LjcwODMsOS4yODY2IEMgMzUuMTM2LDguMzM3IDM0LjQ5MzcsNy40NjczIDMzLjc3MjgsNi42MjY2IGwgLTEuMTg2NiwxLjA0IGMgMC42NjE2LDAuNzc0NyAxLjI0NjQsMS41NjU4IDEuNzcyNSwyLjQzODYgeiIgLz4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgICAgaWQ9InBhdGgzNCINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgICAgZD0ibSAzOC4zMzk3LDE3LjAyMDkgYyAtMC4wODEzLC0wLjk3NzQgLTAuMzU3MSwtMi4yODg0IC0wLjY1LC0zLjIyNzIgbCAtMS41MTIzLDAuNDQ5OCBjIDAuMjYyOCwwLjkxMDIgMC41MTU3LDIuMDExMiAwLjU5NDIsMi45NTM3IHoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoMzYiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Im0gMzcuNTI1LDI1LjE0MzYgYyAwLjMyMjEsLTEuMTI2NSAwLjU2NjcsLTIuMDM1NiAwLjc0NDQsLTMuMjAzNyBsIC0xLjU2MzMsLTAuMjIgYyAtMC4xNjUyLDEuMDcyNiAtMC4zODY0LDEuOTAyNiAtMC42ODIsMi45Mzc4IHoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoMzgiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Im0gMzMuNDAzMiwzMi4xODk0IGMgMC43NDU1LC0wLjgxMDIgMS40MDk5LC0xLjY3NSAyLjAwODksLTIuNTk4MyBsIC0xLjMyODYsLTAuODUyNiBjIC0wLjU1NzksMC44NTM4IC0xLjE1NzQsMS42Mzg0IC0xLjg0ODUsMi4zODk5IHoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoNDAiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Im0gMjYuNzI0NSwzNi44OTc0IGMgMC45OTgzLC0wLjQxMTMgMi4wMDU1LC0wLjk1MzggMi45MTM0LC0xLjUzNzIgbCAtMC44NjI2LC0xLjMyMjMgYyAtMC44MDk1LDAuNTI5NSAtMS43Njg4LDEuMDM3MiAtMi42NjM0LDEuNDA1NCB6IiAvPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgICBpZD0icGF0aDQyIg0KICAgICAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgICBkPSJtIDE4LjY5OTksMzguMzk0NyBjIDEuMDg0OCwwLjAyMDcgMi4yMDg3LC0wLjAxNzMgMy4yODI1LC0wLjE4NCBsIC0wLjIyODgsLTEuNTYxOCBjIC0wLjk3OSwwLjE1NTkgLTIuMDIxNiwwLjE4NjIgLTMuMDEyNiwwLjE2NzggeiIgLz4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgICAgaWQ9InBhdGg0NCINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgICAgZD0ibSAxMC43NzM0LDM2LjQyODkgYyAwLjk5OTcsMC40ODkgMS45OTY0LDAuODc4NCAzLjA2MzQsMS4xOTU5IGwgMC40Mzk5LC0xLjUxNTkgQyAxMy4zMjIzLDM1LjgzOTggMTIuMzU3NCwzNS40NDY0IDExLjQ2NywzNS4wMTEgWiIgLz4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgICAgaWQ9InBhdGg0NiINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgICAgZD0ibSA0LjM4NiwzMS4zNDMyIGMgMC43MDk2LDAuODU5MiAxLjQ0ODYsMS42MjM0IDIuMjg3MywyLjM1NzMgTCA3LjcwNiwzMi41MDc3IEMgNi45MzI0LDMxLjgyNjYgNi4yNjA2LDMxLjEzMzggNS42MDM4LDMwLjMzOTIgWiIgLz4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgICAgaWQ9InBhdGg0OCINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgICAgZD0ibSAwLjY4MTcsMjQuMDYyNSBjIDAuMjcxNiwxLjA2MDQgMC42NTA2LDIuMTAxOCAxLjEwMTYsMy4wOTkxIGwgMS40MzQsLTAuNjU4NSBDIDIuODA0OSwyNS41NzE2IDIuNDYwNSwyNC42NDg5IDIuMjA3NiwyMy42NjExIFoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoNTAiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Im0gMC4zNDI0LDE1LjkwMzggYyAtMC4xODgyLDEuMDkyNyAtMC4yNzUyLDIuMTY1OSAtMC4yODIsMy4yNzQzIGggMS41NzgzIGMgMC4wMDY4LC0xLjAyMDggMC4wODYyLC0yLjAwMTMgMC4yNTk3LC0zLjAwNzMgeiIgLz4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgICAgaWQ9InBhdGg1MiINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgICAgZD0iTSAzLjQyNDgsOC4zNDA3IEMgMi43OTI0LDkuMjQ5NyAyLjI3MTEsMTAuMjAzIDEuOCwxMS4yMDM0IGwgMS40MzkxLDAuNjQ4NSBjIDAuNDI2NCwtMC45MTIyIDAuOTEyOCwtMS43OTMyIDEuNDg4MiwtMi42MiB6IiAvPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgICBpZD0icGF0aDU0Ig0KICAgICAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgICBkPSJNIDkuMzY3NCwyLjc0MjUgQyA4LjQzOTYsMy4yOTM2IDcuNTI0LDMuOTY0IDYuNzA4OCw0LjY3MTIgTCA3Ljc0MTQsNS44NjQgQyA4LjUxMyw1LjIwODEgOS4zMTQ2LDQuNjEwMyAxMC4xODYzLDQuMDkyMSBaIiAvPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgICBpZD0icGF0aDU2Ig0KICAgICAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtcnVsZTpldmVub2RkIg0KICAgICAgICAgICBkPSJtIDE2LjgyNSwwLjU5MzkgYyAtMC45OTA0LDAuMDk0OSAtMi4yODE2LDAuMzQzIC0zLjIyNzgsMC42NDU3IGwgMC40NDk5LDEuNTEyMyBjIDAuOTQzMSwtMC4yNzA1IDEuOTc3MiwtMC40OTU4IDIuOTU0NSwtMC41ODk2IHoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoNTgiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Ik0gMjQuMzkzNiwxLjAwOTkgQyAyMy4zMDY1LDAuNzUxNCAyMi4yNjQsMC41OTAxIDIxLjE0OTcsMC41MDcgbCAtMC4xMDkzLDEuNTc0MyBjIDEuMDI4NiwwLjA3NzEgMS45ODMsMC4yMjU1IDIuOTg2MywwLjQ2MzkgeiIgLz4NCiAgICAgIDwvZz4NCiAgICAgIDxnDQogICAgICAgICBpZD0iTGF5ZXIxMDAyIj4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgICAgaWQ9InBhdGg2MSINCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgICAgZD0ibSAxMy4zMDE3LDE0LjAxMiBoIDEyLjU5NTggdiA1LjM3NTggSCAyNC4yOTgyIFYgMTUuNjExNCBIIDE0LjEwMTQgdiA3LjY4NDYgaCA2LjI2NzQgdiAxLjU5OTMgSCAxMi41MDIxIFYgMTQuMDEyIFogbSAxMi41OTU4LDYuOTU0IHYgMy45MjkzIEggMjEuOTY4MSBWIDIzLjI5NiBoIDIuMzMwMSB2IC0yLjMzIHoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoNjMiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Im0gMTQuODg1OSwyMi40NjE1IGggOC42MDg4IEwgMjEuMDU1LDE5LjQxODggMjAuMDk3OSwyMC40NTEgMTcuOTY5NywxNy43OTU5IFoiIC8+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICAgIGlkPSJwYXRoNjUiDQogICAgICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICAgIGQ9Ik0gMjQuMjk4MiwyNy4yMjU0IFYgMjQuODk1MyBIIDIxLjk2ODEgViAyMy4yOTYgaCAyLjMzMDEgdiAtMi4zMyBoIDEuNTk5MyB2IDIuMzMgaCAyLjMzIHYgMS41OTkzIGggLTIuMzMgdiAyLjMzMDEgeiIgLz4NCiAgICAgIDwvZz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg==';

var crossImput = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iY3Jvc3MtaW5wdXQuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjEuOTc5ODk5Ig0KICAgICBpbmtzY2FwZTpjeD0iMjA3LjQ3ODQxIg0KICAgICBpbmtzY2FwZTpjeT0iMTYwLjQxNjA1Ig0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICB1bml0cz0icHgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAwMSINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTkiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnNzEiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4zMzgwODIzMywwLDAsMC4zMzgwODIzMywtNzkuNTEyMDQyLDEzMy44Mzg5MykiPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDU3Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZSINCiAgICAgICAgIGQ9Ik0gMjM3LjYzODYsMzYwLjk0NDggViA0ODAuOTQ1IEggMzU3LjYzODUgViAzNjAuOTQ0OCBaIiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDU5Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6IzU2NTc1NztmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Im0gMzMwLjM0ODUsNDY5LjMxMTMgLTMyLjcxMTYsLTMyLjcxMTggLTMyLjcwMjcsMzIuNzAyNyBjIC0yLjAzMDcsMi4zNDQ2IC01LjAzNzIsMy44MjYyIC04LjM4MzcsMy44MjYyIC02LjEyNzEsMCAtMTEuMDg2MywtNC45NTkyIC0xMS4wODYzLC0xMS4wODYzIDAsLTMuMjUwMiAxLjQwMzEsLTYuMTc4NiAzLjYzNDUsLTguMjA5NCBsIDMyLjg4NTYsLTMyLjg4NjQgLTMyLjg3OTYsLTMyLjg4MDIgYyAtMi4yMzE0LC0yLjAzMDcgLTMuNjM0NiwtNC45NTkyIC0zLjYzNDYsLTguMjA5NCAwLC02LjEyNzEgNC45NTkyLC0xMS4wODYzIDExLjA4NjMsLTExLjA4NjMgMy4zNDY2LDAgNi4zNTMsMS40ODE3IDguMzgzOCwzLjgyNjIgbCAzMi42OTY3LDMyLjY5NjggMzIuNzA1NiwtMzIuNzA1OSBjIDIuMDMwOCwtMi4zNDQ1IDUuMDM3MiwtMy44MjYyIDguMzgzOCwtMy44MjYyIDYuMTI3MSwwIDExLjA4NjMsNC45NTkyIDExLjA4NjMsMTEuMDg2MyAwLDMuMjUwMiAtMS40MDMyLDYuMTc4NyAtMy42MzQ2LDguMjA5NCBsIC0zMi44ODg3LDMyLjg4OTMgMzIuODk0NiwzMi44OTU1IGMgMi4yMzE1LDIuMDMwNyAzLjYzNDYsNC45NTkyIDMuNjM0Niw4LjIwOTQgMCw2LjEyNzEgLTQuOTU5MiwxMS4wODYzIC0xMS4wODYzLDExLjA4NjMgLTMuMzQ2NiwwIC02LjM1MywtMS40ODE3IC04LjM4MzcsLTMuODI2MiB6IiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

var _this$3 = undefined;
var LogoUploader = function (_a) {
    var file = _a.file, handleUpload = _a.handleUpload, handleRemove = _a.handleRemove;
    var handleRemoveContext = React.useContext(FilesContext).handleRemove;
    var fileContext = React.useContext(FilesContext).file;
    var isLoading = fileContext ? fileContext.loading : false;
    var logoId = file ? file._id : "";
    var logoPath = file ? file.path : "";
    var StdSpinner = function () {
        return (React__default.createElement("div", { className: "mad-uploader-spinner", style: { marginLeft: "0" } },
            React__default.createElement("div", { className: "sk-three-bounce" },
                React__default.createElement("div", { className: "sk-bounce-1 sk-child" }),
                React__default.createElement("div", { className: "sk-bounce-2 sk-child" }),
                React__default.createElement("div", { className: "sk-bounce-3 sk-child" }))));
    };
    var onRemove = function (e, fileId) { return __awaiter(_this$3, void 0, void 0, function () {
        var isRemoved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, handleRemoveContext(fileId)];
                case 1:
                    isRemoved = _a.sent();
                    if (isRemoved) {
                        handleRemove && handleRemove(fileId);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    /** Лоадер */
    if (isLoading) {
        return (React__default.createElement("div", { className: "mad-logo-uploader" },
            React__default.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" } },
                React__default.createElement(StdSpinner, null))));
    }
    /** Файл загружен */
    if (logoPath) {
        return (React__default.createElement("div", { className: "mad-logo-uploader" },
            isLoading ? React__default.createElement(StdSpinner, null) : React__default.createElement("img", { src: logoPath, alt: "" }),
            React__default.createElement("img", { className: "mad-logo-uploader__remove", src: crossImput, alt: "", onClick: function (e) { return onRemove(e, logoId); } })));
    }
    /** Файл отсутсвует, показываем загрузчик */
    return (React__default.createElement("div", { className: "mad-logo-uploader" },
        React__default.createElement("input", { type: "file", name: "mad-file", id: "mad-logo-upload", required: true, onChange: handleUpload, accept: "image/*" }),
        React__default.createElement("label", { htmlFor: "mad-logo-upload" },
            React__default.createElement("img", { src: addImg, alt: "" }))));
};

var _this$4 = undefined;
/**
 * @param theme Есть 2 вида загрузчика: 1. Стандарный 2. Серая кнопка
 * @param uploadText Заголовок загрузчика
 * @param objId ID связанного объекта
 * @param objCode Code связанного объекта
 * @param objType Тип связанного объекта (Товар Сделка Торги и тд)
 * @param handleUpload ок
 * @param handleRemove ок
 * @param handleSign ок
 * @param tool по умолчанию - FileManager, если tool="uploader" то выйдет компонент загрузчика
 * @param enableRemove  можно ли удалять файл, но помоему это уже не актульно
 * @param userId равен null если текущему пользователю не нужно подписывать документ
 * @param extensions какие расширения разрешены для загузки файла
 * @param needTosign нужно ли подписывать файл пользователю
 * @param enableFakeRemove По сути эта кнопка делает все тоже самое что и реальный remove, только не отрпавляет запрос на сервер, по хорошнму она должна удалять сервером после подверждения той или иной формы
 * @param handleFakeRemove Обработчик ложного удаления файла. Доступно только когда tool="viewer"
 * TODO: нужно сделать еще fakeRemove. Например, когда ползователь редактурет товар, при нажатии кнопки УДАЛИТЬ не должен удалять файл из сервера до тех пор пока не созранить форму
 * TODO: сделать ограничения по размеру файла, по умолчанию сделать 5MB
 * TODO: нужно сделать такую тему, что када клиенту нужно загрузить file и не нужно ее подписывать, а галочка уже была. Сейчас эта работает только с нерезидентом (реализовано на сервере)
 * TODO: нужно реализовать loading у removeMutation и signMutation
 */
var FileUploader = function (props) {
    var _a = props.theme, theme = _a === void 0 ? "default" : _a, _b = props.uploadText, uploadText = _b === void 0 ? null : _b, _c = props.objId, objId = _c === void 0 ? "" : _c, _d = props.objCode, objCode = _d === void 0 ? "" : _d, _e = props.objType, objType = _e === void 0 ? 999 : _e, file = props.file, _f = props.ExtraContent, ExtraContent = _f === void 0 ? null : _f, _g = props.handleUpload, handleUpload = _g === void 0 ? null : _g, _h = props.handleRemove, handleRemove = _h === void 0 ? null : _h, _j = props.handleSign, handleSign = _j === void 0 ? null : _j, _k = props.tool, tool = _k === void 0 ? "viewer" : _k, _l = props.enableRemove, enableRemove = _l === void 0 ? null : _l, _m = props.userId, userId = _m === void 0 ? null : _m, _o = props.extensions, extensions = _o === void 0 ? "*" : _o, _p = props.needToSign, needToSign = _p === void 0 ? true : _p, _q = props.enableFakeRemove, enableFakeRemove = _q === void 0 ? false : _q, _r = props.handleFakeRemove, handleFakeRemove = _r === void 0 ? null : _r;
    var randInd = Math.floor(Math.random() * (10000 - 1)) + 1;
    var language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru";
    var RenderContent = function () {
        var fileContext = React.useContext(FilesContext).file;
        if (tool == "viewer") {
            return (React__default.createElement(Viewer, { file: fileContext, handleRemove: handleRemove, handleSign: handleSign, ExtraContent: ExtraContent, enableFakeRemove: enableFakeRemove, handleFakeRemove: handleFakeRemove }));
        }
        /**Если нужно загрудать файл */
        var handleUploadContext = React.useContext(FilesContext).handleUpload;
        var upload = function (e, _a) {
            var objId = _a.objId, objType = _a.objType;
            return __awaiter(_this$4, void 0, void 0, function () {
                var file;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e.preventDefault();
                            return [4 /*yield*/, handleUploadContext(e, { objId: objId, objType: objType, objCode: objCode, needToSign: needToSign })];
                        case 1:
                            file = _b.sent();
                            handleUpload && handleUpload(file);
                            return [2 /*return*/];
                    }
                });
            });
        };
        if (tool == "logo-manager") {
            return (React__default.createElement(LogoUploader, { handleUpload: function (e) { return upload(e, { objId: objId, objType: objType }); }, handleRemove: handleRemove, file: fileContext }));
        }
        var loading = fileContext ? fileContext.loading : false;
        /** Если файла нет и файл не грузиться на сервер, показать загрузчик */
        if (!fileContext && !loading) {
            if (theme == "inactive-button") {
                return (React__default.createElement("label", { htmlFor: "mad-file-upload-" + randInd, className: "jbtn jbtn-green mad-uploader-button" },
                    uploadText,
                    extensions != "*" && React__default.createElement("span", { style: { fontFamily: "dinpro-med" } },
                        " (",
                        extensions,
                        ")"),
                    React__default.createElement("input", { type: "file", name: "mad-file", id: "mad-file-upload-" + randInd, required: true, onChange: function (e) { return upload(e, { objId: objId, objType: objType }); }, accept: extensions })));
            }
            else {
                return (React__default.createElement("div", { className: "mad-uploader-select-file" },
                    uploadText && React__default.createElement("p", null, uploadText),
                    React__default.createElement("input", { type: "file", name: "mad-file", id: "mad-file-upload-" + randInd, accept: extensions, required: true, onChange: function (e) { return upload(e, { objId: objId, objType: objType }); } }),
                    React__default.createElement("label", { htmlFor: "mad-file-upload-" + randInd },
                        React__default.createElement("div", { className: "mad-uploader-load" },
                            React__default.createElement("img", { src: addFile, alt: "" }),
                            React__default.createElement("span", null, messages[language].chooseFile),
                            extensions != "*" && React__default.createElement("span", { style: { color: "#B3B3B3", marginLeft: "5px" } },
                                "(",
                                extensions,
                                ")")))));
            }
        }
        return (React__default.createElement(Viewer, { enableRemove: enableRemove != null ? enableRemove : true, enableFakeRemove: enableFakeRemove, handleFakeRemove: handleFakeRemove, file: fileContext, handleRemove: handleRemove, handleSign: handleSign }));
    };
    return (React__default.createElement(FilesProvider, { file: file, userId: userId },
        React__default.createElement(RenderContent, null)));
};

module.exports = FileUploader;
