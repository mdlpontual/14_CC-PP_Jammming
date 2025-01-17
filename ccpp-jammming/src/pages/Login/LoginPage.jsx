import React from "react";
import LoginButtonBox from "./login_button/LoginButtonBox";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=streaming%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20ugc-image-upload%20user-read-email%20user-read-private%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-library-read`;

function LoginPage() {
    return (
        <>
            <div id="page-container" className="container-fluid d-flex flex-column">
                <main id="main-row" className="row flex-grow-1">
                    <div id="main-col" className="col d-flex justify-content-center align-items-center">
                        <LoginButtonBox authUrl={AUTH_URL}/>
                    </div>
                </main>
                <footer id="footer-row" className="row">
                    <article id="footer-col" className="col">
                        <h5 id="light-signature">ezJam</h5>
                        <h6 id="bold-signature">copyright mdlpontual - 2024</h6>
                    </article>
                </footer>
            </div>
        </>
    );
}

export default LoginPage;