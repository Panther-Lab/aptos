import wallet from "../../public/wallet.svg"

export function WalletDisconnected(){
    return (
    <div className="flex justify-center items-center font-mono mt-4">
        <div className="grid place-items-center">
            <h1 className="text-xl font-bold text-neutral-900 mb-4">Wallet Not Connnected</h1>
            <img src="./wallet.svg" alt="wallet" className="w-40 h-40 mb-4"/>
            <p className="text-neutral-500 mb-0 text-center">Your wallet is not connected yet. Connect Wallet and start exploring.</p><button type="button" className="ant-btn ant-btn-text cursor-pointer font-mono rounded-md text-base font-semibold text-shadow-none flex items-center justify-center gap-2 text-neutral-900 hover:text-neutral-500 pl-0 pr-0 pt-0 pb-0 underline underline-offset-2 active:bg-transparent focus:bg-transparent hover:bg-transparent h-12"></button>
        </div>
    </div>
    );
    }