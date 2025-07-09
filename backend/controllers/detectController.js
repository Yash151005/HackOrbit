const path = require('path');
const { spawn } = require('child_process');

exports.detectDamage = (req, res) => {
  try {
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const scriptPath = path.join(__dirname, '..', 'ml_model', 'detect_custom.py');
    const weightsPath = path.join(__dirname, '..', 'ml_model', 'weights', 'best.pt');

    const python = spawn('python', [
  'ml_model/detect_custom.py',
  '--weights', 'ml_model/weights/best.pt',
  imagePath
]);

    let result = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Python script failed with exit code: ${code}`);
        return res.status(500).json({ message: 'Failed to detect damage' });
      }

      try {
        const { parts } = JSON.parse(result);
        res.json({ parts });
      } catch (err) {
        console.error('Failed to parse YOLO output:', err);
        res.status(500).json({ message: 'Failed to parse detection result' });
      }
    });
  } catch (error) {
    console.error('Detection controller error:', error);
    res.status(500).json({ message: 'Detection failed' });
  }
};
