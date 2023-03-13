import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

export default function UploadFile() {
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

}