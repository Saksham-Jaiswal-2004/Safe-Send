from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel
import joblib
import numpy as np
import os
from dotenv import load_dotenv

# Load variables from .env file into environment
load_dotenv()

# Now they’re available via os.environ
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

if not GOOGLE_API_KEY or not TAVILY_API_KEY:
    raise RuntimeError("❌ Missing GOOGLE_API_KEY or TAVILY_API_KEY in .env")

# -----------------------------
# LangChain + Tavily + Gemini
# -----------------------------
from langchain.utilities.tavily_search import TavilySearchAPIWrapper
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_google_genai import ChatGoogleGenerativeAI

# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load Model + Scaler
# -----------------------------
MODEL_PATH = "models/latest_model.joblib"
SCALER_PATH = "models/scaler_y.joblib"

if not (os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH)):
    raise RuntimeError("❌ Model or scaler not found! Please run train.py first.")

model = joblib.load(MODEL_PATH)
scaler_y = joblib.load(SCALER_PATH)
print("✅ Model + Scaler loaded into memory")

# -----------------------------
# Request Schema
# -----------------------------
class TxFeatures(BaseModel):
    gas_price: float
    gas_fee_cap: float
    gas_tip_cap: float
    gas: int
    value: float
    tx_type: int
    nonce: int = 0
    data_size: int = 0

# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def root():
    return {"message": "FastAPI server is running 🚀"}

# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
def predict(features: TxFeatures):
    # one-hot encode tx_type (0–4)
    tx_type_vec = [1 if i == features.tx_type else 0 for i in range(5)]

    # feature array
    X = np.array([[
        features.gas_price,
        features.gas,
        features.gas_tip_cap,
        features.gas_fee_cap,
        features.value,
        features.nonce,
        features.data_size,
        *tx_type_vec
    ]])

    # prediction
    y_pred_scaled = model.predict(X)
    y_pred = scaler_y.inverse_transform(y_pred_scaled.reshape(-1, 1)).flatten()[0]

    return {"predicted_confirmation_time_ms": float(y_pred)}
# -----------------------------
# Crypto Scam News Endpoints
# -----------------------------
llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0.2)
search = TavilySearchAPIWrapper()

template = """
Summarize the following crypto scam news article in short and do not return any other text.

News title:
{title}
URL:
{url}
"""
prompt = PromptTemplate(input_variables=["title", "url"], template=template)
summary_chain = LLMChain(llm=llm, prompt=prompt)

def get_crypto_scam_news():
    results = search.results(
        "recent crypto scams site:coindesk.com OR site:cointelegraph.com OR site:reuters.com OR site:bloomberg.com"
    )
    return [
        {"title": r.get("title", "No Title"), "url": r.get("url", "No URL")}
        for r in results
    ]

@app.get("/crypto-news")
def crypto_news_summary():
    """Return summarized crypto scam news."""
    articles = get_crypto_scam_news()

    results = []
    for article in articles:
        summary = summary_chain.invoke(
            {"title": article["title"], "url": article["url"]}
        )
        # Extract text safely
        summary_text = summary["text"] if isinstance(summary, dict) else str(summary)


        results.append({
            "name": article["title"],
            "URL": article["url"],
            "summary": summary_text.strip()
        })

    return results
    
# -----------------------------
# Smart Contract Audit Endpoint
# -----------------------------

# Pydantic model for request
class ContractRequest(BaseModel):
    api_key: str
    contract_text: str

# Prompt template (same as your logic)
prompt = ChatPromptTemplate.from_template(
    """
    You are a smart contract auditor.
    Given the following smart contract text, perform the following:
    1. Briefly summarize the contract.
    2. Give a reliability score from 0 (most risky) to 5 (most reliable).
    3. Provide justification for the score.
    4. Suggest improvements regarding vulnerabilities.

    Contract:
    {contract_text}

    Output format = JSON:
      "Summary": ...
      "Reliability Score": ...
      "Justification": ...
      "Vulnerabilities": ...
      "Improvements": ...

    Example of smart contract input:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract SimpleStorage {{
      uint256 public storedData;

      function set(uint256 x) public {{
          storedData = x;
      }}

      function get() public view returns (uint256) {{
          return storedData;
      }}
    }}

    Example output:

    {{
      "ContractAnalysis": {{
        "Summary": "This is a simple contract allowing storage and retrieval of a number.",
        "Reliability Score": 5,
        "Justification": "Very basic functionality with minimal risk.",
        "Vulnerabilities": [
          {{
            "Vulnerability": "Lack of Access Control",
            "Description": "Anyone can set storedData."
          }}
        ],
        "Improvements": [
          {{
            "Improvement": "Add access control",
            "Details": "Restrict setter to owner."
          }}
        ]
      }},
      "FunctionAnalysis": [
        {{
          "Name": "storedData",
          "Description": "A public state variable storing an unsigned integer."
        }},
        {{
          "Name": "set",
          "Description": "Public function that updates storedData. Currently open to everyone."
        }},
        {{
          "Name": "get",
          "Description": "Public view function returning storedData."
        }}
      ]
    }}
    """
)

@app.post("/audit")
def audit_contract(request: ContractRequest):
    # Set API key dynamically
    os.environ["GOOGLE_API_KEY"] = request.api_key

    # Initialize Gemini model
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0)

    # Chain setup
    audit_chain = LLMChain(llm=llm, prompt=prompt)

    # Run analysis
    result = audit_chain.run(contract_text=request.contract_text)
    return {"analysis": result}


