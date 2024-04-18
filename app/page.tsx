"use client"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { binaryToDecimalConvertor, decimalToBinaryConvertor } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { LegacyRef, useRef, useState } from "react";

export default function Home() {
  const [dToB, setdToB] = useState<boolean>(true)
  const binaryToDecimal = <BinaryToDecimal />
  const decimalToBinary = <DecimalToBinary />

  return (
    <main className="h-screen flex flex-col items-center justify-center space-y-2">
      <div className="p-3 md:p-10 bg-primary/30 rounded-md">{dToB ? decimalToBinary : binaryToDecimal}</div>
      <Button className="space-x-1" onClick={() => setdToB(v => !v)}><RefreshCcw className="h-4 w-4" /><span>Switch to {dToB ? " (binary to decimal)" : " (decimal to binary)"}</span></Button>
    </main>
  );
}

function DecimalToBinary() {
  const [decimal, setDecimal] = useState<string>("")
  const [binary, setBinary] = useState<string>("")
  const [steps, setSteps] = useState<string[] | null>(null)
  const [finalStep, setFinalStep] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>()

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5">
      <Input type="number" placeholder="Number in decimal" pattern="[0-9]+" required title="decimal number can only contain decimal numbers (0-9)" ref={inputRef as LegacyRef<HTMLInputElement>} className="border border-primary" onChange={e => setDecimal(e.currentTarget.value)} value={decimal} />
      <Button onClick={() => {
        if (!binary) {
          setBinary("(missing)")
          setSteps(null)
          setFinalStep(null)
          return
        }
        const reported = inputRef.current?.reportValidity()
        if (!reported) return;
        const [binaryReturn, stepsReturn, finalStep] = decimalToBinaryConvertor(decimal)
        setBinary((binaryReturn as string))
        setSteps(stepsReturn as string[])
        setFinalStep(finalStep as string)
      }}>Convert to binary</Button>
      <span className="flex justify-center items-center border border-primary rounded-md p-2 space-x-1 text-sm"><span>{binary || "( binary )"}</span></span>
      <AlertDialog>
        <AlertDialogTrigger disabled={!steps}><Button className="w-full" disabled={!steps}>View Steps</Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Steps</AlertDialogTitle>
            <AlertDialogDescription>The steps that were taken to get the binary number from decimal "{decimal}"</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col justify-center max-h-60 overflow-y-scroll space-y-3 ring-gray-500/50 ring-1 rounded-md p-2">
            {steps?.map(step => <p>{step}</p>)}
          </div>
          <p>{finalStep}</p>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-primary">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


function BinaryToDecimal() {
  const [decimal, setDecimal] = useState<string>("")
  const [binary, setBinary] = useState<string>("")
  const [steps, setSteps] = useState<string[] | null>(null)
  const [finalStep, setFinalStep] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>()

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5">
      <Input type="text" placeholder="Number in binary" pattern="[01]+" required title="binary number can only contain binary numbers (0/1)" ref={inputRef as LegacyRef<HTMLInputElement>} className="border border-primary" onChange={e => setBinary(e.currentTarget.value)} value={binary} />
      <Button onClick={() => {
        if (!binary) {
          setDecimal("(missing)")
          setSteps(null)
          setFinalStep(null)
          return
        }
        const reported = inputRef.current?.reportValidity()
        if (!reported) return;
        const [decimalReturn, stepsReturn, finalStep] = binaryToDecimalConvertor(binary)
        setDecimal((decimalReturn as number).toString())
        setSteps(stepsReturn as string[])
        setFinalStep(finalStep as string)
      }}>Convert to decimal</Button>
      <span className="flex justify-center items-center border border-primary rounded-md p-2 space-x-1 text-sm"><span>{decimal || "( decimal )"}</span></span>
      <AlertDialog>
        <AlertDialogTrigger disabled={!steps}><Button className="w-full" disabled={!steps}>View Steps</Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Steps</AlertDialogTitle>
            <AlertDialogDescription>The steps that were taken to get the decimal number from binary "{binary}"</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col justify-center max-h-60 overflow-y-scroll space-y-3 ring-gray-500/50 ring-1 rounded-md p-2">
            {steps?.map(step => <p>{step}</p>)}
          </div>
          <p>{finalStep}</p>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-primary">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
