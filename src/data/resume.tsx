import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FileUser, Terminal } from "lucide-react";

export const DATA = {
  name: "Savio Ng",
  initials: "SN",
  url: "https://saviong.github.io",
  location: "London, UK",
  locationLink: "http://googleusercontent.com/maps/google.com/1",
  description:
    "",
  summary:
    `My love for technology started long before I ever had a formal job. Growing up in Hong Kong, I was the kid who enjoyed creating simple web games in PHP and CGI just for fun. Building things, solving puzzles, and experimenting with ideas has always been part of who I am.

I originally studied Chemistry at university in Hong Kong, but everything changed during an exchange semester at TUM in Germany. That experience wasn’t only about academics. I discovered new perspectives through the culture, the food, and even the beer. Traveling and meeting people from different backgrounds opened my mind and shaped how I approach challenges today.

When I entered the professional world, I naturally looked for ways to improve processes. I started automating tasks with VBA and later built workflows in Power Automate that saved my team hours of repetitive work. That was my turning point. I realized my passion was in using technology to simplify life and make things more efficient. Since then, I have focused on Cloud and DevOps, moving away from the lab bench and into building scalable infrastructure with tools like Terraform and Bicep.

I am a fast learner who continually explores new IT technologies. I dedicated two months to self-learning cloud computing and earned the AZ-104 certification on June 25. Afterwards, I expanded my skills by studying programming (with a focus on Python) and Terraform, achieving my Terraform Associate certification within a month.

Outside of tech, I enjoy bringing ideas to life with my 3D printer, whether it is a useful gadget or a custom design. Music is also a big part of my life. I play piano, keyboard, and guitar, which helps me relax and express creativity in a different way. I also enjoy hiking and camping, something that grew from weekends outdoors in Hong Kong. On quieter days, I like gaming on my Xbox, Switch, or even revisiting some retro classics. Cooking is another way I unwind and explore creativity.`,
  avatarUrl: "/me.png",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "https://mycv.saviong.com", icon: FileUser, label: "Resume" },
    { href: "/python", icon: Terminal, label: "Python" },
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
        `
**Senior Business Development Officer**
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
      issuer: "HashiCorp",
      href: "https://www.credly.com/badges/4d07a91e-a75c-4353-bfe3-05b5ba491058/public_url",
      title: "HashiCorp Certified: Terraform Associate (003)",
      logoUrl: "https://saviongresume.blob.core.windows.net/$web/pic/tf003.png",
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
      logoUrl: "https://camo.githubusercontent.com/b97eaa6d1a4edc127545803f08dc9315e7e6132960e6fadc28f7d024161a97ee/68747470733a2f2f61746c61737369616e2e67616c6c65727963646e2e76736173736574732e696f2f657874656e73696f6e732f61746c61737369616e2f61746c6173636f64652f312e342e302f313535383132333132313437352f4d6963726f736f66742e56697375616c53747564696f2e53657276696365732e49636f6e732e44656661756c74",
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
      start: "2012",
      end: "2012",
    },
  ],
  projects: [
    {
      title: "Python Playground",
      href: "/python",
      dates: "Dec 2025",
      active: true,
      description:
        "A secure, browser-based Python execution environment using WebAssembly (Pyodide). Visitors can upload and run .py scripts directly in the browser.",
      technologies: [
        "Next.js",
        "TypeScript",
        "WebAssembly",
        "Pyodide",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Try it",
          href: "/python",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Cheminformatics ML App with Docker",
      href: "https://github.com/saviong/molecular-property-predictor",
      dates: "Aug 2025",
      active: true,
      description:
        `Built a full-stack cheminformatics Python app with a Scikit-learn model and containerized the entire ML pipeline using Docker to create a reproducible, portable prediction tool.`,
      technologies: [
        "Python",
        "Scikit-learn",
        "Docker",
        "Streamlit",
        "RDKit",
        "Machine Learning",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/saviong/molecular-property-predictor",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/mpp-1.PNG",
      video: "",
    },
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
