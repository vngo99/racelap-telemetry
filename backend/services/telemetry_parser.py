import pandas as pd
def extract_stats(filepath):
    df = pd.read_csv(filepath)

    return {
        "max_speed": float(df["speed"].max()),
        "avg_rpm": float(df["rpm"].mean()),
        "throttle_profile": [float(x) for x in df["throttle"].head(10)],
        "brake_zones": int(df["brake"].sum())
    }
