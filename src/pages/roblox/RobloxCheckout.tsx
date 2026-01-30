import { useState } from "react";
import { Panel, PageHeader } from "@/components/ui/cyber-elements";
import {
  CreditCard,
  QrCode,
  Wallet,
  User,
  Mail,
  Calendar,
  Lock,
} from "lucide-react";

type PaymentMethod = "pix" | "card" | "paypal";

interface CreditPackage {
  id: string;
  credits: number;
  label: string;
}

const packages: CreditPackage[] = [
  { id: "pkg_6", credits: 6, label: "6 Credits" },
  { id: "pkg_10", credits: 10, label: "10 Credits" },
  { id: "pkg_18", credits: 18, label: "18 Credits" },
  { id: "pkg_25", credits: 25, label: "25 Credits" },
  { id: "pkg_30", credits: 30, label: "30 Credits" },
];

interface PixData {
  qrCodeBase64: string | null;
  copyPaste: string;
  expiresAt: string;
}

export default function RobloxCheckout() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [selectedPackage, setSelectedPackage] =
    useState<CreditPackage>(packages[1]);

  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [pixError, setPixError] = useState("");

  // Fake card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardError, setCardError] = useState("");
  const [cardLoading, setCardLoading] = useState(false);

  function handleChangeMethod(method: PaymentMethod) {
    setPaymentMethod(method);
    setPixData(null);
    setPixError("");
    setCardError("");
  }

  async function handleGeneratePix() {
    try {
      setLoading(true);
      setPixError("");

      const userName = sessionStorage.getItem("nexus_user_name");
      if (!userName) {
        setPixError("User not authenticated");
        return;
      }

      const response = await fetch("http://localhost:3000/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedPackage.id,
          customer: {
            name: userName,
            email: `${userName}@nexus.fake`,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate PIX");

      setPixData(data);
    } catch (err: any) {
      setPixError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFakeCardPayment() {
    setCardError("");
    setCardLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setCardLoading(false);
    setCardError("Card payments are not available. Please use PIX.");
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        title="Recharge Credits"
        subtitle="Choose your package and payment method"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* PACKAGES */}
          <Panel>
            <h3 className="font-medium mb-4">Credit Packages</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`rounded-xl border p-4 text-center transition ${
                    selectedPackage.id === pkg.id
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-primary/40"
                  }`}
                >
                  <div className="text-2xl font-mono text-primary">
                    {pkg.credits}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pkg.label}
                  </div>
                </button>
              ))}
            </div>
          </Panel>

          {/* PAYMENT METHODS */}
          <Panel>
            <h3 className="font-medium mb-4">Payment Method</h3>

            <div className="flex gap-2 mb-6">
              {[
                { id: "pix", label: "PIX", icon: QrCode },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "paypal", label: "PayPal", icon: Wallet },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleChangeMethod(m.id as PaymentMethod)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                    paymentMethod === m.id
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-primary/40"
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  {m.label}
                </button>
              ))}
            </div>

            {/* PIX */}
            {paymentMethod === "pix" && (
              <div className="space-y-4 text-center">
                {!pixData && (
                  <button
                    onClick={handleGeneratePix}
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-primary text-black font-semibold"
                  >
                    {loading ? "Generating PIX..." : "Generate PIX"}
                  </button>
                )}

                {pixError && (
                  <p className="text-xs text-red-400">{pixError}</p>
                )}

                {pixData && (
                  <>
                    {pixData.qrCodeBase64 && (
                      <img
                        src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                        className="mx-auto w-48 h-48 bg-white p-2 rounded-lg"
                      />
                    )}

                    <textarea
                      readOnly
                      value={pixData.copyPaste}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs"
                    />

                    <p className="text-xs text-muted-foreground">
                      Expires at{" "}
                      {new Date(pixData.expiresAt).toLocaleString()}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* CARD (FAKE UI) */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <Input icon={CreditCard} label="Card Number" value={cardNumber} onChange={setCardNumber} placeholder="1234 5678 9012 3456" />
                <Input icon={User} label="Name on Card" value={cardName} onChange={setCardName} placeholder="John Doe" />

                <div className="grid grid-cols-2 gap-4">
                  <Input icon={Calendar} label="Expiry" value={cardExpiry} onChange={setCardExpiry} placeholder="MM/YY" />
                  <Input icon={Lock} label="CVV" value={cardCvv} onChange={setCardCvv} placeholder="123" />
                </div>

                <button
                  onClick={handleFakeCardPayment}
                  disabled={cardLoading}
                  className="w-full py-3 rounded-lg bg-primary text-black font-semibold"
                >
                  {cardLoading ? "Processing..." : "Pay with Card"}
                </button>

                {cardError && (
                  <p className="text-xs text-red-400 text-center">{cardError}</p>
                )}
              </div>
            )}

            {/* PAYPAL (FAKE UI) */}
            {paymentMethod === "paypal" && (
              <div className="space-y-4">
                <Input icon={Mail} label="PayPal Email" value="" onChange={() => {}} placeholder="your@email.com" />

                <button
                  disabled
                  className="w-full py-3 rounded-lg bg-primary text-black font-semibold opacity-50 cursor-not-allowed"
                >
                  Continue with PayPal
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  PayPal integration coming soon.
                </p>
              </div>
            )}
          </Panel>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Panel className="sticky top-20">
            <h3 className="font-medium mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Credits</span>
                <span className="font-mono text-primary">
                  {selectedPackage.credits}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Method</span>
                <span className="uppercase">{paymentMethod}</span>
              </div>

              <div className="border-t border-white/10 pt-3 text-xs text-muted-foreground">
                Amount calculated securely on the server. Credits released after payment confirmation.
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Input({ icon: Icon, label, onChange, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          {...props}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 pl-10 pr-3 text-sm outline-none transition"
        />
      </div>
    </div>
  );
}
