# Restaurant Discovery App

> A modern React Native application for discoering Restaurant

## Table of Contents

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## General Information

- This project is a **restaurant discovery app** built with **React Native (Expo)**.
- It provides users with a way to browse, search, and filter restaurant listings by name, cuisine, price range, rating and delivery time
- Includes **dark/light theme switching** for accessibility and better user experience.
- Designed with **scalable architecture**, **state management**, and **mock API simulation** for rapid prototyping and testing.

---

## Technologies Used

- **React Native (Expo SDK 54)**
- **TypeScript**
- **Zustand** – global state management
- **Tanstack Query** – server state management & API fetching
- **React Native Community Slider**
- **React Native Reanimated & Bottom Sheet**
- **TailwindCSS (NativeWind)**

---

## Features

- 🌗 **Dark/Light Mode Toggle** – managed globally via Zustand.
- 🍽️ **Restaurant Listings** – mock data generation with local images.
- 🔍 **Search and Filter** – by name, price range, and category.
- 🎚️ **Dynamic Price Slider** – real-time updates for filter range.
- 💾 **API-Ready Integration** – easy to switch to live API using Tanstack Query.
- 📱 **Responsive UI** – optimized for both iOS and Android.
- 💬 **Keyboard-Aware Filter Sheet** – automatically adjusts height when typing.

---

## Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (>=20)
- Expo CLI (`npm install -g expo-cli`)
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jubrilake/restaurant_discovery.git
cd restaurant-discovery-app
npm install
```
