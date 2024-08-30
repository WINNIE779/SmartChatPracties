import { Route, Routes } from "react-router-dom";
import React from "react";
import { SkilManagement } from "../pages/skill";
import { AddSkillPage } from "../pages/skill/skill-add";
import { LoginPage } from "../pages/login";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/skill" element={<SkilManagement />} />
      <Route path="/skillAdd" element={<AddSkillPage />} />
    </Routes>
  );
};
