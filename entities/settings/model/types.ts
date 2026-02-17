export interface IGlobalSettingsState {
  volume: number;
  isMuted: boolean;
  reducedMotion: boolean;
  fontSize: number;

  setVolume: (v: number) => void;
  toggleMute: () => void;
  setReducedMotion: (v: boolean) => void;
}
