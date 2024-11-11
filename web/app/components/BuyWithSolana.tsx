import { createMemoInstruction } from "@solana/spl-memo"
import { useWallet } from "@solana/wallet-adapter-react"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"
import { useState } from "react"

export function BuyWithSolana() {
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const { publicKey, sendTransaction } = useWallet()

  return (
    <button
      onClick={async () => {
        if (!publicKey) {
          return
        }
        try {
          setLoadingTransaction(true)
          if (!publicKey) {
            setLoadingTransaction(false)
            return
          }
          const costInUsd = 5
          const costInSol = await getCostInSol(costInUsd)
          if (!costInSol) return
          const addresses = [
            "E57kivv4wcptYTas5aTKQb82sGvipBY5GUQZn4GPzgFT",
            "H2ANeJWUYUSkrLbhRq4VBf2nSmjCBk9tP7WNBFFN7J64",
            "9fyd39ENpTdF6fjJ3CBURsuKANFy2Yw7RvB2mihZkzbS",
            "76XTHj6puju8vkPjN3tZZHBHKMSSCJD2prvTTMUsCJY2",
            "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq8",
          ]
          const connection = new Connection(
            // @ts-ignore
            import.meta.env.VITE_SOLANA_RPC_URL!,
          )
          console.log(connection)
          const transaction = new Transaction()
          const costInLamports = LAMPORTS_PER_SOL * costInSol
          const amountPerAddress = Math.ceil(costInLamports / 5)
          transaction.add(
            createMemoInstruction(`item_id_bought_90123`, [publicKey]),
          )
          for (const address of addresses) {
            const recipientPubkey = new PublicKey(address)
            transaction.add(
              SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubkey,
                lamports: amountPerAddress,
              }),
            )
          }
          const tx = await sendTransaction(transaction, connection)
          console.log("Transaction confirmed:", tx)
        } catch (err) {
          console.log(err, "err")
          setLoadingTransaction(false)
        }
      }}
      className={`h-[60px] w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white p-3 rounded-xl transition-all hover:from-purple-600 hover:to-purple-900 hover:shadow-lg font-bold text-lg flex items-center justify-center whitespace-nowrap min-h-[40px]`}
    >
      <div className={loadingTransaction ? "h-8 w-8" : "h-8"}>
        {!loadingTransaction && `Buy for 5$ with Solana and split`}
        {loadingTransaction && <div className="h-8 w-8">Loading...</div>}
      </div>
    </button>
  )
}

export async function getCostInSol(costInUsd: number) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
    )
    const data = await response.json()
    const solPriceInUsd = data.solana.usd
    return costInUsd / solPriceInUsd
  } catch (error) {
    console.error("Error fetching SOL price:", error)
  }
}
