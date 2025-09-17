  GNU nano 7.2                                                                                    fetch_data.py                                                                                             
import requests
from bs4 import BeautifulSoup
import pandas as pd
from urllib.parse import urljoin
import io, zipfile, os

# Page with CSV listings
BASE_URL = "https://mempool-dumpster.flashbots.net/ethereum/mainnet/2025-09/index.html"
DATA_DIR = "/home/ubuntu/myapp/data"

def fetch_csv():
    os.makedirs(DATA_DIR, exist_ok=True)

    # Step 1: Open index page
    resp = requests.get(BASE_URL)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # Step 2: Find all .csv.zip links
    csv_files = [a["href"] for a in soup.find_all("a", href=True) if a["href"].endswith(".csv.zip")]
    if not csv_files:
        raise Exception("No CSV files found!")

    # Step 3: Pick the most recent file
    target_csv = csv_files[-1]
    csv_url = urljoin(BASE_URL, target_csv)
    print(f"⬇️ Downloading: {csv_url}")

    # Step 4: Download and unzip
    r = requests.get(csv_url)
    r.raise_for_status()
    z = zipfile.ZipFile(io.BytesIO(r.content))
    csv_name = z.namelist()[0]

    df = pd.read_csv(z.open(csv_name))

    # Step 5: Save into data directory
    local_path = os.path.join(DATA_DIR, csv_name)
    df.to_csv(local_path, index=False)
    print(f"✅ CSV saved: {local_path}")

    return df, local_path

if __name__ == "__main__":
    df, path = fetch_csv()
    print(f"CSV loaded from {path}")
    print(df.head())

