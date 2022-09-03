import { Route, Routes } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import SettingsMenu from './components/menus/settings_menu/SettingsMenu';
import Navigation from './components/navigation/Navigation';
import SpeechInput from './components/SpeechInput';
import { LocationView } from './views/LocationView';
import './style.scss'

/**
 * TODO: Create users dynamically
 */
const DEFAULT_USER = 'admin'

/**
 * All locations and items fetched from api.
 */
const [username, setUsername] = createSignal(DEFAULT_USER)

const App: Component = () => {
  return (
    <div class="overflow-hidden" style="width: 100vw; height: 100vh;">
      <Navigation />
      <SettingsMenu />
      <Routes>
        <Route path='/' element={<LocationView />} />
      </Routes>
      <SpeechInput />
    </div>
  );
};

export default App;
