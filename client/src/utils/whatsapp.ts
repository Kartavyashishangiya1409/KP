export const WHATSAPP_NUMBER = "919726982383";

interface WhatsAppDetails {
  name: string;
  phone: string;
  book?: string;
  quantity?: number;
  message?: string;
}

export function generateWhatsAppLink(details: WhatsAppDetails): string {
  const lines = [
    "Hello, I am interested in your book and would like more information.",
    "",
    `Name: ${details.name || ""}`,
    `Phone: ${details.phone || ""}`,
    `Book: ${details.book || ""}`,
    `Quantity: ${details.quantity || ""}`,
    `Message: ${details.message || ""}`,
  ];

  const text = lines.join("\n");
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
}
