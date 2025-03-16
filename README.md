# AriChain Bot

![Banner](https://via.placeholder.com/800x200.png?text=AriChain+Bot)

A Node.js-based automation tool for managing AriChain accounts, performing daily check-ins, and handling quiz interactions via Telegram.

\`\`\`
   .aMMMb  dMMMMb  .aMMMb  dMP dMP dMP dMMMMb          
  dMP"VMP dMP.dMP dMP"dMP dMP dMP dMP dMP dMP          
 dMP     dMMMMK" dMP dMP dMP dMP dMP dMP dMP           
dMP.aMP dMP"AMF dMP.aMP dMP.dMP.dMP dMP dMP            
VMMMP" dMP dMP  VMMMP"  VMMMPVMMP" dMP dMP             
                                                       
                dMP dMP .aMMMb  .aMMMb  dMP dMP .dMMMb 
               dMP dMP dMP"dMP dMP"VMP dMP.dMP dMP" VP 
              dMMMMMP dMMMMMP dMP     dMMMMK"  VMMMb   
             dMP dMP dMP dMP dMP.aMP dMP"AMF dP .dMP   
            dMP dMP dMP dMP  VMMMP" dMP dMP  VMMMP"
\`\`\`

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview
AriChain Bot is designed to automate interactions with the AriChain platform. It checks account statuses, performs daily check-ins, and manages quiz tasks via Telegram, displaying results in a clean console table. Built with Node.js, it leverages APIs and Telegram’s bot framework for seamless operation.

## Features
- **Account Management**: Monitors multiple AriChain accounts from a JSON file.
- **Daily Check-Ins**: Automatically performs check-ins every 24 hours.
- **Quiz Automation**: Fetches quizzes and submits answers via Telegram buttons.
- **Data Masking**: Protects sensitive information (emails and addresses).
- **Console Output**: Displays results in a tabulated format with colored text.
- **Error Handling**: Retries failed operations and logs issues gracefully.

## Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**:
   \`\`\`bash
   git clone https://github.com/Crowntec/AriWallet.git
   cd AriWallet
   \`\`\`

2. **Install Node.js**:
   Ensure you have Node.js (v14 or higher) installed. Download it from [nodejs.org](https://nodejs.org/).

3. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Required Packages**:
   - \`axios\`
   - \`telegraf\`
   - \`chalk\`
   - \`dotenv\`
   - \`qs\`

   These are installed automatically with \`npm install\`.

## Configuration
1. **Create a \`.env\` File**:
   In the project root, create a \`.env\` file:
   \`\`\`bash
   touch .env
   \`\`\`

2. **Add Environment Variables**:
   Edit \`.env\` with your Telegram credentials:
   \`\`\`
   TELEGRAM_ID=your_telegram_id
   BOT_TOKEN=your_bot_token
   \`\`\`
   - **TELEGRAM_ID**: Your Telegram user ID (get it from \`@userinfobot\` by sending \`/start\`).
   - **BOT_TOKEN**: Your bot’s token (get it from \`@BotFather\` by creating a new bot with \`/newbot\`).

3. **Set Up Accounts**:
   Create an \`accounts.json\` file in the root directory with your AriChain account details:
   \`\`\`json
   [
       {"email": "user1@example.com"},
       {"email": "user2@example.com"}
   ]
   \`\`\`

## Usage
1. **Start the Bot**:
   \`\`\`bash
   node index.js
   \`\`\`
   - The bot will display the banner, start running, and process accounts every 24 hours.

2. **Interact with Telegram**:
   - Find your bot in Telegram (e.g., \`@YourBotName\`).
   - Send \`/start\` to initialize the chat.
   - Receive quiz questions and respond using inline buttons.

3. **Monitor Output**:
   - Check the console for a table of account statuses, balances, and task results.

## Troubleshooting
- **Error: "chat not found"**:
  - Ensure \`TELEGRAM_ID\` is correct (verify with \`@userinfobot\`).
  - Start the bot in Telegram with \`/start\`.
  - Check \`BOT_TOKEN\` validity with \`@BotFather\`.

- **No Accounts Loaded**:
  - Verify \`accounts.json\` exists and is properly formatted.

- **API Errors**:
  - Check your internet connection.
  - Ensure AriChain API endpoints are operational.

- **Still Stuck?**:
  - Open an issue with error logs or ask for help in the repository.
