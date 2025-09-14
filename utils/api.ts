const API_BASE_URL = "http://54.145.194.96:8000";

export async function sendTransaction(
  gas_price: number,
  gas_fee_cap: number,
  gas_tip_cap: number,
  gas: number,
  value: number,
  tx_type: number,
  nonce: number,
  data_size: number
) {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gas_price,
      gas_fee_cap,
      gas_tip_cap,
      gas,
      value,
      tx_type,
      nonce,
      data_size,
    }),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch news from the backend API
 */
export async function fetchNews() {
  const res = await fetch(`${API_BASE_URL}/crypto-news/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Analyze smart contract from the backend API
 * Accepts either Solidity code or contract address
 */
export async function analyzeSmartContract(
  contract_text: string,
  type: "code" | "address" = "code"
) {
  if (!contract_text || contract_text.trim() === "") {
    throw new Error("Contract text cannot be empty");
  }

  const res = await fetch(`${API_BASE_URL}/audit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contract_text,
      type
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${res.statusText}. Response: ${text}`);
  }

  return res.json();
}