module.exports = (req, res) => {
  res.status(200).json({ status: 'ONLINE', engine: 'Pazhamness Vercel Serverless' });
};
