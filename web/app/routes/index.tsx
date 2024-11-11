import { createFileRoute } from "@tanstack/react-router"
import { BuyWithSolana } from "~/components/BuyWithSolana"

function RouteComponent() {
  return (
    <>
      <div className="flex gap-1 sm:flex-row flex-col w-full ">
        <BuyWithSolana />
      </div>
    </>
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})
