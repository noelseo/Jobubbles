const data = [
  {
    cat: "Financial Services",
    name: "JPMorgan",
    value: 88,
    icon: "../img/jpmorgan.png",
    desc: "See how far your thinking can go.",
    link: "Learn More",
    linkUrl: "https://careers.jpmorgan.com/us/en/home",
    children: [
      {name: "Software Engineer", value: 38},
      {name: "Software Developer", value: 45},
      {name: "Senior Engineer", value: 5}
    ]
  },
  {
    cat: "Education",
    name: "UCSF",
    value: 13,
    icon: "../img/ucsf.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.ucsf.edu/about/working-ucsf",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Education",
    name: "UC Berkeley",
    value: 20,
    icon: "../img/berkeley.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://career.berkeley.edu/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Education",
    name: "UC Davis",
    value: 30,
    icon: "../img/ucdavis.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.ucdavis.edu/jobs/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Google",
    value: 100,
    icon: "../img/google.png",
    desc: 'Software Engineer',
    link: "Learn More",
    linkUrl: "https://careers.google.com/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Salesforce",
    value: 70,
    icon: "../img/salesforce.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.salesforce.com/company/careers/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Biotech",
    name: "Genentech",
    value: 100,
    icon: "../img/genentech.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.gene.com/careers",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Samsung",
    value: 300,
    icon: "../img/samsung.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.samsung.com/us/careers/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Biotech",
    name: "Neuralink",
    value: 40,
    icon: "../img/neuralink.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://jobs.lever.co/neuralink",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Financial Services",
    name: "Capital One",
    value: 110,
    icon: "../img/capitalone.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.capitalonecareers.com/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Education",
    name: "App Academy",
    value: 20,
    icon: "../img/aa.png",
    desc: "Instructor",
    link: "Learn More",
    linkUrl: "https://jobs.lever.co/appacademy/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Microsoft",
    value: 150,
    icon: "../img/microsoft.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://careers.microsoft.com/us/en/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Apple",
    value: 180,
    icon: "../img/apple.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.apple.com/jobs/us/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Retail",
    name: "Nordstrom",
    value: 60,
    icon: "../img/nordstrom.png",
    desc: "Frontend Engineer",
    link: "Learn More",
    linkUrl: "https://careers.nordstrom.com/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Nonprofit",
    name: "Bill & Melinda Gates Foundation",
    value: 250,
    icon: "../img/billgates.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.gatesfoundation.org/careers",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Automotive",
    name: "Tesla",
    value: 65,
    icon: "../img/tesla.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.tesla.com/careers",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Financial Services", 
    name: "American Express",
    value: 80,
    icon: "../img/amex.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://careers.americanexpress.com/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Financial Services",
    name: "Visa",
    value: 45,
    icon: "../img/visa.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://usa.visa.com/careers.html",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Facebook",
    value: 100,
    icon: "../img/fb.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.facebook.com/careers/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Uber",
    value: 100,
    icon: "../img/uber.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.uber.com/us/en/careers/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Tech",
    name: "Airbnb",
    value: 100,
    icon: "../img/airbnb.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://careers.airbnb.com/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  }, 
  {
    cat: "Tech",
    name: "YouTube",
    value: 100,
    icon: "../img/youtube.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.youtube.com/jobs/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  }, 
  {
    cat: "Retail",
    name: "McDonald's",
    value: 50,
    icon: "../img/mcdonalds.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://careers.mcdonalds.com/main/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  }, 
  {
    cat: "Retail",
    name: "Starbucks",
    value: 50,
    icon: "../img/starbucks.png",
    desc: "Software Engineer",
    link: "Learn More",
    linkUrl: "https://www.starbucks.com/careers/",
    children: [
      { name: "Software Engineer", value: 38 },
      { name: "Software Developer", value: 45 },
      { name: "Senior Engineer", value: 5 }
    ]
  }, 
];

module.exports = data;