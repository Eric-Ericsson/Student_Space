import { useRef, useState } from "react";
import { useRouter } from "next/router";
import AvatarEditor from "react-avatar-editor";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@components/firebase";
import { toast } from "react-toastify";

const ImageUploader = () => {
  const router = useRouter(null);
  const { id } = router.query;
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef();

  const handleFileChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
    }
  };

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleEditImageBanner = async () => {
    const imageRef = ref(storage, `users/${id}/image`);
    handleCrop();
    console.log(croppedImage)

    try {
      if (image) {
        await uploadString(imageRef, image, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "users", id), {
            image: downloadURL,
          })
            .then(() => {
              toast.success("profile pciture updated");
            })
            .catch((error) => {
              toast.error("something went wrong");
              console.log(error.message);
            });
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    setImage(null);
    setCroppedImage(null);
  };

  return (
    <div className="p-2">
      {image && (
        <>
          <AvatarEditor
            ref={editorRef}
            image={croppedImage || image}
            width={600}
            height={200}
            border={30}
            color={[240, 240, 240, 0.6]}
            scale={scale}
          />
        </>
      )}
  <div className="mt-5 flex items-center justify-evenly">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <label>Resize:</label>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        value={scale}
        onChange={handleScaleChange}
      />
  </div>

<div className="mt-5 mr-8 flex justify-end">
      <button
        onClick={handleEditImageBanner}
        className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-10 border-2 border-solid py-0 px-2 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500"
      >
        <strong className="font-medium text-sm">Save</strong>
        <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
      </button>
      </div>
    </div>
  );
};

export default ImageUploader;
