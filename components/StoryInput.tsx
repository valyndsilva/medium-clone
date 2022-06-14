import Link from 'next/link';
import Image from 'next/image';
import iconPic from '../public/medium-icon.png';
import profilePic from '../public/profile-img.png';
import {
  AddOutlined,
  AttachmentOutlined,
  CameraAltOutlined,
  Close,
  PlayArrowOutlined,
  SearchOutlined,
  ToggleOnRounded,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState, useRef, useEffect } from 'react';

function StoryInput({ color = '' }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [videoMode, setVideoMode] = useState<boolean>(false);
  const [embedMode, setEmbedMode] = useState<boolean>(false);
  const [addInputMode, setAddInputMode] = useState<boolean>(false);
  // Material-UI IconButton onClick with TypeScript handler
  // Click on + IconButton

  // const toggleMenu = () => {
  //   console.log('isOpen:', isOpen);
  //   setIsOpen(!isOpen);
  // };

  console.log('isOpen:', isOpen);
  console.log('searchMode', searchMode);
  console.log('videoMode', videoMode);
  console.log('embedMode', embedMode);
  console.log('addInputMode', addInputMode);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSearchMode(false);
  };
  const handleSearch = () => {
    setSearchMode(!searchMode);
    setVideoMode(false);
    setEmbedMode(false);
    setAddInputMode(false);
  };
  const handleVideo = () => {
    setVideoMode(!videoMode);
    setSearchMode(false);
    setEmbedMode(false);
    setAddInputMode(false);
  };
  const handleEmbed = () => {
    setEmbedMode(!embedMode);
    setSearchMode(false);
    setVideoMode(false);
    setAddInputMode(false);
  };
  const handleAddInput = () => {
    setAddInputMode(!addInputMode);
    setSearchMode(false);
    setVideoMode(false);
    setEmbedMode(false);
  };

  const handleSearchSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
      setSearchMode(!searchMode);
      setInputValue((inputRef.current.value = '')); //clear the input
    }
    console.log('handleSearchSubmit inputValue:', inputValue);
    return <div>{inputValue}</div>;
  };

  const handleVideoSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
      setVideoMode(!videoMode);
      setInputValue((inputRef.current.value = '')); //clear the input
    }
    console.log('handleVideoSubmit searchValue:', inputValue);
    return <div>{inputValue}</div>;
  };

  const handleEmbedSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
      setEmbedMode(!embedMode);
      setInputValue((inputRef.current.value = '')); //clear the input
    }
    console.log('handleEmbedSubmit inputValue:', inputValue);
    return <div>{inputValue}</div>;
  };

  const handleAddInputSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
      setAddInputMode(!addInputMode);
      setInputValue((inputRef.current.value = '')); //clear the input
    }
    console.log('handleAddInputSubmit inputValue:', inputValue);

    return <div>{inputValue}</div>;
  };

  return (
    <main
      className={'flex justify-between items-center space-x-8 ' + (color ?? '')}
    >
      {/* <div className="flex justify-between"> */}
      <div className="flex items-center space-x-5">
        <IconButton onClick={toggleMenu}>
          {isOpen ? (
            <CloseIcon className="border rounded-full text-gray-400 p-2 h-10 w-10" />
          ) : (
            <AddIcon className="border rounded-full text-gray-400 p-2 h-10 w-10" />
          )}
        </IconButton>

        {isOpen && searchMode ? (
          <form className="flex pr-5">
            <input
              placeholder="Type keywords to search Unsplash, and Enter"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-l pl-4 text-3xl text-black-400 placeholder:text-gray-300  placeholder:text-xl focus:outline-none"
            />
            <button
              onClick={handleSearchSubmit}
              // disabled={!input || !session}
              className="hidden"
            >
              Search
            </button>
          </form>
        ) : isOpen && videoMode ? (
          <form className="flex pr-5">
            <input
              placeholder="Paste a YouTube, Vimeo, or other video link, and press Enter"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-l pl-4 text-3xl text-black-400 placeholder:text-gray-300  placeholder:text-2xl focus:outline-none"
            />
            <button
              onClick={handleVideoSubmit}
              // disabled={!input || !session}
              className="hidden"
            >
              Search
            </button>
          </form>
        ) : isOpen && embedMode ? (
          <form className="flex pr-5">
            <input
              placeholder="Paste a link to embed content from another site (e.g. Twitter) and press Enter"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-l pl-4 text-3xl text-black-400 placeholder:text-gray-300  placeholder:text-2xl focus:outline-none"
            />
            <button
              onClick={handleEmbedSubmit}
              // disabled={!input || !session}
              className="hidden"
            >
              Search
            </button>
          </form>
        ) : isOpen && addInputMode ? (
          <form className="flex pr-5">
            <input
              placeholder="Tell your story..."
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-l pl-4 text-3xl text-black-400 placeholder:text-gray-300  placeholder:text-2xl focus:outline-none"
            />
            <button
              onClick={handleAddInputSubmit}
              // disabled={!input || !session}
              className="hidden"
            >
              Search
            </button>
          </form>
        ) : (
          <form>
            <input
              placeholder="Tell your story..."
              className="border-l pl-4 text-3xl text-black-400 placeholder:text-gray-300 placeholder:text-2xl  focus:outline-none"
            />
          </form>
        )}
      </div>
      <div>
        {isOpen ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 ">
              <label>
                <input type="file" className="hidden" name="file" id="file" />
                <CameraAltOutlined className="cursor-pointer border rounded-full text-gray-400 p-2 h-10 w-10 text-sm " />
              </label>
              <label>
                <SearchOutlined
                  className="cursor-pointer border rounded-full text-gray-400 p-2 h-10 w-10 text-sm "
                  onClick={handleSearch}
                />
              </label>
              <label>
                <PlayArrowOutlined
                  className="cursor-pointer border rounded-full text-gray-400 p-2 h-10 w-10 text-sm "
                  onClick={handleVideo}
                />
              </label>
              <label>
                <AttachmentOutlined
                  className="cursor-pointer border rounded-full text-gray-400 p-2 h-10 w-10 text-sm "
                  onClick={handleEmbed}
                />
              </label>
              <label>
                <AddOutlined
                  className="cursor-pointer border rounded-full text-gray-400 p-2 h-10 w-10 text-sm "
                  onClick={handleAddInput}
                />
              </label>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default StoryInput;
