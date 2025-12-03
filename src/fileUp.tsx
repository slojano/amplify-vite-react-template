/*
import { uploadData } from "aws-amplify/storage";
import React from "react";


export default function FileUp() {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadData({
        path: () => `public/${Date.now()}-${file.name}`,
        data: file,
        options: {
          contentType: file.type,
        },
      }).result;

      console.log("Upload success:", result);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFile}
    />
  );
}
*/
import { uploadData } from "aws-amplify/storage";
import React from "react";

export default function FileUpload({ onUploaded }: { onUploaded: (key: string) => void }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const path = `public/pins/${Date.now()}-${file.name}`;

      const result = await uploadData({
        path,
        data: file,
        options: { contentType: file.type }
      }).result;

      console.log("Upload success:", result);

      // notify parent form
      onUploaded(path);

    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return <input type="file" accept="image/*" onChange={handleFile} />;
}
