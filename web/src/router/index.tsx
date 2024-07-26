import { Route, Routes } from "react-router-dom";
import React from "react";
import { SkilManagement } from "../pages/skill";

export const Router = () => {
  return (
    <Routes>
      <Route path="/skill" element={<SkilManagement />} />
    </Routes>
  );
};
