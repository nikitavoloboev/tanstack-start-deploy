import { createFileRoute } from "@tanstack/react-router"
import { BuyWithSolana } from "~/components/BuyWithSolana"
import { SolanaConnectButton } from "~/components/SolanaConnectButton"

// trigger build. test
function RouteComponent() {
  return (
    <>
      <div className="absolute top-4 right-4">
        <SolanaConnectButton />
      </div>
      <div className="flex gap-1 sm:flex-row flex-col w-full ">
        <BuyWithSolana />
      </div>
    </>
  )
}

export const Route = createFileRoute("/solana/")({
  component: RouteComponent,
})
