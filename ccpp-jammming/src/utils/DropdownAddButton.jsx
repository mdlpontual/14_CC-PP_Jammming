import React, { useState } from "react";
import IMG from "../assets/images/ImagesHUB";
import useUserInfo from "../hooks/user_hooks/useUserInfo";

function DropdownAddButton({ dropdownButtonRef, handleDropDownAdd, accessToken }) {
    const { userPlaylistsArr } = useUserInfo({ accessToken });
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent outside click propagation
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setIsMenuOpen(false); // Close menu

    // Close menu on outside click
    React.useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [dropdownButtonRef]);

    return (
        <>
            <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                <div id="custom-dropdown" title="Click and Select a Playlist to add Tracks" className="container-fluid justify-content-center align-items-center custom-dropdown" ref={dropdownButtonRef}>
                    <button id="plus-dd" className="row d-flex justify-content-center align-items-center btn" type="button" onClick={toggleMenu}>
                        <img id="plus-icon" className="col justify-content-center align-items-center" src={IMG.plus2PNG} alt="plus icon" width="25px" />
                        <img id="plus-icon-green" className="col justify-content-center align-items-center" src={IMG.plus2GreenPNG} alt="plus icon" width="25px" />
                    </button>
                    {isMenuOpen && (
                        <ul id="dropdown-ul" className="container-fluid">
                            <li>
                                <h5 id="dd-top-text" className="custom-menu-item">
                                    Select a playlist to add this track:
                                </h5>
                            </li>
                            <li>
                                <hr className="custom-menu-divider" />
                            </li>
                            {userPlaylistsArr.map((playlistData) => (
                                <li key={playlistData.playlistId}>
                                    <button id="dd-item" className="custom-menu-item" type="button" onClick={(e) => {handleDropDownAdd(playlistData); e.stopPropagation(); closeMenu();}}>
                                        {playlistData.playlistTitle}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default DropdownAddButton;