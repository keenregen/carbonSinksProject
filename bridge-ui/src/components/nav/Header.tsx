

import { WalletControlBar } from '../../features/wallet/WalletControlBar';

export function Header() {
  return (
    <header className="pt-3 pb-2 w-full">
      <div>
        <div className="flex flex-col items-end md:flex-row-reverse md:items-start gap-2">
          <WalletControlBar />
        </div>
      </div>
    </header>
  );
}
