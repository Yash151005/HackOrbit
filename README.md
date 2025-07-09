# AutoFix AI

AutoFix AI is an intelligent web application that performs **car damage detection** using YOLOv5 and provides **repair cost estimation** using ChatGPT (OpenAI) based on detected damaged parts, car make, model, and year.

----------------------------------------
🚀 Features
----------------------------------------

- 🔍 AI-Powered Damage Detection using YOLOv5
- 💬 ChatGPT-Powered Repair Cost Estimation
- 📤 Upload car image and enter car details
- ⚠️ Real-time alerts for damaged parts
- 📊 Estimated cost breakdown
- 📑 Optional PDF report 

----------------------------------------
📁 Project Structure
----------------------------------------

AutoFix-AI/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── ml_model/
│   │   ├── detect_custom.py
│   │   ├── yolov5/
│   │   └── weights/best.pt
│   └── uploads/
├── frontend/
│   └── src/components/UploadForm.jsx
├── .env
└── README.md

----------------------------------------
🛠 Installation Steps
----------------------------------------

1️⃣ Backend Setup

cd backend
npm install

Install Python requirements:

pip install -r ml_model/yolov5/requirements.txt

Or manually install:

pip install torch torchvision opencv-python

(make sure Python version is 3.8–3.11)

2️⃣ Clone YOLOv5 and Add Weights

cd ml_model
git clone https://github.com/ultralytics/yolov5

Place trained weights here:
ml_model/weights/best.pt

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Backend must run at: http://localhost:5000

----------------------------------------
💻 Run the App
----------------------------------------

1. Start Backend

cd backend
node server.js

2. Start Frontend

cd frontend
npm run dev

Go to: http://localhost:3000

----------------------------------------
📸 How It Works
----------------------------------------

1. Upload car image + details (name, model, year)
2. YOLOv5 detects damaged car parts
3. Detected parts sent to ChatGPT with context
4. GPT returns part-wise and total cost
5. UI shows breakdown + damage summary

----------------------------------------
📡 API Endpoints
----------------------------------------

POST /api/upload      → Upload image, detect damage
POST /api/estimate    → Estimate cost using detected parts

----------------------------------------
🧠 AI Models Used
----------------------------------------

- YOLOv5 (custom trained) for car damage detection
- GPT-4-turbo (or GPT-3.5-turbo) for cost estimation

----------------------------------------
🔐 .env File (backend/.env)
----------------------------------------

PORT=5000
OPENAI_API_KEY=your_openai_key_here
MONGO_URI=your_mongo_connection_string   (optional)

----------------------------------------
🧪 Test the Detection Script
----------------------------------------

python ml_model/detect_custom.py --weights ml_model/weights/best.pt --source backend/uploads/test.jpg

----------------------------------------
🛠 Common Errors and Fixes
----------------------------------------

❌ No module named 'utils.datasets'  
✅ Ensure yolov5 folder is cloned and added to sys.path

❌ FileNotFoundError: best.pt  
✅ Make sure weights are in ml_model/weights/

❌ Failed to parse YOLO output  
✅ Ensure detect_custom.py returns valid JSON using print(json.dumps(...))

❌ UnpicklingError or unsupported global  
✅ Use same torch version used for training or update PyTorch config

----------------------------------------
📄 License

MIT License

----------------------------------------
👨‍💻 Developed By

Team Runtime Terror  
HackOrbit 2025 🚀
