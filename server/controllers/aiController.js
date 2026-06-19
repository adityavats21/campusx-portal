const { OpenAI } = require('openai');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.summarizePdf = async (req, res) => {
  try {
    let text = req.body.text;

    if (req.file) {
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Only PDF files can be summarized' });
      }

      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    }

    if (!text) {
      return res.status(400).json({ message: 'No readable text found for summarization' });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You summarize student resources into crisp bullet points with key topics, formulas, and exam-relevant takeaways.'
        },
        {
          role: 'user',
          content: `Summarize the following text:\n\n${text.slice(0, 12000)}`
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
