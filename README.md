<<<<<<< HEAD
# 🌾 HarvestHive - Farmer Marketplace

A modern React-based marketplace connecting farmers with buyers. Post products, browse listings, communicate via real-time chat, and access weather forecasting for agricultural planning.

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure Firebase authentication with role-based access
- 📦 **Product Management** - Post products with images (Supabase storage), descriptions, prices in UGX
- 🔍 **Product Browsing** - Search, filter by category, view ratings and reviews
- 💬 **Real-time Chat** - Direct messaging with auto-quoting of products
- ⭐ **Product Ratings** - 5-star rating system with comments
- 🗺️ **Location Mapping** - Interactive location selection with OpenStreetMap

### Advanced Features
- 🌤️ **Weather Forecast** - 30-day weather predictions with agricultural insights
- 📊 **Analytics Dashboard** - Product views, sales tracking, and performance metrics
- 👤 **User Profiles** - Manage personal information and account settings
- 📱 **Responsive Design** - Mobile-first approach with custom green theme

## 🛠️ Technology Stack

- **Frontend** - React 18, React Router v6
- **Database** - Firebase Firestore
- **Authentication** - Firebase Auth
- **Storage** - Supabase (product images)
- **Weather API** - Tomorrow.io
- **Charts** - Recharts
- **Icons** - React Icons
- **Styling** - Custom CSS with CSS Variables

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Firebase account
- Supabase account
- Tomorrow.io API key (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/harvesthive.git
cd harvesthive

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Weather API
REACT_APP_WEATHER_API_KEY=your_tomorrow_io_api_key
```

### Firebase Configuration

Update `src/firebase.js` with your Firebase config:
=======
HarvestHive Terms and Conditions of Use
Effective Date: [11th Oct, 2025]

IMPORTANT NOTICE: These Terms and Conditions ("Terms") constitute a legally binding agreement between MUGABI JEREMIAH ("HarvestHive," "we," "us," or "our") and you ("User" or "you") concerning your access to and use of the HarvestHive mobile application and website (collectively, the "Platform"). By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by all of these Terms. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS, YOU ARE EXPRESSLY PROHIBITED FROM USING THE PLATFORM AND MUST DISCONTINUE USE IMMEDIATELY.

1. HarvestHive Platform Role and Disclaimer
1.1. Role as Facilitator. HarvestHive operates solely as a marketplace and technological platform to facilitate connections between independent farmers ("Sellers") and buyers ("Buyers"). HarvestHive is not a party to any transaction, sale, purchase, or agreement between Users.
1.2. No Guarantee of Goods. We make no guarantees, warranties, or representations regarding the quality, safety, legality, delivery, or authenticity of any products advertised or sold by Sellers, nor the financial ability of Buyers to pay for products. Users bear sole responsibility for verifying the integrity of their transaction partners.

2. User Accounts and Data Responsibility
2.1. Registration and Eligibility. To use the Platform, you must register for an account and provide accurate and current information. You must be at least 18 years of age (or the age of majority in your jurisdiction) to use HarvestHive.
2.2. Account Security (Including Firebase). You are solely responsible for maintaining the confidentiality of your password and account credentials. HarvestHive uses industry-standard third-party services, including Firebase, for user authentication and data storage. While we take commercially reasonable steps to secure data, you acknowledge that no system is 100% impervious to breaches. You agree to hold HarvestHive harmless for any unauthorized access to or misuse of your personal data unless such breach is due to our gross negligence.
2.3. User Responsibility. You must immediately notify HarvestHive of any unauthorized use of your account or any other breach of security. HarvestHive will not be liable for any loss or damage arising from your failure to comply with this section.

3. Intellectual Property Rights
3.1. Our Content. All intellectual property rights in the Platform, including code, design, text, graphics, and underlying software (including the structure of the Firebase database schema used for the Platform), are owned by or licensed to HarvestHive.
3.2. User Content. You grant HarvestHive a worldwide, royalty-free, perpetual, irrevocable, and transferable license to use, reproduce, distribute, and display the content you upload (listings, descriptions, images) solely for the purpose of operating and promoting the Platform.

4. Prohibited Activities
You may not access or use the Platform for any purpose other than that for which we make the Platform available. Prohibited activities include, but are not limited to:
a. Uploading or transmitting viruses, Trojan horses, or any other malicious code.
b. Attempting to circumvent or disable any security features, including the login and authentication mechanisms provided by Firebase.
c. Engaging in any data mining, scraping, or harvesting of personal information, including the login details or unique user identifiers of other Users.
d. Harassing, abusing, or harming another person through the Platform.

5. Indemnification (Critical Liability Protection)
You agree to defend, indemnify, and hold HarvestHive and its affiliates, directors, agents, and employees harmless from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of:
a. Your use of the Platform.
b. Your breach of these Terms.
c. Your violation of any applicable law or the rights of a third party, including intellectual property rights.
d. Any data breach, security compromise, or loss of login credentials caused by your negligence or failure to secure your account.

6. Limitation of Liability (Critical Liability Protection)
IN NO EVENT WILL HARVESTHIVE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA (INCLUDING DATA STORED ON FIREBASE), OR OTHER DAMAGES ARISING FROM YOUR USE OF THE PLATFORM, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, HARVESTHIVE’S LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO HARVESTHIVE DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR $100.00 USD.
>>>>>>> d586b1d (Update README.md)

7. Governing Law and Dispute Resolution
These Terms and your use of the Platform are governed by and construed in accordance with the laws of Uganda Law Society, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Uganda, Kampala.

<<<<<<< HEAD
### Run the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
harvesthive/
├── public/
│   ├── harvesthive-logo.png
│   └── hero video.mp4
├── src/
│   ├── components/
│   │   ├── ChatList.js
│   │   ├── DashboardLayout.js
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   └── ProductCard.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── UserProfileContext.js
│   ├── pages/
│   │   ├── Analytics.js
│   │   ├── Chat.js
│   │   ├── Foreshadow.js      # Weather forecast
│   │   ├── Home.js             # Dashboard
│   │   ├── Landing.js          # Landing page
│   │   ├── Login.js
│   │   ├── PostProduct.js
│   │   ├── Products.js
│   │   ├── Profile.js
│   │   └── Register.js
│   ├── firebase.js
│   ├── supabaseClient.js
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```

## 🎯 How to Use

### For Farmers
1. **Sign Up** - Create an account
2. **Post Products** - Add product images, details, location on map
3. **Set Prices** - Price in UGX (Ugandan Shillings)
4. **Track Analytics** - View product performance
5. **Chat with Buyers** - Respond to inquiries
6. **Check Weather** - Plan activities with 30-day forecasts

### For Buyers
1. **Browse Products** - Search and filter by category
2. **View Details** - See ratings, reviews, location
3. **Contact Sellers** - Auto-quoted product information
4. **Rate Products** - Leave reviews with star ratings
5. **Track Conversations** - Manage all chats in one place

## 🎨 Design System

Custom green agricultural theme:

- **Primary**: `#22C55E` (Green)
- **Secondary**: `#15803D` (Dark Green)
- **Accent**: `#16A34A` (Medium Green)
- **Typography**: Poppins, Inter
- **Custom Scrollbars**: Green gradient theme

## 📜 Available Scripts

```bash
npm start          # Development server (localhost:3000)
npm test           # Run tests
npm run build      # Production build
```

## 🤝 Contributing

Created by **Mugabi Jeremiah** and **Kavuma Hakim** 

Contributions welcome! Fork the repo, make changes, and submit a pull request.
=======
8. Modifications and Interruptions
HarvestHive reserves the right to change, modify, or remove the contents of the Platform at any time or for any reason at our sole discretion without notice. We cannot guarantee the Platform will be available at all times. We may experience hardware, software, or other issues or need to perform maintenance related to the Platform or our third-party services (like Firebase), resulting in interruptions, delays, or errors.

9. Contact Information
If you have questions or comments about these Terms, please contact us at:

NOVUS INC
UGANDA
jeremiahmugabi95@gmail.com
>>>>>>> d586b1d (Update README.md)
