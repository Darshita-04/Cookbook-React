# 🥗 Cookbook - React Edition

A high-performance recipe search engine built with **React 19**, **TypeScript**, and **Vite**. This application features a seamless search experience using the Spoonacular API.


## ✨ Key Features
- **Functional Components & Hooks:** Utilizes `useState` and `useEffect` for state management and API orchestration.
- **React Router:** Smooth navigation between the Home Search and Recipe Detail pages.
- **Type Safety:** Full TypeScript integration for API responses (`Recipe`, `Ingredient`, `Cuisine`).
- **Dynamic Backgrounds:** Custom UI components with dynamic image rendering.

## 🛠️ Tech Stack
- **Library:** React.js
- **Build Tool:** Vite
- **Styling:** Custom CSS
- **API Handling:**  Axios

## 🚀 Quick Start
1. `npm install`
2. Create `.env` and add `VITE_API_KEY=YOUR_API_KEY`
3. `npm run dev`

## 🔗 Live Deployment
[CookBooK](https://cookbook-react-pi.vercel.app/)

## ⚠️ API Usage & Rate Limiting
This project uses the **Spoonacular Free Tier API**, which has a daily limit of **50 points**. 

Please note:
* Each search request and detail fetch consumes points.
* **If the limit is reached:** The application may return a `402 Payment Required` or `429 Too Many Requests` error.
* If the search results or recipe details fail to load in the live demo, it is likely due to the daily API quota being exhausted. The quota resets daily at midnight UTC.