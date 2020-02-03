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
    value: 120,
    icon: "./img/jpmorgan.png",
    desc: "See how far your thinking can go.",
    link: "Apply Now",
    linkUrl: "https://careers.jpmorgan.com/us/en/home",
    children: [
      {name: "Software Engineer", value: 50 },
      {name: "Software Developer", value: 50 },
      {name: "Senior Engineer", value: 20 }
    ]
  },
  {
    cat: "Education",
    name: "UCSF",
    value: 13,
    icon: "./img/ucsf.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.ucsf.edu/about/working-ucsf",
    children: [
      { name: "Software Engineer", value: 3 },
      { name: "Software Developer", value: 1 },
      { name: "Senior Engineer", value: 7 }
    ]
  },
  {
    cat: "Education",
    name: "UC Berkeley",
    value: 30,
    icon: "./img/berkeley.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://career.berkeley.edu/",
    children: [
      { name: "Software Engineer", value: 20 },
      { name: "Software Developer", value: 5 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Education",
    name: "UC Davis",
    value: 30,
    icon: "./img/ucdavis.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.ucdavis.edu/jobs/",
    children: [
      { name: "Software Engineer", value: 10 },
      { name: "Software Developer", value: 10 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Tech",
    name: "Google",
    value: 400,
    icon: "./img/google.png",
    desc: 'Software Engineer',
    link: "Apply Now",
    linkUrl: "https://careers.google.com/",
    children: [
      { name: "Software Engineer", value: 200 },
      { name: "Software Developer", value: 150 },
      { name: "Senior Engineer", value: 50 }
    ]
  },
  {
    cat: "Tech",
    name: "Salesforce",
    value: 300,
    icon: "./img/salesforce.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.salesforce.com/company/careers/",
    children: [
      { name: "Software Engineer", value: 200 },
      { name: "Software Developer", value: 50 },
      { name: "Senior Engineer", value: 50 }
    ]
  },
  {
    cat: "Financial Services",
    name: "Goldman Sachs",
    value: 100,
    icon: "./img/goldman.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.goldmansachs.com/careers/",
    children: [
      { name: "Software Engineer", value: 70 },
      { name: "Software Developer", value: 20 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Tech",
    name: "Samsung",
    value: 300,
    icon: "./img/samsung.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.samsung.com/us/careers/",
    children: [
      { name: "Software Engineer", value: 250 },
      { name: "Software Developer", value: 30 },
      { name: "Senior Engineer", value: 20 }
    ]
  },
  {
    cat: "Biotech",
    name: "Neuralink",
    value: 40,
    icon: "./img/neuralink.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://jobs.lever.co/neuralink",
    children: [
      { name: "Software Engineer", value: 25 },
      { name: "Software Developer", value: 15 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Financial Services",
    name: "Capital One",
    value: 200,
    icon: "./img/capitalone.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.capitalonecareers.com/",
    children: [
      { name: "Software Engineer", value: 170 },
      { name: "Software Developer", value: 20 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Education",
    name: "App Academy",
    value: 20,
    icon: "./img/aa.png",
    desc: "Instructor",
    link: "Apply Now",
    linkUrl: "https://jobs.lever.co/appacademy/",
    children: [
      { name: "Software Engineer", value: 10 },
      { name: "Software Developer", value: 7 },
      { name: "Senior Engineer", value: 3 }
    ]
  },
  {
    cat: "Tech",
    name: "Microsoft",
    value: 150,
    icon: "./img/microsoft.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://careers.microsoft.com/us/en/",
    children: [
      { name: "Software Engineer", value: 100 },
      { name: "Software Developer", value: 35 },
      { name: "Senior Engineer", value: 15 }
    ]
  },
  {
    cat: "Tech",
    name: "Apple",
    value: 500,
    icon: "./img/apple.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.apple.com/jobs/us/",
    children: [
      { name: "Software Engineer", value: 70 },
      { name: "Software Developer", value: 15 },
      { name: "Senior Engineer", value: 15 }
    ]
  },
  {
    cat: "Retail",
    name: "Nordstrom",
    value: 100,
    icon: "./img/nordstrom.png",
    desc: "Frontend Engineer",
    link: "Apply Now",
    linkUrl: "https://careers.nordstrom.com/",
    children: [
      { name: "Software Engineer", value: 50 },
      { name: "Software Developer", value: 48 },
      { name: "Senior Engineer", value: 2 }
    ]
  },
  {
    cat: "Nonprofit",
    name: "Bill & Melinda Gates Foundation",
    value: 200,
    icon: "./img/billgates.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.gatesfoundation.org/careers",
    children: [
      { name: "Software Engineer", value: 150 },
      { name: "Software Developer", value: 35 },
      { name: "Senior Engineer", value: 15 }
    ]
  },
  {
    cat: "Automotive",
    name: "Tesla",
    value: 65,
    icon: "./img/tesla.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.tesla.com/careers",
    children: [
      { name: "Software Engineer", value: 30 },
      { name: "Software Developer", value: 25 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Financial Services", 
    name: "American Express",
    value: 80,
    icon: "./img/amex.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://careers.americanexpress.com/",
    children: [
      { name: "Software Engineer", value: 30 },
      { name: "Software Developer", value: 40 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Financial Services",
    name: "Visa",
    value: 45,
    icon: "./img/visa.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://usa.visa.com/careers.html",
    children: [
      { name: "Software Engineer", value: 10 },
      { name: "Software Developer", value: 25 },
      { name: "Senior Engineer", value: 10 }
    ]
  },
  {
    cat: "Tech",
    name: "Facebook",
    value: 100,
    icon: "./img/fb.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.facebook.com/careers/",
    children: [
      { name: "Software Engineer", value: 30 },
      { name: "Software Developer", value: 55 },
      { name: "Senior Engineer", value: 15 }
    ]
  },
  {
    cat: "Tech",
    name: "Uber",
    value: 100,
    icon: "./img/uber.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.uber.com/us/en/careers/",
    children: [
      { name: "Software Engineer", value: 20 },
      { name: "Software Developer", value: 65 },
      { name: "Senior Engineer", value: 15 }
    ]
  },
  {
    cat: "Tech",
    name: "Airbnb",
    value: 100,
    icon: "./img/airbnb.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://careers.airbnb.com/",
    children: [
      { name: "Software Engineer", value: 20 },
      { name: "Software Developer", value: 70 },
      { name: "Senior Engineer", value: 10 }
    ]
  }, 
  {
    cat: "Tech",
    name: "YouTube",
    value: 100,
    icon: "./img/youtube.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://www.youtube.com/jobs/",
    children: [
      { name: "Software Engineer", value: 20 },
      { name: "Software Developer", value: 60 },
      { name: "Senior Engineer", value: 20 }
    ]
  }, 
  {
    cat: "Retail",
    name: "McDonald's",
    value: 50,
    icon: "./img/mcdonalds.png",
    desc: "Software Engineer",
    link: "Apply Now",
    linkUrl: "https://careers.mcdonalds.com/main/",
    children: [
      { name: "Software Engineer", value: 10 },
      { name: "Software Developer", value: 30 },
      { name: "Senior Engineer", value: 10 }
    ]
  }, 
  {
    cat: "Retail",
    name: "Starbucks",
    value: 50,
    icon: "./img/starbucks.png",
    desc: "Inspire positive change in the world while you grow in your career and in your community.",
    link: "Apply Now",
    linkUrl: "https://www.starbucks.com/careers/",
    children: [
      { name: "Software Engineer", value: 10 },
      { name: "Software Developer", value: 35 },
      { name: "Senior Engineer", value: 5 }
    ]
  }, 
  {
    cat: "Airlines",
    name: "Southwest",
    value: 70,
    icon: "./img/southwest.png",
    desc: "Share your interests and preferences for a personalized experience.",
    link: "Apply Now",
    linkUrl: "https://careers.southwestair.com/",
    children: [
      { name: "Software Engineer", value: 50 },
      { name: "Software Developer", value: 15 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Aerospace",
    name: "Boeing",
    value: 200,
    icon: "./img/boeing.png",
    desc: "From the seabed to outer space, we are redefining the next generation.",
    link: "Apply Now",
    linkUrl: "https://jobs.boeing.com/",
    children: [
      { name: "Software Engineer", value: 150 },
      { name: "Software Developer", value: 30 },
      { name: "Senior Engineer", value: 20 }
    ]
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
    .filter(function(d) {
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
        children: node.children,
        parent: node.parent
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
    .style("fill", d => scaleColor(d.cat)) // color by category
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
    .attr('href', d => d.linkUrl);

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