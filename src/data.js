const data = [
  {
    cat: "Financial Services",
    name: "JPMorgan",
    value: 120,
    icon: "../img/jpmorgan.png",
    desc: "See how far your thinking can go.",
    link: "Learn More",
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
    icon: "../img/ucsf.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/berkeley.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/ucdavis.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/google.png",
    desc: 'Software Engineer',
    link: "Learn More",
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
    icon: "../img/salesforce.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/goldman.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/samsung.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/neuralink.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/capitalone.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/aa.png",
    desc: "Instructor",
    link: "Learn More",
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
    icon: "../img/microsoft.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/apple.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/nordstrom.png",
    desc: "Frontend Engineer",
    link: "Learn More",
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
    icon: "../img/billgates.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/tesla.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/amex.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/visa.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/fb.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/uber.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/airbnb.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/youtube.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/mcdonalds.png",
    desc: "Software Engineer",
    link: "Learn More",
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
    icon: "../img/starbucks.png",
    desc: "Inspire positive change in the world while you grow in your career and in your community.",
    link: "Learn More",
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
    icon: "../img/southwest.png",
    desc: "Share your interests and preferences for a personalized experience.",
    link: "Learn More",
    linkUrl: "https://careers.southwestair.com/",
    children: [
      { name: "Software Engineer", value: 50 },
      { name: "Software Developer", value: 15 },
      { name: "Senior Engineer", value: 5 }
    ]
  },
  {
    cat: "Arms",
    name: "Boeing",
    value: 200,
    icon: "../img/boeing.png",
    desc: "From the seabed to outer space, we are redefining the next generation.",
    link: "Learn More",
    linkUrl: "https://jobs.boeing.com/",
    children: [
      { name: "Software Engineer", value: 150 },
      { name: "Software Developer", value: 30 },
      { name: "Senior Engineer", value: 20 }
    ]
  },
];

module.exports = data;