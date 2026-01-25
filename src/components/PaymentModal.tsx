import { useState } from "react";
import {
  X,
  CreditCard,
  Check,
  Zap,
  Crown,
  QrCode,
  Copy,
  CheckCircle,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId?: string;
}

interface Plan {
  id: string;
  price: string;
  value: number;
  label: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    price: "R$ 14,99",
    value: 14.99,
    label: "Plano Básico",
    description: "Libera apenas Roblox e PUBG Mobile.",
    features: ["Roblox", "PUBG Mobile"],
  },
  {
    id: "premium",
    price: "R$ 25,00",
    value: 25.0,
    label: "Plano Completo",
    description:
      "Libera todos os módulos disponíveis, incluindo Free Fire, COD Mobile e Clash Royale.",
    features: ["Todos os módulos", "Free Fire", "COD Mobile", "Clash Royale"],
    popular: true,
  },
];

export function PaymentModal({
  isOpen,
  onClose,
  accountId,
}: PaymentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [showQR, setShowQR] = useState(false);
  const [loadingPix, setLoadingPix] = useState(false);
  const [pixQr, setPixQr] = useState<string | null>(null);
  const [pixCopy, setPixCopy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const selected = plans.find((p) => p.id === selectedPlan);

  // =====================
  // 🔥 GERAR PIX REAL
  // =====================
  const handleGeneratePayment = async () => {
    if (!selected) return;

    try {
      setLoadingPix(true);
      setError(null);

      const response = await fetch(
        "https://folly-backend-2.onrender.com/api/pix",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(selected.value * 100), // centavos
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Erro ao gerar PIX");
      }

      setPixQr(data.qrCodeBase64);
      setPixCopy(data.copyPaste);
      setShowQR(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingPix(false);
    }
  };

  const handleCopyCode = () => {
    if (!pixCopy) return;
    navigator.clipboard.writeText(pixCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setShowQR(false);
    setPixQr(null);
    setPixCopy(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md card-cyber p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* ===================== */}
        {/* 🔹 SELEÇÃO DE PLANO */}
        {/* ===================== */}
        {!showQR ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 border border-secondary/30 mb-4">
                <CreditCard className="h-7 w-7 text-secondary" />
              </div>
              <h2 className="text-xl font-bold">Adicionar Saldo</h2>
              <p className="text-sm text-muted-foreground">
                Escolha o plano desejado
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {plan.popular ? (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Zap className="h-5 w-5 text-primary" />
                      )}
                      <span className="font-semibold">{plan.label}</span>
                    </div>
                    {selectedPlan === plan.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <p className="text-2xl font-bold mb-1">{plan.price}</p>
                  <p className="text-xs text-muted-foreground">
                    {plan.description}
                  </p>
                </button>
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleGeneratePayment}
              disabled={loadingPix}
              className="w-full btn-cyber-primary flex items-center justify-center gap-2"
            >
              <QrCode className="h-5 w-5" />
              {loadingPix ? "Gerando PIX..." : "Gerar pagamento"}
            </button>
          </>
        ) : (
          <>
            {/* ===================== */}
            {/* 🔹 PIX GERADO */}
            {/* ===================== */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">Pagamento PIX</h2>
              <p className="text-sm text-muted-foreground">
                {selected?.label} — {selected?.price}
              </p>
            </div>

            {pixQr && (
              <div className="flex justify-center mb-6">
                <img
                  src={`data:image/png;base64,${pixQr}`}
                  alt="QR Code PIX"
                  className="w-48 h-48 bg-white p-2 rounded-lg"
                />
              </div>
            )}

            <div className="mb-6">
              <p className="text-xs text-muted-foreground mb-2 text-center">
                Copie o código PIX
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-muted border rounded-lg p-3 font-mono text-xs truncate">
                  {pixCopy?.slice(0, 40)}...
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 rounded-lg bg-muted hover:bg-muted/80"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full border rounded-lg py-3 text-muted-foreground hover:bg-muted"
            >
              Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
