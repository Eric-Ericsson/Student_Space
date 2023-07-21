import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AvatarEditor from "react-avatar-editor";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@components/firebase";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { imageCategory } from "@components/atom/modalAtom";

const ImageUploader = ({ imageUser }) => {
  const router = useRouter(null);
  const { id } = router.query;
  const [imageCat] = useRecoilState(imageCategory);
  const [image, setImage] = useState(imageUser);
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
      toast.info("image cropped");
    }
  };

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleEditImageBanner = async () => {
    let imageRef = null;
    if (imageCat === "bannerImage") {
      imageRef = ref(storage, `users/${id}/bannerImage/${id}/image`);
    } else {
      imageRef = ref(storage, `users/${id}/profileImage/${id}/image`);
    }

    try {
      const imageSnapshot = await getDownloadURL(imageRef);
      // If the above line doesn't throw an error, it means the image file exists

      await uploadString(imageRef, croppedImage || image, "data_url").then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);
          toast.success(`${imageCat} picture updated`);
          await updateDoc(doc(db, "users", id), {
            [imageCat]: downloadURL,
          });
        }
      );
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        // Handle the case when the image file doesn't exist
        await uploadString(imageRef, croppedImage || image, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "users", id), {
              [imageCat]: downloadURL,
            });
            toast.success(`${imageCat} picture uploaded`);
          }
        );
      } else {
        console.log(error.message);
        toast.error("Something went wrong");
      }
    }

    setImage(null);
    setCroppedImage(null);
  };

  return (
    <div className="p-2">
      {image && (
        <>
          <div className="flex justify-center items-center">
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={imageCat == "profileImage" ? 180 : 600}
              height={180}
              border={30}
              color={[240, 240, 240, 0.6]}
              scale={scale}
            />
          </div>
        </>
      )}
      <div className="mt-5 mx-2 sm:mx-8 flex items-center justify-between gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-xs w-40"
        />
        <div className="flex items-center gap-2">
          <label className="text-xs">Resize:</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={handleScaleChange}
            className="w-14 h-1"
          />
        </div>
        {imageUser != image && (
          <button
            onClick={handleCrop}
            className="border-[1px] px-3 border-black bg-gray-200"
          >
            Crop
          </button>
        )}
      </div>

      {imageUser != image && (
        <div className="mt-5 mx-2 sm:mx-8 flex justify-end">
          <button
            onClick={handleEditImageBanner}
            className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-10 border-2 border-solid py-0 px-2 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500"
          >
            <strong className="font-medium text-sm">Save</strong>
            <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
