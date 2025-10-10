
import React, { useState } from "react";
import {
  Briefcase,
  Wallet,
  Mail,
  ShieldCheck,
  ChevronDown,
  Calendar,
  Plane,
  BedDouble,
} from "lucide-react";

const faqData = [
  {
    icon: <Calendar size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "How do I book a tour package or resort?",
    answer:
      'To book, simply go to the package or resort you\'re interested in, click "Book Now" or "Reserve", and follow the on-screen instructions to complete your payment. An account will be created for you if you don\'t have one.',
  },
  {
    icon: <Wallet size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards through our secure payment gateway powered by Stripe. Your payment information is fully encrypted and safe.",
  },
  {
    icon: <Briefcase size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking. Please refer to the cancellation policy mentioned on the specific package or resort page, as policies may vary. Some bookings may be non-refundable or have a cancellation fee.",
  },
  {
    icon: <ShieldCheck size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We prioritize your privacy and security. We use state-of-the-art encryption and security protocols to protect all your personal and payment data.",
  },
  {
    icon: <Plane size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "Are flights included in the tour packages?",
    answer:
      "Flights are typically not included unless specified otherwise. Please check the 'Inclusions' and 'Exclusions' section on the package details page for more information.",
  },
  {
    icon: <BedDouble size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "Can I request special accommodations at a resort?",
    answer:
      "Yes, you can make special requests during the booking process, such as a specific room view or dietary needs. We will do our best to accommodate your requests, but they are not guaranteed.",
  },
  {
    icon: <Mail size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "How can I contact customer support?",
    answer:
      "Our support team is available to help. You can reach us via the contact form on our website, by emailing us at support@yourtravelsite.com, or through live chat during business hours.",
  },
];

const AccordionItem = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className="flex items-center justify-between w-full p-4 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4">
          {item.icon}
          <span className="text-base font-medium text-gray-800 dark:text-gray-200">
            {item.question}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 pl-12">
          <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); 
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-[#12121c] py-12 px-4">
      <div className="mt-6 md:mt-12 w-full max-w-2xl mx-auto">
        <div className="p-4">
          <h1 data-aos="zoom-in" className="text-3xl md:text-4xl text-center font-extrabold text-gray-900 dark:text-white mb-6 md:mb-8">
            Frequently <span className="text-[#4657F0]">Asked Questions</span>
          </h1>
          <div data-aos="zoom-in" className="border border-gray-200 dark:border-gray-700 rounded-lg">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}