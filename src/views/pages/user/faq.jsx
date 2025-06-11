import React from "react";
import { MdOutlineManageAccounts, MdPayment } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { GiSuitcase } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const FaqSection = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      icon: <MdOutlineManageAccounts className="text-4xl" />,
      group: t('faq.account.title'),
      items: [
        {
          question: t('faq.account.q1'),
          answer: t('faq.account.a1'),
        },
        {
          question: t('faq.account.q2'),
          answer: t('faq.account.a2'),
        },
        {
          question: t('faq.account.q3'),
          answer: t('faq.account.a3'),
        },
        {
          question: t('faq.account.q4'),
          answer: t('faq.account.a4'),
        },
        {
          question: t('faq.account.q5'),
          answer: t('faq.account.a5'),
        },
      ],
    },
    {
      icon: <IoGlobeOutline className="text-4xl" />,
      group: t('faq.website.title'),
      items: [
        {
          question: t('faq.website.q1'),
          answer: t('faq.website.a1'),
        },
        {
          question: t('faq.website.q2'),
          answer: t('faq.website.a2'),
        },
        {
          question: t('faq.website.q3'),
          answer: t('faq.website.a3'),
        },
        {
          question: t('faq.website.q4'),
          answer: t('faq.website.a4'),
        },
      ],
    },
    {
      icon: <MdPayment className="text-4xl" />,
      group: t('faq.payment.title'),
      items: [
        {
          question: t('faq.payment.q1'),
          answer: t('faq.payment.a1'),
        },
        {
          question: t('faq.payment.q2'),
          answer: t('faq.payment.a2'),
        },
        {
          question: t('faq.payment.q3'),
          answer: t('faq.payment.a3'),
        },
        {
          question: t('faq.payment.q4'),
          answer: t('faq.payment.a4'),
        },
        {
          question: t('faq.payment.q5'),
          answer: t('faq.payment.a5'),
        },
      ],
    },
    {
      icon: <GiSuitcase className="text-4xl" />,
      group: t('faq.facilities.title'),
      items: [
        {
          question: t('faq.facilities.q1'),
          answer: t('faq.facilities.a1'),
        },
        {
          question: t('faq.facilities.q2'),
          answer: t('faq.facilities.a2'),
        },
      ],
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl" />,
      group: t('faq.location.title'),
      items: [
        {
          question: t('faq.location.q1'),
          answer: t('faq.location.a1'),
        },
        {
          question: t('faq.location.q2'),
          answer: t('faq.location.a2'),
        },
        {
          question: t('faq.location.q3'),
          answer: t('faq.location.a3'),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h1>
          <p className="text-lg text-gray-600">
            {t('faq.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqData.map((section, sectionIndex) => (
            <motion.div
              key={section.group}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={sectionIndex}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold ml-3">{section.group}</h2>
                </div>
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {item.question}
                      </h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
