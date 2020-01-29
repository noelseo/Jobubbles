/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//color = category\n//size = company name and value\n\nconst data = [\n  {\n    cat: \"Financial Services\",\n    name: \"JPMorgan\",\n    value: 88,\n    icon: \"../img/jpmorgan.png\",\n    desc: \"See how far your thinking can go.\", \n    children: [\n      {name: \"Software Engineer\", value: 38},\n      {name: \"Software Developer\", value: 45},\n      {name: \"Senior Engineer\", value: 5}\n    ]\n  },\n  {\n    cat: \"Education\",\n    name: \"UCSF\",\n    value: 13,\n    icon: \"../img/ucsf.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Education\",\n    name: \"UC Berkeley\",\n    value: 20,\n    icon: \"../img/berkeley.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Education\",\n    name: \"UC Davis\",\n    value: 30,\n    icon: \"../img/ucdavis.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Google\",\n    value: 100,\n    icon: \"../img/google.png\",\n    desc: 'Software Engineer'\n  },\n  {\n    cat: \"Tech\",\n    name: \"Salesforce\",\n    value: 70,\n    icon: \"../img/salesforce.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Biotech\",\n    name: \"Genentech\",\n    value: 100,\n    icon: \"../img/genentech.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Samsung\",\n    value: 300,\n    icon: \"../img/samsung.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Biotech\",\n    name: \"Neuralink\",\n    value: 40,\n    icon: \"../img/neuralink.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Financial Services\",\n    name: \"Capital One\",\n    value: 110,\n    icon: \"../img/capitalone.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Education\",\n    name: \"App Academy\",\n    value: 20,\n    icon: \"../img/aa.png\",\n    desc: \"Instructor\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Microsoft\",\n    value: 150,\n    icon: \"../img/microsoft.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Apple\",\n    value: 180,\n    icon: \"../img/apple.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Retail\",\n    name: \"Nordstrom\",\n    value: 60,\n    icon: \"../img/nordstrom.png\",\n    desc: \"Frontend Engineer\"\n  },\n  {\n    cat: \"Nonprofit\",\n    name: \"Bill & Melinda Gates Foundation\",\n    value: 250,\n    icon: \"../img/billgates.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Automotive\",\n    name: \"Tesla\",\n    value: 65,\n    icon: \"../img/tesla.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Financial Services\", \n    name: \"American Express\",\n    value: 80,\n    icon: \"../img/amex.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Financial Services\",\n    name: \"Visa\",\n    value: 45,\n    icon: \"../img/visa.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Facebook\",\n    value: 100,\n    icon: \"../img/fb.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Uber\",\n    value: 100,\n    icon: \"../img/uber.png\",\n    desc: \"Software Engineer\"\n  },\n  {\n    cat: \"Tech\",\n    name: \"Airbnb\",\n    value: 100,\n    icon: \"../img/airbnb.png\",\n    desc: \"Software Engineer\"\n  }, \n  {\n    cat: \"Tech\",\n    name: \"YouTube\",\n    value: 100,\n    icon: \"../img/youtube.png\",\n    desc: \"Software Engineer\"\n  }, \n  {\n    cat: \"Retail\",\n    name: \"McDonald's\",\n    value: 50,\n    icon: \"../img/mcdonalds.png\",\n    desc: \"Software Engineer\"\n  }, \n  {\n    cat: \"Retail\",\n    name: \"Starbucks\",\n    value: 50,\n    icon: \"../img/starbucks.png\",\n    desc: \"Software Engineer\"\n  }, \n];\n\nmodule.exports = data;\n\n//# sourceURL=webpack:///./src/data.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_data__WEBPACK_IMPORTED_MODULE_0__);\n// const d3 = require(\"D3\");\n\n\nfunction run() {\n    let svg = d3.select(\"svg\");\n    let width = document.body.clientWidth; // get width in pixels\n    let height = +svg.attr(\"height\"); \n    let centerX = width * 0.55;\n    let centerY = height * 0.5;\n    let focusedNode;\n\n    // let format = d3.format(\",d\");\n\n    // let scaleColor = d3.scaleOrdinal(d3.schemeCategory10);\n    let scaleColor = d3.scaleOrdinal([`#323a45`, `#3f6184`, `#778899`, `#5faeb6`, `#1d456d`, `#1e3349`, `#4c5f72`, `#85888b`])\n\n    // use the force\n    let simulation = d3\n      .forceSimulation()\n      .force(\"charge\", d3.forceManyBody()) //attract force\n      .force(\"collide\", d3.forceCollide(d => d.r)) //collide force\n      .force(\"x\", d3.forceX(centerX))\n      .force(\"y\", d3.forceY(centerY));\n    \n    // reduce number of circles on mobile screen due to slow computation\n    // if (\n      //   \"matchMedia\" in window &&\n      //   window.matchMedia(\"(max-device-width: 767px)\").matches\n      // ) {\n        //   data = data.filter(el => {\n          //     return el.value >= 50;\n          //   });\n          // }\n          \n    // use pack to calculate radius of the circle\n    let pack = d3.pack().size([width, height]).padding(2);\n    let root = d3.hierarchy({ children: _data__WEBPACK_IMPORTED_MODULE_0___default.a }).sum(d => d.value);\n\n    // we use pack() to automatically calculate radius conveniently only\n    // and get only the leaves\n    let nodes = pack(root)\n      .descendants() //.leaves() // leaves are nodes with no children\n      .filter(function(d) {\n        return d.depth === 1;\n      })\n      .map(node => {\n        debugger;\n        console.log(\"node:\", node.x, (node.x - centerX) * 2);\n        const data = node.data;\n        return {\n          x: centerX + (node.x - centerX) * 3, \n          // magnify start position to have transition to center movement\n          y: centerY + (node.y - centerY) * 3,\n          r: 0, // for tweening\n          radius: node.r, //original radius\n          id: data.cat + \".\" + data.name.replace(/\\s/g, \"-\"),\n          cat: data.cat,\n          name: data.name,\n          value: data.value,\n          icon: data.icon,\n          desc: data.desc\n        };\n      });\n    \n    simulation.nodes(nodes).on(\"tick\", ticked);\n\n    svg.style(\"background-color\", \"transparent\");\n\n    let node = svg\n      .selectAll(\".node\")\n      .data(nodes)\n      .enter()\n      .append(\"g\")\n      .attr(\"class\", \"node\")\n      .call(\n        d3\n          .drag()\n          .on(\"start\", d => {\n            if (!d3.event.active) simulation.alphaTarget(0.2).restart();\n            d.fx = d.x;\n            d.fy = d.y;\n          })\n          .on(\"drag\", d => {\n            d.fx = d3.event.x;\n            d.fy = d3.event.y;\n          })\n          .on(\"end\", d => {\n            if (!d3.event.active) simulation.alphaTarget(0);\n            d.fx = null;\n            d.fy = null;\n          })\n      );\n\n\n}\n\nmain.innerHTML = run();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });