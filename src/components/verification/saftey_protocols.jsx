import React, { useEffect, useState } from "react";
import './saftey-protocols.css'; // Optional: Add specific styles for this component

const SafetyProtocols = () => {
  const [safetyData, setSafetyData] = useState(null);

  // Fetch safety protocols from the backend
  useEffect(() => {
    const fetchSafetyProtocols = async () => {
      try {
        const response = await fetch('/api/safetyProtocols'); // Replace with actual API endpoint
        const data = await response.json();
        setSafetyData(data);
      } catch (error) {
        console.error('Error fetching safety protocols:', error);
      }
    };
    fetchSafetyProtocols();
  }, []);

  return (
    <div className="safety-container">
      <h2>Safety Protocols</h2>
      {safetyData ? (
        <ul>
          {safetyData.map((protocol, index) => (
            <li key={index}>{protocol}</li>
          ))}
        </ul>
      ) : (
        <p>Loading safety protocols... the return process. In the same manner, security policies require placement of controls in processes specific to the information system.
        One of the challenges organizations face is the cost of keeping pace with ever-changing technology. This includes the need to update policies at the same time the organization updates technology. Failure to do so could create weaknesses in the system. These weaknesses could make business processes and information vulnerable to loss or theft.
        In the creation of information systems security policies, also called security policies, IS policies, or ISS policies, many factors drive policy requirements. These requirements include organization size, processes, type of information, and laws and regulations. Once an organization creates policies, it will face both technical and human challenges implementing them. The keys to implementing policies are employee acceptance and management enforcement. A policy is worth little or nothing if no one follows it.
        Chapter 1 Topics
        This chapter covers the following topics and concepts:
         • •
        • • •
        • •
        • •
        What information systems security is
        How information assurance plays an important role in securing information
        What governance is
        Why governance is important
        What information systems security policies are and how they differ from standards and procedures
        Where policies fit within an organization’s structure to effectively reduce risk
        Why security policies are important to business operations, and how business changes affect policies
        When information systems security policies are needed
        Why enforcing, and winning acceptance for, security policies is challenging
        Chapter 1 Goals
        When you complete this chapter, you will be able to:
         
           •
        • •
        •
        • •
        Compare and contrast information systems security and information assurance
        Compare and contrast quality control and quality assurance
        Describe information systems security policies and their importance in organizations
        Describe governance and its importance in maintaining compliance with laws
        Explain what policies are and how they fit into an organization Compare and contrast threat, vulnerability, and risk
         What Is Information Systems Security?
        A good definition of information systems security (ISS) is the act of protecting information and the systems that store and process it. This protection is against risks that would lead to unauthorized access, use, disclosure, disruption, modification, or destruction of information. It’s not just the information inside a computer you need to protect. Information needs to be protected in any form. Some examples include print and removable storage such as optical DVD drives. In fact, well-structured security policies ensure protection of information in any location and in any form. Many organizations come up with effective ways of protecting buildings, people, and other physical resources. And most people understand the need to lock their doors at home at night. Yet they may not always have the same instincts or habits when it comes to handling data. And sometimes the rules for dealing with information are unclear.
        Suppose your business knows a person’s name, phone number and e-mail address. How much privacy should that person expect from your business? What are you obligated by law to protect? What’s the right thing to do ethically? These are just some of the questions businesses struggle with daily. Not every employee is an expert in these matters. So organizations create policies and procedures for their employees to follow.
        Sometimes these same organizations fail to properly protect the information they process. Some do not consider information important to their operations. Some believe that security measures designed to protect
         
        buildings and people will protect information. Some just do not want to spend more money. However, protecting information is vital to business operations.
        Information Systems Security Management Life Cycle
        Generally, in any process of importance, you would use some type of life cycle process to reduce errors and make sure all requirements are considered. It is no different for implementing security policies. Information security controls and processes use common approaches that simplify the build, and reduce mistakes. A typical life cycle process breaks up tasks into smaller, more manageable phases. The Information Systems Audit and Control Association (ISACA) developed a widely accepted international best practices framework. This framework, called Control Objectives for Information and related Technology (COBIT), was first released in 1996. The latest version, 5.0, was released in April 2012.</p>
      )}
    </div>
  );
};

export default SafetyProtocols;
