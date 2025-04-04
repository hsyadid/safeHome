import Image from "next/image";
import Link from "next/link";
import { MdEmail, MdPhone } from "react-icons/md";

export const Footer = () => {
  return (
    <div className="w-full bg-[#4F1718] text-white py-8">
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between gap-4">

        <div className="space-y-4 flex flex-col md:items-start items-center">
          <Image
            src="/logo anara.png"
            alt="Anara Logo"
            width={80}
            height={80}
          />
          <p className="text-sm">Copyright © 2025 Anara.ID</p>
        </div>

        <div className="flex gap-16 justify-center">
          <div className="space-y-4">
            <h3 className="font-semibold">Others</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:underline">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MdEmail />
                <a href="mailto:contact@gmail.com" className="hover:underline">
                  contact@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone />
                <a href="tel:contact@gmail.com" className="hover:underline">
                  contact@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Image
            src="/EU_funding_logo.png"
            alt="Partner Logo 1"
            width={100}
            height={100}
            className="object-contain"
          />
          <Image
            src="/GYM_logo.png"
            alt="Partner Logo 2"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        
      </div>
    </div>
  );
};
