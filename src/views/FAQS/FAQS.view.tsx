import React from 'react'
import { useState } from 'react';

const faqs = [
    {
      question: 'How do I get started with ZenDo?',
      answer: 'To get started with ZenDo, simply sign up using your email or social media account. Once registered, you can set up your profile, explore task management tools, and start tracking your productivity and emotions.'
    },
    {
      question: 'What unique features does ZenDo offer?',
      answer: 'ZenDo provides an all-in-one solution for productivity and mindfulness. Key features include task management, emotion tracking, a customizable Pomodoro timer, productivity insights, and a premium subscription with advanced analytics and focus-enhancing tools.'
    },
    {
      question: 'Is my data safe on ZenDo?',
      answer: 'Yes, we take data security seriously. ZenDo uses end-to-end encryption, secure cloud storage, and regular security audits to protect your information. We do not sell or share your data with third parties without your consent.'
    },
    {
      question: 'Can I edit or delete my personal information on ZenDo?',
      answer: 'Absolutely! You can update or remove your personal details in the settings menu under the privacy section. If you wish to delete your account permanently, you can request data deletion from our support team.'
    },
    {
      question: 'Does ZenDo cost anything?',
      answer: 'ZenDo offers both free and premium plans. The free plan includes basic task management and emotion tracking features, while the premium plan unlocks advanced analytics, custom themes, priority support, and additional productivity tools.'
    },
    {
      question: 'Can I use ZenDo on multiple devices?',
      answer: 'Yes! ZenDo syncs seamlessly across multiple devices, including smartphones, tablets, and desktops. Your tasks, insights, and progress will always be up-to-date no matter where you access your account from.'
    }
  ];
  
  const FAQS: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    const toggleFAQ = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="faqs-container">
        <h1 className="faqs-title">Frequently Asked Questions</h1>
        <div className="faqs-content">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span className="faq-icon">{openIndex === index ? '-' : '+'}</span> {faq.question}
              </button>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FAQS;