import React from 'react'

const policiesAterms: React.FC = () => {
  return (
    <div className="policies-container">
      <div className="policies-card">
        <h1 className="policies-title">ZENDO’s Terms and Conditions</h1>
        
        <section className="policies-section">
          <h2 className="policies-subtitle">Terms of Service</h2>
          <p>Welcome to ZenDo, a platform designed to help users manage their tasks and emotions more effectively. By using ZenDo, you agree to our terms and conditions, including our guidelines for usage, limitations, and responsibilities.</p>
          <ul className="policies-list">
            <li><strong>Personal Use:</strong> ZenDo is intended for personal, non-commercial use.</li>
            <li><strong>Account Responsibility:</strong> You are responsible for maintaining the security of your account and agree not to share your credentials.</li>
            <li><strong>Prohibited Actions:</strong> Users may not misuse ZenDo in ways that disrupt the experience of others, such as attempting unauthorized access or spreading malicious software.</li>
          </ul>
          <p><strong>Service Modifications:</strong> ZenDo reserves the right to modify or terminate services at any time. We are committed to enhancing our platform, but we may change features or functions to improve user experience.</p>
        </section>

        <section className="policies-section">
          <h2 className="policies-subtitle">Privacy Policy</h2>
          <p>Your privacy is important to us at ZenDo. This policy explains how we collect, use, and protect your information.</p>
          
          <h3 className="policies-subheading">Data Collection</h3>
          <ul className="policies-list">
            <li><strong>Personal Information:</strong> When you create an account, we may collect information like your name, email, and contact details.</li>
            <li><strong>Emotional Data:</strong> ZenDo allows you to log emotions for personal reflection. This data is stored securely and is not shared with third parties.</li>
            <li><strong>Activity Data:</strong> We collect information on tasks and activities you log in the app to improve our recommendations and features.</li>
          </ul>
          
          <h3 className="policies-subheading">Data Usage</h3>
          <p>Information collected is used to provide personalized insights, track progress, and enhance user experience.</p>
          
          <h3 className="policies-subheading">Data Security</h3>
          <ul className="policies-list">
            <li>We take appropriate measures to secure your data, including encryption and regular security audits.</li>
            <li>We encourage users to use strong passwords and keep their devices secure.</li>
            <li>We do not share your personal or emotional data with third parties without your explicit consent, except in cases required by law.</li>
          </ul>
          
          <h3 className="policies-subheading">User Rights</h3>
          <ul className="policies-list">
            <li><strong>Access and Control:</strong> You have the right to access, update, or delete your information at any time.</li>
            <li><strong>Feedback:</strong> ZenDo welcomes user feedback to improve our services.</li>
            <li>For any questions or requests regarding our policies, please contact us at <a href="mailto:contact@zendoapp.com" className="policies-link">contact@zendoapp.com</a>.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default policiesAterms