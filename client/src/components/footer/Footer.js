import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer(){
    return (
        <>
            <footer className="bg-dark text-white pt-5 pb-4">
                <div className="container text-md-left">
                    <div className="row text-md-left">

                        {/* Company Info */}
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Asset Bazar</h5>
                            <p>
                                Your trusted property partner. Buy, sell homes with confidence and ease.
                            </p>
                        </div>

                        {/* Useful Links */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
                            <p><a href="/properties" className="text-white text-decoration-none">Buy Property</a></p>
                            <p><a href="/list-property" className="text-white text-decoration-none">Sell Property</a></p>
                            <p><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></p>
                            <p><a href="/about" className="text-white text-decoration-none">About</a></p>
                        </div>

                        {/* Contact Info */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
                            <p><i className="fas fa-home me-2"></i> Indore, India</p>
                            <p><i className="fa-solid fa-envelope me-2"></i> support@realestatepro.com</p>
                            <p><i className="fa-solid fa-phone me-2"></i> +91 98765 43210</p>
                        </div>

                        {/* Social Media */}
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Follow us</h5>
                            <a href="#" className="text-white me-3 fs-4"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#" className="text-white me-3 fs-4"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#" className="text-white me-3 fs-4"><i class="fa-brands fa-square-x-twitter"></i></a>
                            <a href="#" className="text-white fs-4"><i class="fa-brands fa-linkedin"></i></a>
                        </div>

                    </div>

                    {/* Bottom Line */}
                    <hr className="mb-4" />
                    <div className="row align-items-center">
                        <div className="col-md-7 col-lg-8">
                            <p>© {new Date().getFullYear()} AssetBazar — All rights reserved.</p>
                        </div>
                        {/* <div className="col-md-5 col-lg-4">
                            <p className="text-end">Made with ❤️ by Aditya</p>
                        </div> */}
                    </div>
                </div>
            </footer>  
        </>
    )
}

export default Footer
