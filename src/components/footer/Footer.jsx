import React from 'react';

const Footer = () => {
  return (
    <div className='border h-[400px] w-full mt-32'>
            <div className='py-12 h-full w-5/6 mx-auto flex items-center justify-between'>
                <div className="flex-1 flex flex-col gap-4">
                    <h2>About the App</h2>
                    <p className="max-w-[375px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptates velit fuga perspiciatis itaque iste, aliquid dignissimos voluptate modi,
                        tempore assumenda adipisci dolor hic atque quod consequuntur cupiditate. Quasi, nobis veritatis!
                    </p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-4">
                    <h2>Contacts</h2>
                    <span>Phone +91 76889472928</span>
                    <span>YouTube: travelGodYT</span>
                    <span>InstaGram: travelGod</span>
                </div>
                <div className="flex-1 flex flex-col items-end gap-4">
                    <h2>Location</h2>
                    <span>Country: India</span>
                    <span>State: Maharashtra</span>
                    <span>City: Mumbai</span>
                </div>
            </div>
        </div>
  );
}

export default Footer;
