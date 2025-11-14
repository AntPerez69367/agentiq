import React from "react";
import { Link } from "@tanstack/react-router";

const QuickLinkCard = ({ to, title, description, icon }) => (
  <Link to={to}>
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </Link>
);

export default QuickLinkCard;
