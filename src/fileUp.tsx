import React from "react";
import { uploadData } from "aws-amplify/storage";

export default function FileUpload() {
  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClick = async () => {
    if (!file) return;

    try {
      const result = await uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      }).result;
     

      console.log("✅ Uploaded successfully:", result);
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
}
