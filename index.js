require('dotenv').config();
const axios = require('axios');
const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const chalk = require('chalk');
const qs = require('qs');

// Configuration
const TELEGRAM_ID = process.env.TELEGRAM_ID || process.exit(console.error(chalk.red('Telegram ID missing')));
const BOT_TOKEN = process.env.BOT_TOKEN || process.exit(console.error(chalk.red('Bot Token missing')));
const bot = new Telegraf(BOT_TOKEN);
const API_BASE = 'https://arichain.io/api';

// API Client
const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        "Connection": "keep-alive",
        "Accept": "application/json",
        "Accept-Encoding": "gzip",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
});

// API Helper Functions
const apiRequest = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, qs.stringify({
            blockchain: 'testnet',
            lang: 'en',
            device: 'app',
            is_mobile: 'Y',
            ...data
        }));
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const checkAccount = (email) => apiRequest('/wallet/get_list_mobile', { email });
const performCheckIn = (address) => apiRequest('/event/checkin', { address });
const fetchQuiz = (address) => apiRequest('/event/quiz_q', { address });
const submitQuiz = (address, quizId, answerId) => apiRequest('/event/quiz_a', { 
    address, 
    quiz_idx: quizId, 
    answer_idx: answerId 
});

// Data Formatting
const maskEmail = (email) => {
    if (!email.includes('@')) return email;
    const [local, domain] = email.split('@');
    return local.length <= 6 
        ? `${local[0]}***@${domain}`
        : `${local.slice(0, 3)}***${local.slice(-3)}@${domain}`;
};

const maskAddress = (address) => `${address.slice(0, 3)}***${address.slice(-5)}`;

// File Operations
const loadAccounts = async (file = 'accounts.json') => {
    try {
        return JSON.parse(await fs.promises.readFile(file, 'utf-8'));
    } catch (error) {
        console.error('Failed to load accounts:', error);
        return [];
    }
};

// Telegram Integration 
const sendQuizButtons = async (question, options) => {
    try {
        const buttons = Markup.inlineKeyboard(
            options.map(opt => [Markup.button.callback(opt.text, opt.answer)])
        );
        await bot.telegram.sendMessage(TELEGRAM_ID, question, buttons);
        console.log(`Quiz sent to your telegram: ${question}`);
    } catch (error) {
        console.error('Failed to send quiz:', error.response?.description || error.message);
        console.error('Chat ID attempted:', TELEGRAM_ID);
    }
};

// Process Account Data
const processAccount = async (account, quizData = null, answerData = null) => {
    const accountInfo = await checkAccount(account.email);
    if (!accountInfo.success || !accountInfo.data.result?.[0]) return null;

    const wallet = accountInfo.data.result[0];
    const checkIn = await performCheckIn(wallet.account);
    
    let quizStatus = 'Waiting for quiz';
    
    // If answerData exists, submit quiz answer
    if (answerData) {
        const quizResult = await submitQuiz(wallet.account, answerData.quizId, answerData.answerId);
        quizStatus = quizResult.success ? quizResult.data.result.msg : 'Quiz error';
    }
    // If no answer data but quizData exists, use that for status
    else if (quizData) {
        quizStatus = 'Quiz available';
    }

    return {
        email: maskEmail(account.email),
        address: maskAddress(wallet.account),
        token: wallet.balance_type || '-',
        balance: wallet.amount || '-',
        quiz: quizStatus,
        checkIn: checkIn.success && checkIn.data.status !== 'fail' 
            ? 'Checked in' 
            : checkIn.data?.msg || 'Check-in failed',
        wallet: wallet // Return full wallet data for later use
    };
};

// Main Logic
const main = async () => {
    // Your ASCII banner
    const banner = `
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
    `;
    console.log(chalk.cyan(banner));
    
    while (true) {
        try {
            const accounts = await loadAccounts();
            
            // First process all accounts without quiz
            const accountResults = await Promise.all(
                accounts.map(acc => processAccount(acc))
            );
            
            // Filter valid results
            const validResults = accountResults.filter(r => r);
            
            // Only fetch quiz once using the first account
            if (validResults.length > 0) {
                const firstWallet = validResults[0].wallet;
                const quiz = await fetchQuiz(firstWallet.account);
                
                // If quiz is available, send it only once
                if (quiz.success && quiz.data.result) {
                    const options = quiz.data.result.quiz_q.map(q => ({
                        text: q.question,
                        answer: `answer_${quiz.data.result.quiz_idx}_${q.q_idx}`
                    }));
                    
                    await sendQuizButtons(quiz.data.result.quiz_title, options);
                    
                    // Update quiz status for all accounts
                    validResults.forEach(result => {
                        result.quiz = 'Quiz sent to Telegram';
                    });
                }
            }
            
            console.table(validResults);
            console.log(chalk.green('Cycle completed, waiting 24 hours...'));
            
            await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000));
        } catch (error) {
            console.error('Error in main loop:', error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

// Telegram Handler
bot.on('callback_query', async (ctx) => {
    const [_, quizId, answerId] = ctx.callbackQuery.data.split('_');
    const accounts = await loadAccounts();
    
    // Process all accounts with the same answer
    const answerData = { quizId, answerId };
    const results = await Promise.all(
        accounts.map(acc => processAccount(acc, null, answerData))
    );
    
    console.table(results.filter(r => r));
    ctx.reply('Answer submitted for all accounts');
    ctx.answerCbQuery();
});

// Start Application
bot.launch().then(() => console.log('Bot running...'));
main();
