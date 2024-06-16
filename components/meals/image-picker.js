"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";

export default function ImagePicker({ lable, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();

  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChage = (e) => {
    /* input은 한가지 이미지 파일만 선택 가능하다 */
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    /* 미리보기 하려면 data url로 변경이 필요함 */

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); /* 여기서 생성된 URL을 */
    fileReader.onload = () => {
      setPickedImage(fileReader.result); /* 이렇게 접근 가능 */
    };
  };

  return (
    <div className={classes.picker}>
      <lable htmlFor={name}>{lable}</lable>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="image selecting by user." fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChage}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
