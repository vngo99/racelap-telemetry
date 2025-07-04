import openai
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


def generate_summary(filepath):
    df = pd.read_csv(filepath)
    max_speed = df["speed"].max()
    avg_rpm = df["rpm"].mean()

    prompt = f"""
You're a motorsport driving coach. Analyze this lap:

Max Speed: {max_speed:.1f} km/h
Avg RPM: {avg_rpm:.0f}
Throttle Range: {df['throttle'].min()} - {df['throttle'].max()}
Brake Usage: {df['brake'].sum()}

Give a 2-sentence summary and 2 tips to improve lap time.
"""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return {
        "summary": response.choices[0].message["content"]
    }
