import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row ">
          <div className="col-sm-12">
            <div className="copyright-box ">
              <p className="copyright">
                &copy; Copyright {new Date().getFullYear()}{' '}
                <strong> Bogdan Tigheci. </strong> All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
