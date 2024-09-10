import React, { useEffect, useState } from "react";
import './laws-and-regulations.css'; // Optional: Add specific styles for this component

const LawsAndRegulations = () => {
  const [lawsData, setLawsData] = useState(null);

  // Fetch laws and regulations from the backend
  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await fetch('/api/lawsAndRegulations'); // Replace with actual API endpoint
        const data = await response.json();
        setLawsData(data);
      } catch (error) {
        console.error('Error fetching laws and regulations:', error);
      }
    };
    fetchLaws();
  }, []);

  return (
    <div className="laws-container">
      <h2>Laws & Regulations</h2>
      {lawsData ? (
        <ul>
          {lawsData.map((law, index) => (
            <li key={index}>{law}</li>
          ))}
        </ul>
      ) : (
        <p>Loading laws and regulations...Loading procedure information... Purpose of This Book This book is part of the Information Systems Security & Assurance Series from Jones & Bartlett Learning (www.jblearning.com). Designed for courses and curriculums in IT Security, Cybersecurity, Information Assurance, and Information Systems Security, this series features a comprehensive, consistent treatment of the most current thinking and trends in this critical subject area. These titles deliver fundamental information-security principles packed with real-world applications and examples. Authored by Certified Information Systems Security Professionals (CISSPs), they deliver comprehensive information on all aspects of information security. Reviewed word for word by leading technical experts in the field, these books are not just current, but forward-thinking—putting you in the position to solve the cybersecurity challenges not just of today, but of tomorrow, as well. Implementing IT security policies and related frameworks for an organization can seem like an overwhelming task, given the vast number of issues and considerations. Security Policies and Implementation Issues demystifies this topic, taking you through a logical sequence of discussions about major concepts and issues related to security policy implementation. It is a unique book that offers a comprehensive, end-to-end view of information security policies and frameworks from the raw organizational mechanics of building to the psychology of implementation. This book presents an effective balance between technical knowledge and soft skills, both of which are necessary for understanding the business context and psychology of motivating people and leaders. It also introduces you in clear, simple terms to many different concepts of information security such as governance, regulator mandates, business drivers, legal considerations, and more. If you need to understand how information risk is controlled, or are responsible for oversight of those who do, you will find this book helpful. Part 1 of this book focuses on why private and public sector organizations need an information technology (IT) security framework consisting of documented policies, standards, procedures, and guidelines. As businesses, organizations, and governments change the way they operate and organize their overall information systems security strategy, one of the most critical security controls is documented IT security policies. Part 2 defines the major elements of an IT security policy framework. Many organizations, under recent compliance laws, must now define, document, and implement information security policies, standards, procedures, and guidelines. Many organizations and businesses conduct a risk assessment to determine their current risk exposure within their IT infrastructure. Once these security gaps and threats are identified, design and implementation of more-stringent information security policies are put in place. This can provide an excellent starting point for the creation of an IT security policy framework. Policies are only as effective as the individuals who create them and enforce them within an organization. Part 3 of this book presents how to successfully implement and enforce policies within an organization. Emerging techniques and automation of policy enforcement are also examined. This book is a valuable resource for students, security officers, auditors, and risk leaders who want to understand what a successful implementation of security policies and frameworks looks like. Learning Features The writing style of this book is practical and conversational. Step-by-step examples of information security concepts and procedures are presented throughout the text. Each chapter begins with a statement of learning objectives. Illustrations are used both to clarify the material and to vary the presentation. The text is sprinkled with Notes, Tips, FYIs, Warnings, and sidebars to alert the reader to additional helpful information related to the subject under discussion. Chapter Assessments appear at the end of each chapter, with solutions provided in the back of the book. Chapter summaries are included in the text to provide a rapid review or preview of the material and to help students understand the relative importance of the concepts presented. Audience The material is suitable for undergraduate or graduate computer science majors or information science majors, students at a two-year technical college or community college who have a basic technical background, or readers who have a basic understanding of IT security and want to expand their knowledge. Acknowledgments I would like to thank Jones & Bartlett Learning for the opportunity to write this book and be a part of the Information Systems Security & Assurance Series project. I offer my deep appreciation to Lawrence Goodrich and Ruth Walker, who did an excellent job coordinating this book despite many challenges. Their guidance, patience, and support were instrumental to its success. A special thank you goes to Mike Chapple, whose experience and debate on risk topics was very helpful. His thought-provoking challenges were much appreciated. Thanks also to Mark Merkow and Darril Gibson for contributing content to this book. I would also like to thank the staff and volunteers at ISACA, who dedicate themselves to providing global thought leadership to help define best practices for information audit, security, and risk management. Special thanks to Julia Fullerton who helped facilitate access to ISACA IP material. My gratitude to Gary Dickhart, Customer Advisory Group, who passed on lessons to me over the years on driving for high-quality results and never forgetting about compassionate management. His lessons on teamwork and motivation are insightful. Additional thanks to a myriad of friends and supporters at E&Y and KPMG who offered suggestions and insights. The caliber of these professionals is amazing, and the experiences they freely share extremely valuable. —Rob Johnson About the Author ROB JOHNSON has more than 22 years of experience in information risk, IT audit, privacy, and security management. He has a diverse background that includes hands-on operational experience, as well as providing strategic risk assessment and support to leadership and board-level audiences. He is currently a Senior Vice President at Bank of America in the Global Technology Organization. Johnson has held senior roles in large global companies, large domestic banks, and as product architect for an international software company. Several of the key risk-related roles he has held include Head of Information and Operations Risk Management for ING U.S. Financial Services, Senior Partner at Aegis USA Executive Consulting, First Vice President and IT Senior Audit Director for WAMU, Vice President/CISO for Security Services at First Bank Systems, and Product Owner and Architect for SAP/ERP solutions at Bindview. Johnson lives in the Seattle with his wife and children. He holds a BS in interdisciplinary studies from the University of Houston with a concentration in computer science and mathematics. He is a Certified Information Systems Auditor (CISA), Certified Information Security Manager (CISM), Certified Information Systems Security Professional (CISSP), Certified in Risk and Information Systems Control (CRISC), and Certified in the Governance of Enterprise IT (CGEIT). Rob has served on several international education and standards committees, including as one of 19 former members of the prestigious international C5 Task Force that developed COBIT 5. PART ONE The Need for IT Security Policy Frameworks CHAPTER 1 Information Systems Security Policy Management CHAPTER 2 Business Drivers for Information Security Policies CHAPTER 3 U.S. Compliance Laws and Information Security Policy Requirements CHAPTER 4 Business Challenges Within the Seven Domains of IT Responsibility CHAPTER 5 Information Security Policy Implementation Issues CHAPTER 1 Information Systems Security Policy Management FOR AN ORGANIZATION TO ACHIEVE ITS GOALS, business processes must be reliable, keep costs low, and obey the law. Most organizations use policies and procedures to tell employees what the business wants to achieve and how to perform tasks to get there. This way the business can achieve consistent quality in delivering its products and services. In a perfect world, policies and procedures would always produce the perfect product. This requires employees to follow policies and procedures at all times. However, we do not live in a perfect world. Neither policies nor procedures are always perfect, nor do employees always follow them. Anyone who has cashed a check at a bank understands what a basic procedure looks like. A check-cashing procedure includes checking the person’s identification and the account balance. The bank’s policy states that when a teller follows the check-cashing procedure, and the account has sufficient funds, the teller may give the cash to the account holder. The teller must follow this procedure to protect the customer and the bank from fraud. Business processes are highly dependent on timely information. It’s hard to find an organization that does not rely on technology, whether it sells hamburgers, cashes checks for people, or is building the next-generation airliner. Processes use technology and information to make business decisions, keep food safe, track inventory, and control manufacturing, among other things. The more complex these technologies become, the more vulnerable they become to disruptions. The more people rely on them in their daily lives, the more vulnerable they become when these technologies do not work. You can think of a policy as a business requirement on actions or processes performed by an organization. An example is the requirement to that a customer provide a receipt when returning an item to a retail store for a refund. That may be a simple example, but essentially, it places a control on</p>
      )}
    </div>
  );
};

export default LawsAndRegulations;
