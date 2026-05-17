import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact - Om Patel",
  description: "Get in touch with Om Patel for collaborations, opportunities, or questions",
};

export default function ContactPage() {
  return <ContactClient />;
}

