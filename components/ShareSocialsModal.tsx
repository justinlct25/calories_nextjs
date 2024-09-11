"use client";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  LineShareButton,
  LineIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

const ShareSocialsModal = (closeModal) => {
  const socials = [
    { name: "Whatsapp", Button: WhatsappShareButton, Icon: WhatsappIcon },
    { name: "Facebook", Button: FacebookShareButton, Icon: FacebookIcon },
    { name: "Twitter", Button: TwitterShareButton, Icon: TwitterIcon },
    { name: "Linkedin", Button: LinkedinShareButton, Icon: LinkedinIcon },
    { name: "Line", Button: LineShareButton, Icon: LineIcon },
    { name: "Telegram", Button: TelegramShareButton, Icon: TelegramIcon },
    {
      name: "FacebookMessenger",
      Button: FacebookMessengerShareButton,
      Icon: FacebookMessengerIcon,
    },
    { name: "Email", Button: EmailShareButton, Icon: EmailIcon },
  ];
// TODO: Fix Modal style
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Share on Social Media</h2>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {socials.map((social) => {
              const { Button, Icon } = social;
              return (
                <Button
                  className="p-3"
                  key={social.name}
                  url={window.location.href}
                  title={"Check out this activity!"}
                  quote={"Check out this activity!"}
                  //   hashtag={"#"}
                >
                  <Icon size={32} round />
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSocialsModal;
