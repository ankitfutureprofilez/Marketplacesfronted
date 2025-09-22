import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import PropTypes from "prop-types";


const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
AWS.config.update({
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});


const s3 = new AWS.S3();
const ImageUpload = ({ value, onImageUpload }) => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState(value || "");

    useEffect(() => {
        if (value) {
            setUploadedImageUrl(value);
        }
    }, [value]);
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        uploadFile(file);
    };

    const uploadFile = (file) => {



        if (!file) {
            console.error("No file selected.");
            return;
        }

        const params = {
            Bucket: "stackearnimage",
            Key: `uploads/${file.name}`, // Save under a specific folder
            ontentType: file.type,
            Body: file,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error("Error uploading the file:", err);
            } else {
                setUploadedImageUrl(data.Location);
                if (onImageUpload) {
                    onImageUpload(data.Location); // Notify parent of new URL
                }
            }
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileInput} name="imageUpload" className="form-control" />
            {uploadedImageUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img
                        src={uploadedImageUrl ? uploadedImageUrl : value}
                        alt="Uploaded to S3"
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            border: "1px solid #ccc",
                            padding: "5px",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

ImageUpload.propTypes = {
    value: PropTypes.string,
    onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;