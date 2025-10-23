import React from "react";
import { createRoot } from "react-dom/client";
import App from "./entries/App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);
