const axios = require('axios');

const CACHE_DURATION = 60 * 60 * 3; //3 години

module.exports = async (req, res) => {
  try {
    const response = await axios.get(
      'https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt'
    );

    const text = response.data;

    const lines = text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    const dateLine = lines.find(line =>
      /^[A-Za-z]{3}\s+\d{2}/.test(line)
    );

    const dates = dateLine
      ? dateLine.match(/[A-Za-z]{3}\s+\d{2}/g)
      : [];

    const dataLines = lines.filter(line =>
      /^\d{2}-\d{2}UT/.test(line)
    );

    const rows = dataLines.map(line => {
      const parts = line.split(/\s+/);
      return {
        time: parts[0],
        values: parts.slice(1).map(Number)
      };
    });

    const result = {
      dates,
      rows,
      updatedAt: new Date().toISOString()
    };

    res.setHeader(
      "Cache-Control",
      `s-maxage=${CACHE_DURATION}, stale-while-revalidate`
    );

    res.status(200).json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to fetch Kp forecast'
    });
  }
};

// const axios = require('axios');

// module.exports = async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt'
//     );

//     const text = response.data;

//     const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

//     const dateLine = lines.find(line => /^[A-Za-z]{3}\s+\d{2}/.test(line));
//     const dates = dateLine.match(/[A-Za-z]{3}\s+\d{2}/g);

//     const dataLines = lines.filter(line => /^\d{2}-\d{2}UT/.test(line));

//     const rows = dataLines.map(line => {
//       const parts = line.split(/\s+/);
//       return {
//         time: parts[0],
//         values: parts.slice(1).map(Number)
//       };
//     });

//     res.status(200).json({ dates, rows });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch Kp forecast' });
//   }
// };