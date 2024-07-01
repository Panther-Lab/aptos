import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";
import { useWallet, WalletReadyState, WalletName, Wallet } from "@aptos-labs/wallet-adapter-react";
import { Fragment, useState } from "react";
import { Icons } from "@/components/icons";

export const WalletButtons = () => {
  const { wallets, connect, disconnect, connected, account } = useWallet();
  const [showWallet, setShowWallet] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sucessCopy, setSucessCopy] = useState('Copy');

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function() {
      setSucessCopy('Copied!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
  
  const onWalletConnectRequest = (walletName: WalletName) => {
    try {
      connect(walletName);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  const toggleSettings = () => {
    if(!connected){
      setShowWallet(!showWallet);
    }else{
      setSettingsOpen(!settingsOpen);
    }
  };

  const close = () => {
    setShowWallet(true);
    setSettingsOpen(false);
    disconnect();
  };

  const renderWalletButton = (wallet: Wallet) => {
    const isWalletReady =
      wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable;

    return (
      <button
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
        className="items-center hover:bg-black/[0.04] active:bg-black/[0.06] hover:dark:bg-white/[0.02] active:dark:bg-white/[0.03] relative flex gap-4 px-4 py-3 w-full cursor-pointer rounded-xl"
        disabled={!isWalletReady}
      > 
      <div className="">
        {wallet.icon && <img src={wallet.icon} alt={`${wallet.name} icon`} className="w-6 h-6" />}
      </div>
      <div className="min-w-[160px] min-h-[18px] pt-0 flex flex-col gap-0.5 items-start">
        <span className="text-sm font-medium text-gray-900 dark:text-slate-200">
        {wallet.name}
        </span>
      </div>
      </button>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
      <button className="w-full font-medium flex items-center justify-center gap-2 cursor-pointer transition-all bg-blue-200 dark:bg-slate-600/10 hover:dark:bg-slate-600/20 active:dark:bg-slate-600/30 px-4 h-[38px] rounded-xl text-base">
        {connected ? (
          <Fragment>
            {account?.address && (
              <div className="ml-1 cursor-pointer" onClick={()=>setSettingsOpen(true)}>
                <Icons.profile />
                {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
              </div>
            )}
          </Fragment>
        ) : (
          <div className="flex gap-0.5">
          <button>
          Connect Wallet
          </button>
          <Icons.dropdown/>
          </div>
        )}
      </button>
      </PopoverTrigger>
      { !connected ? (
      <PopoverContent className="p-1 mr-2 bg-secondary">
        <div className="flex flex-col gap-3 dark:bg-slate-200 dark:bg-opacity-[0.04] rounded-xl overflow-hidden min-w-13 ">
          {wallets ? (
            wallets.map((wallet) => renderWalletButton(wallet))
          ) : (
            <div className="p-2 text-gray-500">No wallets available</div>
          )}
        </div>
      </PopoverContent>
      ) : (
        <Fragment>
            <PopoverContent className="w-80 right-0 mt-2 bg-secondary rounded-xl shadow-lg mr-2">
              <div className="flex flex-col gap-8 p-0">
              <div className="flex justify-between gap-3">
                <div className="text-sm font-semibold flex items-center gap-1.5 text-gray-700 dark:text-slate-200">
                  <div className="inline-block rounded-full overflow-hidden bg-rgb(3, 83, 93) h-4 w-4">
                    <Icons.profile />
                  </div>
                  <div className="group relative">
                    <span className="cursor-pointer text-sm" onClick={()=>copyToClipboard(account?.address ?? '')}>{`${account?.address.slice(0, 6)}...${account?.address.slice(-4)}`}</span>
                    <div className="left-0 right-0 absolute group-hover:flex hidden mt-1 justify-center">
                      <span className="bg-gray-600 text-white px-2 py-0.5 rounded-xl whitespace-nowrap text-[10px]">{sucessCopy}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <button type="button" className="group relative focus:outline-none border:none flex justify-center items-center">
                    <span className="bg-black/[0.08] dark:bg-white/[0.08] absolute rounded-full hover:bg-black/[0.12] hover:dark:bg-white/[0.12] w-4 h-4 p-4">
                      <div className="relative hidden group-hover:block h-4 pt-4 pb-4">
                        <div className="left-0 right-0 absolute flex justify-center mt-1">
                          <span className="bg-gray-600 text-white px-2 py-0.5 rounded-xl whitespace-nowrap text-[10px]">Settings</span>
                        </div>
                      </div>
                    </span>
                    <Icons.setting />
                  </button>
                  <button type="button" className="group relative focus:outline-none border:none flex justify-center items-center">
                    <span className="bg-black/[0.08] dark:bg-white/[0.08] absolute rounded-full hover:bg-black/[0.12] hover:dark:bg-white/[0.12] w-4 h-4 p-4">
                      <div className="relative hidden group-hover:block w-4 h-4 p-4">
                        <div className="left-0 right-0 absolute flex justify-center mt-1" onClick={()=>copyToClipboard(account?.address ?? '')}>
                          <span className="bg-gray-600 text-white px-2 py-0.5 rounded-xl whitespace-nowrap text-[10px]">{sucessCopy}</span>
                        </div>
                      </div>
                    </span>
                    <Icons.copy />
                  </button>
                  <a type="button" target="_blank" href={`https://explorer.aptoslabs.com/account/${account?.address}?network=testnet`} className="group relative focus:outline-none border:none flex justify-center items-center">
                    <span className="bg-black/[0.08] dark:bg-white/[0.08] absolute rounded-full hover:bg-black/[0.12] hover:dark:bg-white/[0.12] w-4 h-4 p-4">
                      <div className="relative hidden group-hover:block w-4 h-4 p-4">
                        <div className="left-0 right-0 absolute flex justify-center mt-1">
                          <span className="bg-gray-600 text-white px-2 py-0.5 rounded-xl whitespace-nowrap text-[10px]">View on Explorer</span>
                        </div>
                      </div>
                    </span>
                    <Icons.explorer />
                  </a>
                  <button type="button" className="group relative focus:outline-none border:none flex justify-center items-center" onClick={disconnect}>
                    <span className="bg-black/[0.08] dark:bg-white/[0.08] absolute rounded-full hover:bg-black/[0.12] hover:dark:bg-white/[0.12] w-4 h-4 p-4">
                      <div className="relative hidden group-hover:block h-4 pt-4 pb-4">
                        <div className="left-0 right-0 absolute flex justify-center mt-1">
                          <span className="bg-gray-600 text-white px-2 py-0.5 rounded-xl whitespace-nowrap text-[10px]">Disconnect</span>
                        </div>
                      </div>
                    </span>
                    <Icons.disconnect />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-3xl font-medium whitespace-nowrap">{0.01} APT</p>
                <div className="w-12">
                  <div className="h-[24px] py-[3px] flex w-full">
                    <div className="flex w-full h-full rounded-md overflow-hidden animate-pulse bg-black/[0.10] dark:bg-white/[0.10]"></div>
                  </div>
                </div>
              </div>
            </div>
            </PopoverContent>
        </Fragment>
      )}
    </Popover>
  );
};
