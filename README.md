# AriChain Bot
   
A Node.js-based automation tool for managing AriChain accounts, performing daily check-ins, and handling quiz interactions via Telegram.


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
   ```sh
   git clone https://github.com/yourusername/arichain-bot.git
   cd arichain-bot
   ```
