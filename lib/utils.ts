import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function binaryToDecimalConvertor(binarySequence: string) {
  let steps: string[] = []
  const array = Array.from(binarySequence)
  const reversedArray = array.toReversed()
  console.log(array, reversedArray)

  let integers = Array<number>()
  for (let index = 0; index !== binarySequence.length; index++) {
    const binaryString = reversedArray[index];
    const binaryNumber = parseInt(binaryString)
    const result = binaryNumber * (2 ** index)
    steps.push(`${binaryNumber} × (2 ^ ${index}) = ${result}`)
    integers.push(result);
  }

  steps.reverse()

  console.log(integers)

  let decimal = 0
  for (let i = 0; i < integers.length; i++) {
    decimal += integers[i]
    console.log(decimal)
  }

  return [decimal, steps, `${integers.toReversed().filter(value => value !== 0).join(" + ")} = ${decimal}`]
}


export function decimalToBinaryConvertor(stringNumber: string) {
  let number = parseInt(stringNumber)
  let steps = Array<string>()

  let remainders = Array<number>()

  while (number != 0) {
    const prevNumber = number
    const remainder = number % 2
    number = (number - remainder) / 2
    steps.push(`${prevNumber} ÷ 2 = ${number} (remainder ${remainder})`)
    remainders.push(remainder)
  }

  remainders.reverse()

  const binary = remainders.join("")

  return [binary, steps, `${remainders.join(" -> ")} = ${binary}`]
}
