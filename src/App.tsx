
import MainLayout from './shared/components/layout/MainLayout';
import NetworkOffline from './shared/components/NetworkOffline';
import useNetworkStatus from './shared/hooks/useNetworkStatus';

const App = () => {
  const { isOnline } = useNetworkStatus();
  return (
    <>
      {isOnline ? (<MainLayout />) : (<NetworkOffline />)}
    </>
  );
};

export default App;
