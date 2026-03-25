from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import requests
import uvicorn

app = FastAPI()

SYSTEM_BACKEND_URL = "http://localhost:8001/api/webhook"

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AcmeOS Admin Console</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #f8fafc; font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="text-slate-800">

    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <div class="w-64 bg-slate-900 text-white flex flex-col">
            <div class="p-4 border-b border-slate-700 flex items-center space-x-2">
                <div class="w-8 h-8 bg-orange-500 rounded font-bold flex items-center justify-center text-white">A</div>
                <h1 class="font-bold text-lg tracking-tight">AcmeOS</h1>
            </div>
            <div class="p-4 flex-1">
                <ul class="space-y-2 text-sm text-slate-300">
                    <li class="p-2 hover:bg-slate-800 rounded cursor-pointer">Dashboard</li>
                    <li class="p-2 hover:bg-slate-800 rounded cursor-pointer">Users</li>
                    <li class="p-2 bg-orange-500/10 text-orange-400 font-semibold rounded cursor-pointer border-l-2 border-orange-500">Features</li>
                    <li class="p-2 hover:bg-slate-800 rounded cursor-pointer">Settings</li>
                    <li class="p-2 hover:bg-slate-800 rounded cursor-pointer">Webhooks <span class="ml-2 bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded text-[10px] uppercase">Active</span></li>
                </ul>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto">
            <header class="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
                <h2 class="text-xl font-bold">Manage Features</h2>
                <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
            </header>

            <main class="p-8 max-w-4xl">
                <div class="bg-white rounded-xl shadow-md border border-slate-200 p-8">
                    {content}
                </div>
            </main>
        </div>
    </div>
</body>
</html>
"""

FORM_CONTENT = """
<div class="mb-8">
    <h3 class="text-2xl font-bold text-slate-900">Deploy New Feature</h3>
    <p class="text-slate-500 text-sm mt-1">Submit feature details. The active Webhook integration will automatically push this to the LaunchGen AI API.</p>
</div>

<form action="/launch" method="post" class="space-y-5">
    <div>
        <label class="block text-sm font-semibold text-slate-700 mb-1">Feature Name</label>
        <input type="text" name="feature_name" value="Multi-Channel Integrator" required class="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
    </div>
    
    <div>
        <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
        <textarea name="description" rows="3" required class="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none">Connect all your tools seamlessly together in one unified workspace with blazing-fast 0ms latency sync protocols.</textarea>
    </div>
    
    <div class="pt-4 border-t border-slate-200 flex justify-end">
        <button type="submit" class="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition transform active:scale-95 flex items-center space-x-2">
            <span>🚀 Publish to Database & Trigger Webhook</span>
        </button>
    </div>
</form>
"""

@app.get("/", response_class=HTMLResponse)
async def home():
    return HTML_TEMPLATE.replace("{content}", FORM_CONTENT)

@app.post("/launch", response_class=HTMLResponse)
async def launch_feature(feature_name: str = Form(...), description: str = Form(...)):
    payload = {
        "feature_name": feature_name,
        "description": description,
        "source": "acme-product-backend",
        "timestamp": "2026-03-24T12:00:00Z"
    }
    try:
        # Fire the webhook to the AI LaunchPilot system
        response = requests.post(SYSTEM_BACKEND_URL, json=payload, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        success_content = f"""
        <div class="text-center py-6">
            <div class="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-50">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Feature Launched!</h3>
            <p class="text-slate-600 mb-6">The feature was added to the database and the webhook was successfully triggered.</p>
            
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 text-left inline-block max-w-sm w-full mx-auto shadow-inner text-sm text-slate-500">
                <p><strong>System Backend Response:</strong></p>
                <p class="mt-2 font-mono text-xs break-all bg-white border p-2 rounded text-slate-700">{data.get("campaign_id")}</p>
            </div>
            <br/>
            <a href="/" class="text-orange-500 font-semibold hover:text-orange-600 transition">&larr; Return to Feature Manager</a>
        </div>
        """
        return HTML_TEMPLATE.replace("{content}", success_content)
        
    except Exception as e:
        error_content = f"""
        <div class="text-center py-6">
            <div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Webhook Failed</h3>
            <p class="text-slate-600 mb-6">Could not reach the LaunchGen System Backend on port 8001.</p>
            
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left inline-block max-w-sm w-full mx-auto shadow-inner text-sm text-red-800">
                <p class="font-mono text-xs break-words">{str(e)}</p>
            </div>
            <br/>
            <a href="/" class="text-red-500 font-semibold hover:text-red-600 transition">&larr; Try Again</a>
        </div>
        """
        return HTML_TEMPLATE.replace("{content}", error_content)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
