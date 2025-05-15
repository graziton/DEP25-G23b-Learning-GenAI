# Generative AI Tutorial Website

This website is designed as a slide‑based tutorial to help beginners understand and use generative AI tools like ChatGPT. It includes interactive navigation and easy‑to‑understand sections.

## Folder Structure

- **index.html** – Main webpage
- **style.css** – Styling for the website
- **script.js** – JavaScript for slide navigation
- **assets/** – Folder for images and additional media


## Prerequisites

OS: Windows/macOS/Linux

Node.js ≥18, npm ≥9

## Setup
a) Clone repo
git clone https://github.com/<user>/DEP25-<TeamID>-<ProjectName>.git
b) Install deps
npm ci
c) Copy env file
cp .env.example .env
Edit .env:
MONGO_URI="your Atlas URI"
EMAIL_USER="you@gmail.com"
EMAIL_PASS="your Gmail App Password"
PORT=4000

## Run Locally
npm start
Open http://localhost:4000
