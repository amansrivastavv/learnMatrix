export const playSound = (type: 'success' | 'click' | 'error') => {
  const sounds = {
    success: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3', // Simple chime
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',   // Soft click
    error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',   // Error beep
  };

  const audio = new Audio(sounds[type]);
  audio.volume = 0.5;
  audio.play().catch(e => console.log("Audio play failed (user interaction required)", e));
};
