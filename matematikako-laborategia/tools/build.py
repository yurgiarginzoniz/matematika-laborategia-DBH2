#!/usr/bin/env python3
from pathlib import Path
import yaml, json

ROOT = Path(__file__).resolve().parents[1]
YAML_DIR = ROOT / "yaml"
OUT = ROOT / "data" / "actividades.js"

items = []
for path in sorted(YAML_DIR.glob("*.yaml")):
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    data["_file"] = path.name
    items.append(data)

payload = "window.LAB_JARDUERAK = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n"
OUT.write_text(payload, encoding="utf-8")
print(f"Generated {OUT.relative_to(ROOT)} with {len(items)} activities")
