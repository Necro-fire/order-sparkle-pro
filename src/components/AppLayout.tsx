import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-4 px-4" style={{ boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,0.08)' }}>
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                placeholder="Buscar por OS, cliente, aparelho..."
                className="pl-9 h-9 bg-surface-1 border-0 text-sm placeholder:text-muted-foreground"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
              />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
