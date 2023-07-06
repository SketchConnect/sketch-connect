import React from "react";

const ExportPopup = ({
  handleDownloadImage,
  handleShareOnSocialMedia,
  handleCloseExportPopup,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h3>Export Options</h3>
      <button
        style={{ margin: "5px", padding: "5px 10px", cursor: "pointer" }}
        onClick={handleDownloadImage}
      >
        Download Image
      </button>
      <button
        style={{ margin: "5px", padding: "5px 10px", cursor: "pointer" }}
        onClick={handleShareOnSocialMedia}
      >
        Share on Social Media
      </button>
      <button
        style={{ margin: "5px", padding: "5px 10px", cursor: "pointer" }}
        onClick={handleCloseExportPopup}
      >
        Close
      </button>
    </div>
  );
};

export default ExportPopup;
