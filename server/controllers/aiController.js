const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.summarizePdf = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'No text provided for summarization' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4'
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that summarizes student resources in bullet points.'
        },
        {
          role: 'user',
          content: `Summarize the following text:\n\n${text}`
        }
      ],
      temperature: 0.5
    });

    const summary = completion.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (err) {
    console.error('Error summarizing:', err);
    res.status(500).json({ message: 'Something went wrong while summarizing' });
  }
};
