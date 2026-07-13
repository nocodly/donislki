import Image from 'next/image';
import { restaurant } from '@/lib/restaurant';

export function RestaurantHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur px-4 py-3">
      <div className="mx-auto flex max-w-lg items-center gap-2 min-w-0">
        <Image
          src={restaurant.logo}
          alt={restaurant.name}
          width={110}
          height={32}
          className="h-8 w-auto shrink-0"
          priority
        />
        <p className="truncate text-xs text-muted">{restaurant.subtitle}</p>
      </div>
    </header>
  );
}
