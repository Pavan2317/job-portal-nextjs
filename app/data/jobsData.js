export let jobs = [
  {
    id: "3",
    title: "mern devloper",
    company: "Tata Consultancy Services (TCS)",
    location: "banglore",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹6L - ₹12L",
    category: "Full Stack",
    description: "MERN stack developer role building modern web applications."
  },
  {
    id: "1",
    title: "React Frontend Developer",
    company: "Tata Consultancy Services (TCS)",
    location: "Hyderabad",
    type: "Full-time",
    experience: "1-2 Years",
    salary: "₹6L - ₹10L",
    category: "Frontend Developer",
    description: "Looking for an experienced React developer to build scalable UIs."
  },
  {
    id: "2",
    title: "Software Engineer",
    company: "Google",
    location: "Bangalore",
    type: "Full-time",
    experience: "3-5 Years",
    salary: "₹20L - ₹35L",
    category: "Software Engineer",
    description: "Design and develop large-scale distributed software systems."
  }
];

export function addJob(newJob) {
  const jobWithId = { id: Date.now().toString(), ...newJob };
  jobs.unshift(jobWithId);
  return jobWithId;
}
