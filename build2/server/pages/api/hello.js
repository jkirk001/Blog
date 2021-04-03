module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Nxiy");


/***/ }),

/***/ "F4YQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("FiKB");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const blogSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
  author: {
    name: String,
    date: {
      type: Date,
      default: Date.now()
    },
    read: Number
  },
  title: {
    type: String,
    required: true
  },
  quip: {
    type: String
  },
  tags: {
    type: Array
  },
  body: {
    type: Array
  },
  mainImg: {
    type: String
  }
});
/* harmony default export */ __webpack_exports__["a"] = (mongoose__WEBPACK_IMPORTED_MODULE_0__["models"].Blog || mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model("Blog", blogSchema));

/***/ }),

/***/ "FiKB":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "Nxiy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__("FiKB");
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);

// CONCATENATED MODULE: ./utils/db-connect-new.js


async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (external_mongoose_default.a.connection.readyState >= 1) {
    return;
  }

  return external_mongoose_default.a.connect("mongodb://localhost:27017/blog-almost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    maxIdleTimeMS: 1000,
    serverSelectionTimeoutMS: 1000,
    socketTimeoutMS: 2000
  }).then(console.log("open and connected"));
}

/* harmony default export */ var db_connect_new = (dbConnect);
// EXTERNAL MODULE: ./Models/blogpost.js
var blogpost = __webpack_require__("F4YQ");

// CONCATENATED MODULE: ./pages/api/hello.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    await db_connect_new();
    blogpost["a" /* default */].insertMany(body).then(() => console.log("Success")).catch(e => console.log("failure"));
    return res.json({
      message: "successlol"
    });
  }

  if (req.method === "GET") {
    await db_connect_new();
    const blogs = await blogpost["a" /* default */].find({});
    return res.json(blogs);
  }

  return res.json({
    message: "hi"
  });
};

/* harmony default export */ var hello = __webpack_exports__["default"] = (handler);

/***/ })

/******/ });