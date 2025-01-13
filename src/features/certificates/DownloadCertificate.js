import React from "react";

const DownloadCertificate = () => {
  const handleDownload = () => alert("Certificate downloaded!");

  return <button onClick={handleDownload}>Download Certificate</button>;
};

export default DownloadCertificate;
