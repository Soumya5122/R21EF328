const express = require('express');
const numbersService = require('../services/numbersService');

const router = express.Router();

router.get('/:numberid', async (req, res) => {
  try {
    const response = await numbersService.getAverageForNumbers(req.params.numberid);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;