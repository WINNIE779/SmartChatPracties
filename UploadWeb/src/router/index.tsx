import React from "react";
import { UploadFile } from "../pages/home";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/home" element={<UploadFile />} />
    </Routes>
  );
};
