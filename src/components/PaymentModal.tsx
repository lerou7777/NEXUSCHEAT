import { useEffect, useState } from "react"
import { X, Zap, Check } from "lucide-react"

type Props = {
  isOpen: boolean
  onClose: () => void
  accountId?: string
}

type PixData = {
  qrCodeBase64: string
  copyPaste: string
}

type Plan = {
  id: number
  credits: number
  price: number
  popular: boolean
}

const plans: Plan[] = [
  { id: 1, credits: 10, price: 19.9, popular: false },
  { id: 2, credits: 30, price: 49.9, popular: true },
  { id: 3, credits: 70, price: 99.9, popular: false },
]

export function PaymentModal({ isOpen, onClose }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(false)
  const [pix, setPix] = useState<PixData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 🔄 RESET TOTAL AO FECHAR
  useEffect(() => {
    if (!isOpen) {
      setSelectedPlan(null)
      setPix(null)
      setLoading(false)
      setError(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  async function gerarPix() {
    if (!selectedPlan) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        "https://folly-backend-2.onrender.com/api/pix/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [
              {
                title: `Pacote ${selectedPlan.credits} créditos`,
                price: selectedPlan.price,
                quantity: 1,
              },
            ],
          }),
        }
      )

      const data = await response.json()

      if (!response.ok || !data.qrCodeBase64) {
        throw new Error("Erro ao gerar PIX")
      }

      setPix({
        qrCodeBase64: data.qrCodeBase64,
        copyPaste: data.copyPaste,
      })
    } catch (err) {
      console.error(err)
      setError("Não foi possível gerar o PIX. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-background p-6 animate-fade-in">

        {/* FECHAR */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X />
        </button>

        {/* HEADER */}
        <h2 className="mb-2 text-center text-2xl font-bold text-gradient-cyber">
          Adicionar Saldo
        </h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Escolha um plano e libere o acesso instantaneamente
        </p>

        {/* ERRO */}
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* ================= PASSO 1 — PLANOS ================= */}
        {!pix && (
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`cursor-pointer rounded-lg border p-4 transition
                  ${
                    selectedPlan?.id === plan.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }
                `}
              >
                {plan.popular && (
                  <span className="mb-1 block text-xs font-mono text-primary">
                    ⭐ MAIS ESCOLHIDO
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">
                      {plan.credits} créditos
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Liberação imediata
                    </p>
                  </div>

                  <p className="text-xl font-mono text-gradient-cyber">
                    R$ {plan.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={gerarPix}
              disabled={!selectedPlan || loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                "Gerando PIX..."
              ) : (
                <>
                  <Zap size={18} />
                  Gerar PIX
                </>
              )}
            </button>
          </div>
        )}

        {/* ================= PASSO 2 — PIX ================= */}
        {pix && (
          <div className="text-center animate-fade-in">
            <img
              src={pix.qrCodeBase64}
              alt="QR Code PIX"
              className="mx-auto mb-4 w-56"
            />

            <button
              onClick={() => navigator.clipboard.writeText(pix.copyPaste)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary py-2"
            >
              <Check size={16} />
              Copiar código PIX
            </button>

            <p className="mt-3 text-xs text-muted-foreground">
              Pagamento confirmado em segundos
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
