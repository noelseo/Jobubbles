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
/******/ 	__webpack_require__.p = "/Jobubbles/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animate.js":
/*!************************!*\
  !*** ./src/animate.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Animate(node, focusedNode, simulation, centerX, centerY) {

    //----------------------------------------------------------------------------------
    // when clicked

    node.on("click", currentNode => {
        d3.event.stopPropagation();
        let currentTarget = d3.event.currentTarget; // the <g> el

        if (currentNode === focusedNode) { // no focusedNode or same focused node is clicked
            return;
        }

        let lastNode = focusedNode;
        focusedNode = currentNode;

        simulation.alphaTarget(0.2).restart();

        // hide all circle-overlay
        d3.selectAll(".circle-overlay").classed("hidden", true);
        d3.selectAll(".node-icon").classed("node-icon--faded", false).style("opacity", 1);

        // don't fix last node to center anymore
        if (lastNode) {
            lastNode.fx = null;
            lastNode.fy = null;
            
            node
                .filter((d, i) => i === lastNode.index)
                .transition()
                .duration(1000)
                .ease(d3.easePolyOut)
                .tween("circleOut", () => {
                    let irl = d3.interpolateNumber(lastNode.r, lastNode.radius);
                    return t => {
                        lastNode.r = irl(t);
                    };
                })
                .on("interrupt", () => {
                    lastNode.r = lastNode.radius;
                });
        }

        d3.transition() // Start an animated transition. Circle opens
            .duration(1000)
            .ease(d3.easePolyOut)
            .tween("moveIn", () => {
                let ix = d3.interpolateNumber(currentNode.x, centerX);
                let iy = d3.interpolateNumber(currentNode.y, centerY);
                let ir = d3.interpolateNumber(currentNode.r, centerY * 0.5);
                return function (t) {
                    currentNode.fx = ix(t);
                    currentNode.fy = iy(t);
                    currentNode.r = ir(t);
                    simulation.force("collide", d3.forceCollide(d => d.r));
                };
            })
            .on("end", () => {
                simulation.alphaTarget(0);
                let currentGroup = d3.select(currentTarget);
                currentGroup.select(".circle-overlay").classed("hidden", false);
                currentGroup.select(".node-icon").classed("node-icon--faded", true).style("opacity", 0); // style makes the logo disappear as soon as clicked
            })
        // .on("interrupt", () => {
        //   currentNode.fx = null;
        //   currentNode.fy = null;
        //   simulation.alphaTarget(0);
        // });
    });

    // blur
    d3.select(document).on("click", () => {
        let target = d3.event.target;
        // check if click on document but not on the circle overlay
        if (!target.closest("#circle-overlay") && focusedNode) {
            focusedNode.fx = null;
            focusedNode.fy = null;
            simulation.alphaTarget(0.2).restart();
            d3.transition()
                .duration(3000)
                .ease(d3.easePolyOut)
                .tween("moveOut", function () {
                    console.log("tweenMoveOut", focusedNode);
                    let ir = d3.interpolateNumber(focusedNode.r, focusedNode.radius);
                    return function (t) {
                        focusedNode.r = ir(t);
                        simulation.force("collide", d3.forceCollide(d => d.r));
                    };
                })
                .on("end", () => {
                    focusedNode = null;
                    simulation.alphaTarget(0);
                })
            // .on("interrupt", () => {
            //   simulation.alphaTarget(0);
            // });

            // // hide all circle-overlay
            d3.selectAll(".circle-overlay").classed("hidden", true);
            d3.selectAll(".node-icon").classed("node-icon--faded", false).style("opacity", 1);
        }
    });

}

module.exports = Animate;

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const data = [
  {
    cat: "Financial Services",
    name: "JPMorgan",
    value: 807,
    icon: "./img/jpmorgan.png",
    desc: "See how far your thinking can go.",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1067%2C1068&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://careers.jpmorgan.com/us/en/home"
  },
  {
    cat: "Education",
    name: "UCSF",
    value: 248,
    icon: "./img/ucsf.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=3028%2C3029&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.ucsf.edu/about/working-ucsf"
  },
  {
    cat: "Education",
    name: "UC Berkeley",
    value: 130,
    icon: "./img/berkeley.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=2517&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://career.berkeley.edu/"
  },
  {
    cat: "Education",
    name: "UC Davis",
    value: 178,
    icon: "./img/ucdavis.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=2840%2C2842%2C2844&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.ucdavis.edu/jobs/"
  },
  {
    cat: "Tech",
    name: "Google",
    value: 1036,
    icon: "./img/google.png",
    desc: 'Software Engineer',
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1441&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://careers.google.com/"
  },
  {
    cat: "Tech",
    name: "Salesforce",
    value: 1355,
    icon: "./img/salesforce.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=3185&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.salesforce.com/company/careers/"
  },
  {
    cat: "Financial Services",
    name: "Goldman Sachs",
    value: 375,
    icon: "./img/goldman.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1382&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.goldmansachs.com/careers/"
  },
  {
    cat: "Tech",
    name: "Samsung",
    value: 239,
    icon: "./img/samsung.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1753%2C1447520%2C3781124&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.samsung.com/us/careers/"
  },
  {
    cat: "Biotech",
    name: "Amgen",
    value: 168,
    icon: "./img/amgen.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=2068&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://careers.amgen.com/"
  },
  {
    cat: "Financial Services",
    name: "Capital One",
    value: 622,
    icon: "./img/capitalone.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1419&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.capitalonecareers.com/"
  },
  {
    cat: "Education",
    name: "App Academy",
    value: 2,
    icon: "./img/aa.png",
    desc: "Instructor",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=3113247&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://jobs.lever.co/appacademy/"
  },
  {
    cat: "Tech",
    name: "Microsoft",
    value: 3225,
    icon: "./img/microsoft.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1035&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://careers.microsoft.com/us/en/"
  },
  {
    cat: "Tech",
    name: "Apple",
    value: 1983,
    icon: "./img/apple.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=162479&geoId=103644278&keywords=software&location=United%20States",
    company: "Company Homepage",
    companyUrl: "https://www.apple.com/jobs/us/"
  },
  {
    cat: "Retail",
    name: "Nordstrom",
    value: 161,
    icon: "./img/nordstrom.png",
    desc: "Frontend Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=3379&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://careers.nordstrom.com/"
  },
  {
    cat: "Philanthropy",
    name: "Bill & Melinda Gates Foundation",
    value: 5,
    icon: "./img/billgates.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=8736&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://www.gatesfoundation.org/careers"
  },
  {
    cat: "Automotive",
    name: "Tesla",
    value: 553,
    icon: "./img/tesla.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=15564&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://www.tesla.com/careers"
  },
  {
    cat: "Financial Services", 
    name: "American Express",
    value: 183,
    icon: "./img/amex.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1277&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://careers.americanexpress.com/"
  },
  {
    cat: "Financial Services",
    name: "Visa",
    value: 297,
    icon: "./img/visa.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=2190&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://usa.visa.com/careers.html"
  },
  {
    cat: "Tech",
    name: "Facebook",
    value: 1072,
    icon: "./img/fb.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=10667&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://www.facebook.com/careers/"
  },
  {
    cat: "Tech",
    name: "Uber",
    value: 238,
    icon: "./img/uber.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1815218&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://www.uber.com/us/en/careers/"
  },
  {
    cat: "Tech",
    name: "Airbnb",
    value: 35,
    icon: "./img/airbnb.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=309694&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://careers.airbnb.com/"
  }, 
  {
    cat: "Tech",
    name: "YouTube",
    value: 16,
    icon: "./img/youtube.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=16140%2C1747859%2C29004510&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://www.youtube.com/jobs/"
  }, 
  {
    cat: "Retail",
    name: "McDonald's",
    value: 29,
    icon: "./img/mcdonalds.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=2677&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://careers.mcdonalds.com/main/"
  }, 
  {
    cat: "Retail",
    name: "Starbucks",
    value: 56,
    icon: "./img/starbucks.png",
    desc: "Inspire positive change in the world while you grow in your career and in your community.",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=2271&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://www.starbucks.com/careers/"
  }, 
  {
    cat: "Airlines",
    name: "Southwest",
    value: 4,
    icon: "./img/southwest.png",
    desc: "Share your interests and preferences for a personalized experience.",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=4599&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://careers.southwestair.com/"
  },
  {
    cat: "Aerospace",
    name: "Boeing",
    value: 555,
    icon: "./img/boeing.png",
    desc: "From the seabed to outer space, we are redefining the next generation.",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=1384&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://jobs.boeing.com/"
  },
  {
    cat: "Tech",
    name: "Twitter",
    value: 244,
    icon: "./img/twitter.png",
    desc: "",
    link: "Apply Now",
    linkUrl: "https://www.linkedin.com/jobs/search/?f_C=96622&keywords=software",
    company: "Company Homepage",
    companyUrl: "https://careers.twitter.com/"
  },
  {
    cat: "Tech",
    name: "Adobe",
    value: 313,
    icon: "./img/adobe.png",
    desc: "",
    link: "Apply Now",
    linkUrl: "https://www.adobe.com/careers.html",
    company: "Company Homepage",
    companyUrl: "https://careers.adobe.com/"
  },

];

module.exports = data;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legend */ "./src/legend.js");
/* harmony import */ var _legend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animate */ "./src/animate.js");
/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_animate__WEBPACK_IMPORTED_MODULE_2__);




