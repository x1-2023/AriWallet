
https://youtu.be/bEpJphlpbsw?si=i7NwrZ7QKklt20Id

# AriChain Bot

A Node.js-based automation tool for managing AriChain accounts, performing daily check-ins, and handling quiz interactions via Telegram.


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

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
   ```sh
   git clone https://github.com/Crowntec/AriWallet.git
   cd AriWallet
   ```
   
2. **Install Node.js:**
**for Android**
```sh
pkg install nodejs-lts
```
**for computer**
Ensure you have Node.js (v14 or higher) installed. Download it from nodejs.org.

3. **Install Dependencies:**
```sh
npm install
```

## Configuration
1. **Edit .env file**
   ```sh
   nano .env
   ```
   **TELEGRAM_ID:** Your Telegram user ID (get it from @chatIDrobot by sending /start).

**BOT_TOKEN:** Your bot’s token (get it from @BotFather by creating a new bot with /newbot).

2. **Set Up Accounts:**
   Edit accounts.json file in the root directory with your AriChain account details:
   ```sh
   nano accounts.json
   ```


```sh
[
    {"email": "replace it with your actual email address"},
    {"email": "user2@example.com"}
]
```

## Usage

1. **Start the Bot:**
```sh
node index.js
```
The bot will display the banner, start running, and process accounts every 24 hours.

2. **Interact with Telegram:**
Find your bot in Telegram (e.g., @YourBotName).

3. **Send /start to initialize the chat.**
Receive quiz questions and respond using inline buttons.

4. **Monitor Output:**
Check the console for a table of account statuses, balances, and task results.

## Troubleshooting

**Error: "chat not found":**
Ensure TELEGRAM_ID is correct (verify with @userinfobot).

Start the bot in Telegram with /start.

Check BOT_TOKEN validity with @BotFather.


**No Accounts Loaded:**

Verify accounts.json exists and is properly formatted.

API Errors:

Check your internet connection.

Ensure AriChain API endpoints are operational.


**Still Stuck?:**

Open an issue with error logs or ask for help in the repository.


