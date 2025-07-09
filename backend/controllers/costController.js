const CarCost = require('../models/CarCost');
const generatePDF = require('../utils/pdfGenerator'); // PDF report utility

exports.estimateCost = async (req, res) => {
  const { carName, carModel, carYear, detectedParts } = req.body;

  try {
    const car = await CarCost.findOne({
      name: carName,
      model: carModel,
      year: parseInt(carYear),
    });

    if (!car) {
      return res.status(404).json({ error: 'Car model not found in database' });
    }

    const costBreakdown = {};
    let totalCost = 0;

    // Calculate part-wise and total cost
    detectedParts.forEach((part) => {
      if (car.parts[part]) {
        const partCost = car.parts[part].replace || car.parts[part].repair;
        costBreakdown[part] = partCost;
        totalCost += partCost;
      } else {
        costBreakdown[part] = 'N/A';
      }
    });

    // Generate PDF report
    const pdfPath = await generatePDF({
      car: { name: carName, model: carModel, year: carYear },
      parts: costBreakdown,
      totalCost,
    });

    // Return response
    res.status(200).json({
      costBreakdown,
      totalCost,
      reportLink: pdfPath, // Relative path to the generated report
    });

  } catch (err) {
    console.error('Error in estimateCost:', err);
    res.status(500).json({ error: 'Error fetching cost estimation' });
  }
};
