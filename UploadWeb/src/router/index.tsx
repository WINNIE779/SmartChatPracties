import React from "react";
import { UploadFile } from "../pages/upload";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/upload" element={<UploadFile />} />
    </Routes>
  );
};
