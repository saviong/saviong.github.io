import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FileUser } from "lucide-react";

export const DATA = {
  name: "Savio Ng",
  initials: "SN",
  url: "https://saviong.github.io",
  location: "London, UK",
  locationLink: "http://googleusercontent.com/maps/google.com/1",
  description:
    "A results-driven chemist transitioning into Cloud and DevOps.",
  summary:
    `My fascination with tech started early. Long before I had a formal job, I was the kid in Hong Kong hosting simple web games in PHP and CGI just for the fun of it. That love for building things and solving puzzles has been a constant thread throughout my life.

My official journey began with a Chemistry degree in Hong Kong, but my world really opened up during an exchange semester in Germany at TUM. I fell in love with the culture, the food, and, of course, the beer. That experience, along with my travels, shaped how I see the world and the problems I want to solve.

Back in the professional world, I found myself instinctively looking for ways to improve processes. I started automating administrative tasks with VBA and later built workflows in Power Automate that saved my team hours of manual work every week. That was my lightbulb moment. I realized my true passion was using technology to make life easier and more efficient. This led me down the path of Cloud and DevOps, where I swapped the lab for a command line and dove into building scalable infrastructure with tools like Terraform and Bicep.

When I'm not in front of a screen, you can find me engaged in one of my many hobbies. I enjoy bringing ideas to life with my 3D printer, whether it's a useful gadget or a custom figure. I unwind by playing piano, keyboard, or guitar. Having grown up in Hong Kong, I have a deep love for the outdoors and spent many weekends hiking and camping. I'm also an avid gamer—whether on my Xbox and Switch or firing up some retro classics—and I love to cook.`,
  avatarUrl: "/me.png",
  skills: [
    "Azure",
    "AWS",
    "Terraform",
    "Bicep",
    "CloudFormation",
    "Typescript",
    "Javascript",
    "Next.js",
    "Python",
    "Docker",
    "Kubernetes",
    "Github Actions (CI/CD)",
    "Bash",
    "PowerShell",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "https://mycv.saviong.com", icon: FileUser, label: "Resume" },
  ],
  contact: {
    email: "yeungson@gmail.com",
    tel: "+44-xxxx-xxxx",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/saviong",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/saviong",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:yeungson@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Anthony Nolan",
      href: "https://www.anthonynolan.org/",
      badges: [],
      location: "London, UK",
      title: "Laboratory Asset Coordinator",
      logoUrl: "/anthonynolan.jpg",
      start: "August 2021",
      end: "PRESENT",
      description:
        `- Developed and deployed 5+ workflows using Power Automate to automate repetitive tasks, saving an estimated 10 hours of manual work per week.
- Analysed existing operational workflows, gathered stakeholder requirements, and implemented process improvements that reduced system inefficiencies by 20%.
- Leveraged data analysis to forecast resource needs and optimise procurement cycles, cutting operational costs by 10%.
- Maintained rigorous compliance with ISO industry standards, ensuring 100% adherence through meticulous documentation and quality assurance protocols.
- Coordinated over 500 equipment maintenance schedules annually, minimising downtime by 50% to achieve 99% operational uptime.`,
    },
    {
      company: "MediFast (Hong Kong) Ltd.",
      href: "https://www.medifast.com.hk/en/",
      badges: [],
      location: "Hong Kong",
      title: "Senior Business Development Officer\nBusiness Development Officer",
      logoUrl: "/medifasthk.jpeg",
      start: "September 2017",
      end: "May 2021",
      description:
        `**Senior Business Development Officer**
- Engineered an automation solution using VBA to streamline administrative workflows, eliminating 80% of manual task time.
- Mentored a team of three, improving team productivity by 20% through enhanced training and collaborative processes.
- Utilised data from multiple sources to define customer profiles, improving the effectiveness of marketing strategies by 20%.

**Business Development Officer**
- Analysed multi-source customer data to identify new market opportunities, driving a 20% increase in service adoption.
- Translated complex client requirements into detailed service agreements, converting 85% of high-value corporate leads.
- Coordinated logistics for large-scale service delivery projects, engaging over 500 participants and improving client satisfaction by 20%.`,
    },
    {
      company: "Early Career Experience",
      href: "#",
      badges: [],
      location: "Hong Kong",
      title: "Medical Sales Representative at DKSH\nSales Executive at World Ways Co. (HK) Ltd.\nLaboratory Technician at ASB Biodiesel",
      logoUrl: "https://static.vecteezy.com/system/resources/previews/024/208/012/non_2x/simple-briefcase-icon-the-icon-can-be-used-for-websites-print-templates-presentation-templates-illustrations-etc-free-vector.jpg",
      start: "2013",
      end: "2017",
      description:
        `- Held progressive roles in business development, medical sales, and laboratory quality control, developing foundational skills in data analysis, stakeholder relations, and process documentation.`,
    },
  ],
  certifications: [
    {
      issuer: "Microsoft",
      href: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
      title: "AZ-104 Microsoft Certified: Azure Administrator Associate",
      logoUrl: "https://images.credly.com/size/340x340/images/336eebfc-0ac3-4553-9a67-b402f491f185/azure-administrator-associate-600x600.png",
      year: "",
    },
    {
      issuer: "Scrum.org",
      href: "https://www.scrum.org/professional-scrum-master-i-certification",
      title: "Professional Scrum Master™ I (PSM I)",
      logoUrl: "https://scrumorg-website-prod.s3.amazonaws.com/drupal/inline-images/2022-09/asset_44psmi_0.png",
      year: "",
    },
    {
      issuer: "Atlassian",
      href: "https://university.atlassian.com/student/collection/831206-agile-project-management-professional-certificate",
      title: "Atlassian Agile Project Management Professional Certificate",
      logoUrl: "https://wac-cdn.atlassian.com/dam/jcr:9c4bf443-5045-4ff9-a48d-36ae466f3ced/logos-atlassian-mini-icon-onecolor-blue.svg?cdnVersion=2903",
      year: "",
    },
  ],
  education: [
    {
      school: "Hong Kong University of Science and Technology",
      href: "https://hkust.edu.hk/",
      degree: "BSc (Hons) in Chemistry",
      logoUrl: "/hkust.png",
      start: "2010",
      end: "2013",
    },
    {
      school: "Technische Universität München",
      href: "https://www.tum.de/",
      degree: "Summer Exchange, Nanoscience and Nanotechnology",
      logoUrl: "/tum.svg",
      start: "Jun 2012",
      end: "Jul 2012",
    },
  ],
  projects: [
    {
      title: "Serverless Portfolio with CI/CD on Azure",
      href: "https://github.com/saviong/html-resume-frontend/",
      dates: "Aug 2025",
      active: true,
      description:
        `Deployed a serverless, CI/CD-enabled personal portfolio website on Azure. Implemented a visitor counter using an Azure Function (Python) to write to a Cosmos DB table, triggered via a REST API. Automated infrastructure provisioning and application deployment using ARM templates and a GitHub Actions pipeline.`,
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Azure Storage",
        "Azure Function Apps",
        "Cosmos DB",
        "Azure Front Door",
        "GitHub Actions",
        "ARM Templates",
        "Python",
      ],
      links: [
        {
          type: "Website",
          href: "https://mycv.saviong.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source - Frontend",
          href: "https://github.com/saviong/html-resume-frontend",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source - Backend",
          href: "https://github.com/saviong/html-resume-backend",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Multi-Cloud VM Deployment with Terraform",
      href: "https://github.com/saviong/Terraform-multi-cloud-deployment",
      dates: "Jun 2025",
      active: true,
      description:
        `Authored a single Terraform configuration to provision identical Nginx web servers across both AWS and Azure simultaneously. Reduced manual setup time by 95% and enabled consistent environments for cross-cloud disaster recovery testing.`,
      technologies: [
        "Terraform",
        "AWS EC2",
        "Azure Virtual Machines",
        "Nginx",
        "Bash",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/saviong/terraform-multicloud-vm",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Secure & Reproducible IaC Templates for AWS & Azure",
      href: "https://github.com/saviong/IaC-templates-for-multi-cloud-VM-deployment",
      dates: "Aug 2025",
      active: true,
      description:
        `Developed parameterised templates for deploying hardened Linux VMs, standardizing builds and reducing provisioning errors. Cut VM deployment time from hours to under 10 minutes, facilitating peer review and GitOps workflows.`,
      technologies: [
        "AWS CloudFormation",
        "Azure Bicep",
        "Terraform",
        "AWS SSM",
        "Azure Key Vault",
      ],
      links: [
        {
          type: "Source - AWS",
          href: "https://github.com/saviong/ec2-deploy",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source - Azure",
          href: "https://github.com/saviong/vm-deploy",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  books: [
    {
      theme: "Leadership & Personal Growth",
      books: [
        {
          title: "Way of the Warrior Kid (Series 1-4)",
          author: "Jocko Willink",
          number: 1,
        },
        {
          title: "Atomic Habits",
          author: "James Clear",
          number: 2,
        },
        {
          title: "Leadership Strategy and Tactics: Field Manual",
          author: "Jocko Willink",
          number: 3,
        },
        {
          title: "",
          author: "",
          number: 4,
        },
      ],
    },
    {
      theme: "Science & Technology",
      books: [
        {
          title: "",
          author: "",
          number: 5,
        },

      ],
    },
    {
      theme: "History & Global Affairs",
      books: [
        {
          title: "",
          author: "",
          number: 7,
        },
        {
          title: "",
          author: ".",
          number: 8,
        },
      ],
    },
    {
      theme: "Digital Life & Privacy",
      books: [
        {
          title: "",
          author: "",
          number: 9,
        },
        {
          title: "",
          author: "",
          number: 10,
        },
      ],
    },
    {
      theme: "Memoir & Personal Reflections",
      books: [
        {
          title: "",
          author: "",
          number: 11,
        },
      ],
    },
  ],
} as const;
