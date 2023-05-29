import React, { InputHTMLAttributes, useState } from 'react';
import config from '../../server/config';
import { FaArrowRight } from 'react-icons/fa';
import Modal from '../components/Modal';

type Props = {};

const DALLE = (props: Props) => {
  const [images, setImages] = useState<any>([]);
  const [value, setValue] = useState<any>('');
  const [error, setError] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<any>(false);

  const surpriseOptions = [
    'A Beautiful Sunset over a forest fire',
    'A thing from your nightmares',
    'the inevitable end of an era',
    'the feeling of doom before a rainy day',
    'terrible cramps in your kneecaps',
    'the feeling of being watched',
    'constant and persistant constipation',
    'the woes of womanhood',
    'chasing the dragon',
    'Goliath beats David',
  ];

  const surpriseMe = () => {
    setImages(null);
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError('Error, you must type something');
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('/api/dalle', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (e: any) => {
    console.log(e.target.files);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;
    try {
      const options = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch('/api/dalle/upload', options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateVariations = async () => {
    setImages(null);
    if (selectedImage === null) {
      setError('Error, no image selected');
      setModalOpen(false);
    }
    try {
      const options = {
        method: 'POST',
      };
      const response = await fetch('/api/dalle/variations', options);
      const data = response.json();
      setImages(data);
      setError('');
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex ">
        <section className=" bg-[#202123] h-[100vh] w-[244px] flex flex-col justify-between">
          <ul className="h-full p-3 m-3">
            <li className="py-4 list-none cursor-pointer">previous pics</li>
          </ul>
          <nav>
            <p>Made by Justin Murrah</p>
          </nav>
        </section>
        <section className="w-full h-[100vh] flex flex-col  items-center text-center bg-[#343541]">
          <h1 className="text-xl font-extrabold">JALL-E</h1>
          <section className="p-[100px] w-full overflow-scroll flex overflow-x-hidden flex-wrap items-center justify-center">
            {images?.map((img: any, index: number) => (
              <img
                src={img.url}
                key={`image-key-${index}`}
                alt={`Generated Image of ${value}`}
                className="m-5 rounded-md shadow-lg min-w-[256px] max-w-[33%] max-h-[1024px]  flex-grow"
              />
            ))}
          </section>
          <div className="flex flex-col items-center justify-center w-full">
            <span onClick={surpriseMe} className="mb-2 surprise">
              surprise me
            </span>
            <div className="input-container">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="a surprising image with some flair"
              />
              <div id="submit" onClick={getImages}>
                <FaArrowRight />
              </div>
            </div>
            <p className="mt-2 extra-info">
              Or,
              <span>
                <label htmlFor="files">
                  Upload an <span className="font-bold text-blue-500 cursor-pointer">Image</span>{' '}
                </label>
                <input onChange={uploadImage} type="file" id="files" accept="image/*" hidden />
              </span>
              to edit
            </p>
            <p className="info">DALL-E sample testing</p>
          </div>
        </section>
        {error && <p>{error}</p>}
        {modalOpen && (
          <div className="overlay">
            <Modal
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              generateVariations={generateVariations}
            />
          </div>
        )}
      </div>
      {/* <div className="w-full h-full dalle-app">
      <section className="search-section">
        <p>
          Start with detailed description{' '}
          <span onClick={surpriseMe} className="surprise">
            surprise me
          </span>
        </p>
        <div className="dalle-input-container">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="a surprising image with some flair"
          />
          <button onClick={getImages}>Generate</button>
        </div>
        {error && <p>{error}</p>}
      </section>
      <section className="image-section">
        {images?.map((img: any, index: number) => (
          <img src={img.url} key={`image-key-${index}`} alt={`Generated Image of ${value}`} />
        ))}
      </section>
    </div></> */}
    </>
  );
};

export default DALLE;