function Jobubbles() {
    let svg = d3.select("svg");
    let width = document.body.clientWidth; // get width in pixels
    let height = +svg.attr("height");
    let centerX = width * 0.55;
    let centerY = height * 0.5;
    let focusedNode;

    // let format = d3.format(",d");

    // let scaleColor = d3.scaleOrdinal(d3.schemeCategory10);
    let scaleColor = d3.scaleOrdinal([`#789c6e`, `#4c5f72`, `#1e3349`, `#a64960`, `#29586c`, `#1d456d`, `#85888b`, `#a9845c`, `#89c7d6`]) //`#6d6e41`

    // use the force
    let simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody()) //attract force
        .force("collide", d3.forceCollide(d => d.r)) //collide force
        .force("x", d3.forceX(centerX))
        .force("y", d3.forceY(centerY));

    // reduce number of circles on mobile screen due to slow computation
    // if (
    //   "matchMedia" in window &&
    //   window.matchMedia("(max-device-width: 767px)").matches
    // ) {
    //   data = data.filter(el => {
    //     return el.value >= 50;
    //   });
    // }

    // use pack to calculate radius of the circle
    let pack = d3.pack().size([width, height]).padding(2);
    let root = d3.hierarchy({ children: _data__WEBPACK_IMPORTED_MODULE_0___default.a }).sum(d => d.value);

    // use pack() to automatically calculate radius conveniently only
    // and get only the leaves
    let nodes = pack(root)
        .descendants() //.leaves() this gives nodes with no children
        .filter(function (d) {
            return d.depth === 1; // d.depth >= 1 to include children
        })
        .map(node => {
            const data = node.data;
            return {
                x: centerX + (node.x - centerX) * 3,
                // magnify start position to have transition to center movement
                y: centerY + (node.y - centerY) * 3,
                r: 0, // for tweening
                radius: node.r, //original radius
                id: data.cat + "." + data.name.replace(/\s/g, "-"),
                cat: data.cat,
                name: data.name,
                value: data.value,
                icon: data.icon,
                desc: data.desc,
                link: data.link,
                linkUrl: data.linkUrl,
                company: data.company,
                companyUrl: data.companyUrl
            };
        });

    simulation.nodes(nodes).on("tick", ticked);

    // svg.style("background-color", "transparent");

    let node = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(
            d3
                .drag()
                .on("start", d => {
                    if (!d3.event.active) simulation.alphaTarget(0.2).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", d => {
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                })
                .on("end", d => {
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                })
        );

    node
        .append("circle")
        .attr("id", d => d.id)
        .attr("r", 0)
        .style("fill", d => scaleColor(d.cat)) //color by category
        .style("opacity", 0.7)
        .transition()
        .duration(300)
        // .ease(d3.easeElasticOut)
        .tween("circleIn", d => {
            let i = d3.interpolateNumber(0, d.radius);
            return t => {
                d.r = i(t);
                simulation.force("collide", d3.forceCollide(d => d.r));
                //collision force treats nodes as circles with a given radius, rather than points
            };
        });

    node
        .append("clipPath")
        .attr("id", d => `clip-${d.id}`)
        .append("use")
        .attr("xlink:href", d => `#${d.id}`);



    // --------------------------------------------------------------------------------
    // display text as circle icon
    node
        .filter(d => !String(d.name))
        .append("text")
        .classed("node-icon", true)
        .attr("clip-path", d => `url(#clip-${d.id})`)
        .selectAll("tspan")
        .data(d => d.icon.split(";"))
        .enter()
    // .append("tspan")
    // .attr("x", 0)
    // .attr("y", (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
    // .text(name => name);


    // --------------------------------------------------------------------------------
    // display image as circle icon
    node
        .filter(d => String(d.name))
        .append("image")
        .classed("node-icon", true)
        .attr("clip-path", d => `url(#clip-${d.id})`)
        .attr("xlink:href", d => d.icon)
        .attr("x", d => -d.radius * 0.7)
        .attr("y", d => -d.radius * 0.7)
        .attr("height", d => d.radius * 2 * 0.7)
        .attr("width", d => d.radius * 2 * 0.7);

    // node
    //   .append("title")
    //   .text(d => d.cat + "::" + d.name + "\n" + format(d.value));

    // --------------------------------------------------------------------------------

    // another file
    _legend__WEBPACK_IMPORTED_MODULE_1___default()(scaleColor, svg);


    // --------------------------------------------------------------------------------

    let infoBox = node
        .append("foreignObject")
        .classed("circle-overlay hidden", true)
        .attr("x", -550 * 0.5 * 0.8) // location inside the circle
        .attr("y", -200 * 0.5 * 0.8)
        .attr("height", 350 * 0.8) // inner part
        .attr("width", 550 * 0.8) // inner part
        .append("xhtml:div")
        .classed("circle-overlay__inner", true);

    infoBox
        .append("h2")
        .classed("circle-overlay__title", true)
        .text(d => d.name);

    infoBox
        .append("p")
        .classed("circle-overlay__body", true)
        .html(d => d.value + ` openings`);

    infoBox
        .append("a")
        .classed("circle-overlay__bottom", true)
        .html(d => d.link)
        .attr('href', d => d.linkUrl)
        .attr("target", "_blank"); //open a new window for the link

    infoBox
        .append("a")
        .classed("circle-overlay__bottom2", true)
        .html(d => d.company)
        .attr('href', d => d.companyUrl)
        .attr("target", "_blank");

    // --------------------------------------------------------------------------------

    // another file
    _animate__WEBPACK_IMPORTED_MODULE_2___default()(node, focusedNode, simulation, centerX, centerY);


    // --------------------------------------------------------------------------------


    function ticked() {
        node
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .select("circle")
            .attr("r", d => d.r);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    Jobubbles();


    // modal
    let modalBtn = document.getElementById("top-left");
    let modal = document.querySelector(".modal");

    modalBtn.onclick = function () {
        modal.style.display = "block";
    };
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    };
    modal.style.display = "block";

})

