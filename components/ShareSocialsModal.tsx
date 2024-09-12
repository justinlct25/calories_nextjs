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

const ShareSocialsModal = ({ closeModal }) => {
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

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-8 pt-3">
              <div className="flex justify-end w-full">
                <button
                  className="close-button text-gray-900"
                  onClick={() => closeModal()}
                >
                  &times;
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Share on Social Media
                  </h3>
                  <div className="my-4">
                    {socials.map((social) => {
                      const { Button, Icon } = social;
                      return (
                        <Button
                          key={social.name}
                          url={window.location.href}
                          title={"Check out this activity!"}
                          quote={"Check out this activity!"}
                          //   hashtag={"#"}
                          style={{ padding: "0 0.2rem" }}
                        >
                          <Icon size={32} round />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSocialsModal;
