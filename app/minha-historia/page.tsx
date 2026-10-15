import type { Metadata } from "next";
import { StoryExperience } from "@/components/site/StoryExperience";
import "./story.css";

const title = "Minha história | Alessandro Araujo, AL Tech";
const description =
  "A trajetória de Alessandro Araujo na criação do CMIPcD de Belford Roxo, com registros da apresentação e reconhecimento na imprensa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/minha-historia" },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    siteName: "AL Tech",
    title,
    description,
    url: "/minha-historia",
    images: [{ url: "/historia/cmipcd-registro-3.jpg", width: 840, height: 1120, alt: "Alessandro no evento da Carteirinha PCD" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/historia/cmipcd-registro-3.jpg"] },
};

export default function StoryPage() {
  return <StoryExperience />;
}
