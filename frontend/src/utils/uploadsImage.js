import axios from "axios";

const uploadImage = async (imageFile) =>{
    const formData = new FormData();
    //Append image file to form data
    formData.append('image', imageFile);

    try{
        const res = await axios.post("http://localhost:8000/api/auth/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
        return response.data; //return response data
    }catch(error){
        console.error('Error uploading the image:', error);
        throw error; // REthrow error for handling
    }
};

export default uploadImage;