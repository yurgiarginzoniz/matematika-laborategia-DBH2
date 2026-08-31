#!/usr/bin/env python3
from pathlib import Path
import yaml, json

ROOT = Path(__file__).resolve().parents[1]
YAML_DIR = ROOT / "yaml"
DATA_DIR = ROOT / "data"
ACTIVITIES_OUT = DATA_DIR / "actividades.js"
SITE_CONFIG_OUT = DATA_DIR / "site-config.js"

DATA_DIR.mkdir(exist_ok=True)

# Jardueren datuak
items = []
for path in sorted(YAML_DIR.glob("*.yaml")):
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if isinstance(data, dict) and "id" in data:
        data["_file"] = path.name
        items.append(data)

ACTIVITIES_OUT.write_text(
    "window.LAB_JARDUERAK = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)

# Instalazioaren konfigurazioa: egilea site.json-etik eta aplikazioaren bertsioa VERSION-etik.
site = {}
site_path = ROOT / "site.json"
if site_path.exists():
    site = json.loads(site_path.read_text(encoding="utf-8"))

version_path = ROOT / "VERSION"
version = version_path.read_text(encoding="utf-8").strip() if version_path.exists() else ""

site_config = {
    "name": site.get("site_name", "Matematikako Laborategia"),
    "author": site.get("author", "Yurgi Arginzoniz"),
    "ai": site.get("ai_assistance", "OpenAI ChatGPT"),
    "license": site.get("license_name", "CC BY-NC-SA 4.0"),
    "licenseUrl": site.get("license_url", "https://creativecommons.org/licenses/by-nc-sa/4.0/"),
    "version": version,
}

SITE_CONFIG_OUT.write_text(
    "window.LAB_SITE_CONFIG = " + json.dumps(site_config, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)

print(f"Generated {ACTIVITIES_OUT.relative_to(ROOT)} with {len(items)} activities")
print(f"Generated {SITE_CONFIG_OUT.relative_to(ROOT)} for app version {version}")
