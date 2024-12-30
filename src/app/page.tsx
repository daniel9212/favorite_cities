import Home from '@/app/(navbar-layout)/home/index';
import LayoutWithNavigation from '@/app/(navbar-layout)/layout';

export default async function App() {
  return (
    <LayoutWithNavigation>
      <Home />
    </LayoutWithNavigation>
  );
}
