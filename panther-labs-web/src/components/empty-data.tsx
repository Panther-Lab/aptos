export function EmptyData(){
return (
<div className="flex justify-center items-center font-mono mt-4">
    <div className="grid place-items-center">
        <h1 className="text-xl font-bold text-neutral-900 mb-4">No investments yet</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-24 h-24 text-neutral-200 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"></path>
        </svg>
        <p className="text-neutral-500 mb-0 text-center">You don't have any investments yet. Start building your portfolio.</p><button type="button" className="ant-btn ant-btn-text cursor-pointer font-mono rounded-md text-base font-semibold text-shadow-none flex items-center justify-center gap-2 text-neutral-900 hover:text-neutral-500 pl-0 pr-0 pt-0 pb-0 underline underline-offset-2 active:bg-transparent focus:bg-transparent hover:bg-transparent h-12"><a href="/earn">Start investing</a></button>
    </div>
</div>
);
}