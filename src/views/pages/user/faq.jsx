import React, { useState } from "react";
import { MdOutlineManageAccounts, MdPayment } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { GiSuitcase } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScrollToTop from "../../../components/user/ScrollToTop";

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

  // State: pertanyaan terbuka → simpan key: "sectionIndex-itemIndex"
  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggle = (key) => {
    setOpenQuestion((prev) => (prev === key ? null : key));
  };

  const faqData = [
    {
      icon: <MdOutlineManageAccounts className="text-4xl text-teal" />,
      group: t("faq.account.title"),
      items: [
        { question: t("faq.account.q1"), answer: t("faq.account.a1") },
        { question: t("faq.account.q2"), answer: t("faq.account.a2") },
        { question: t("faq.account.q3"), answer: t("faq.account.a3") },
        { question: t("faq.account.q4"), answer: t("faq.account.a4") },
        { question: t("faq.account.q5"), answer: t("faq.account.a5") },
      ],
    },
    {
      icon: <IoGlobeOutline className="text-4xl text-teal" />,
      group: t("faq.website.title"),
      items: [
        { question: t("faq.website.q1"), answer: t("faq.website.a1") },
        { question: t("faq.website.q2"), answer: t("faq.website.a2") },
        { question: t("faq.website.q3"), answer: t("faq.website.a3") },
        { question: t("faq.website.q4"), answer: t("faq.website.a4") },
      ],
    },
    {
      icon: <MdPayment className="text-4xl text-teal" />,
      group: t("faq.payment.title"),
      items: [
        { question: t("faq.payment.q1"), answer: t("faq.payment.a1") },
        { question: t("faq.payment.q2"), answer: t("faq.payment.a2") },
        { question: t("faq.payment.q3"), answer: t("faq.payment.a3") },
        { question: t("faq.payment.q4"), answer: t("faq.payment.a4") },
        { question: t("faq.payment.q5"), answer: t("faq.payment.a5") },
      ],
    },
    {
      icon: <GiSuitcase className="text-4xl text-teal" />,
      group: t("faq.facilities.title"),
      items: [
        { question: t("faq.facilities.q1"), answer: t("faq.facilities.a1") },
        { question: t("faq.facilities.q2"), answer: t("faq.facilities.a2") },
      ],
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-teal" />,
      group: t("faq.location.title"),
      items: [
        { question: t("faq.location.q1"), answer: t("faq.location.a1") },
        { question: t("faq.location.q2"), answer: t("faq.location.a2") },
        { question: t("faq.location.q3"), answer: t("faq.location.a3") },
      ],
    },
  ];

  return (
    <>
    <ScrollToTop />
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {t("faq.title")}
          </h1>
          <p className="text-md text-gray-600">{t("faq.description")}</p>
        </motion.div>

        <div className="space-y-12">
          {faqData.map((section, sectionIndex) => (
            <motion.div
              key={section.group}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeUp}
              custom={sectionIndex}
              className="p-2"
            >
              <div className="flex items-center gap-4 mb-4">
                {section.icon}
                <h2 className="text-xl font-semibold text-gray-800">
                  {section.group}
                </h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item, idx) => {
                  const key = `${sectionIndex}-${idx}`;
                  const isOpen = openQuestion === key;

                  return (
                    <div
                      key={key}
                      className={`collapse collapse-arrow border-2 border-base-300 rounded-lg ${
                        isOpen ? "collapse-open" : ""
                      }`}
                    >
                      <div
                        className="collapse-title font-medium text-base text-gray-800 cursor-pointer"
                        onClick={() => handleToggle(key)}
                      >
                        {item.question}
                      </div>
                      <div className="collapse-content text-sm text-gray-600">
                        {item.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default FaqSection;