// Jobubbles();


// for separating legend company names 
// for giving each g index number

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll(".legendCells > g").forEach((el, idx) => {
//     el.setAttribute('id', idx);
//   });
// })


/***/ }),

/***/ "./src/legend.js":
/*!***********************!*\
  !*** ./src/legend.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Legend(scaleColor, svg) {
    
    // --------------------------------------------------------------------------------
    // company categories

    let legendOrdinal = d3
        .legendColor()
        .scale(scaleColor)
        .shape("circle");
    
    
    let legend = svg
        .append("g")
        .classed("legend-color", true)
        .attr("text-anchor", "start")
        .attr("transform", "translate(100, 100)") //left num = x axis, right num = y axis
        .style("font-size", "20px")
        .call(legendOrdinal);
    
    
    // --------------------------------------------------------------------------------
    // less openings, more openings
    
    let sizeScale = d3
        .scaleOrdinal()
        .domain(["More openings", "Less openings"])
        .range([20, 10]);
    
    let legendSize = d3
        .legendSize()
        .scale(sizeScale)
        .shape("circle")
        .labelAlign("end");
    
    let legend2 = svg
        .append("g")
        .classed("legend-size", true)
        .attr("text-anchor", "start")
        .attr("transform", "translate(100, 400)") //left num = x axis, right num = y axis
        .style("font-size", "20px")
        .call(legendSize);
}

module.exports = Legend;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map