import llvm from 'llvm-bindings'

export const context = new llvm.LLVMContext()
export const module = new llvm.Module("cruton", context)
export const builder = new llvm.IRBuilder(context)

export const i32 = builder.getInt32Ty()

export const mainType = llvm.FunctionType.get(i32, false)

export const main = llvm.Function.Create(
  mainType,
  llvm.Function.LinkageTypes.ExternalLinkage,
  "main",
  module
)

export const entry = llvm.BasicBlock.Create(context, "entry", main)
builder.SetInsertPoint(entry)

export const i8ptr = builder.getInt8PtrTy()

export const printfType = llvm.FunctionType.get(
  i32,
  [i8ptr],
  true
)

export const printf = llvm.Function.Create(
  printfType,
  llvm.Function.LinkageTypes.ExternalLinkage,
  "printf",
  module
)

export function createStringPTR(string: string) {
    return builder.CreateGlobalStringPtr(string)
}

export function call(fn: llvm.Function, val: any[]) {
    return builder.CreateCall(fn, val)
}