// utils/downloadFile.js

/**
 * Generic file downloader utility
 * @param {BlobPart | ArrayBuffer} data - File data from API
 * @param {string} filename - File name for download
 * @param {string} mimeType - MIME type of file (optional)
 */
export function downloadFile(
  data,
  filename = "file",
  mimeType = "application/octet-stream"
) {
  try {
    const blob = new Blob([data], { type: mimeType });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Cleanup memory
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("❌ Download failed:", error);
  }
}
