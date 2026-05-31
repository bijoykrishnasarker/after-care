"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RoomTrack } from "@/lib/room-tracks";

type SonicHealingPlayerProps = {
  tracks: RoomTrack[];
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function SonicHealingPlayer({ tracks }: SonicHealingPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loopPlaylist, setLoopPlaylist] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const activeTracks = tracks.length > 0 ? tracks : [];
  const currentTrack = activeTracks[trackIndex] ?? null;

  const waveformBars = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => {
        const wave = Math.sin(index * 0.35) * 0.35 + Math.cos(index * 0.12) * 0.25;
        return Math.max(12, Math.min(88, 40 + wave * 48 + (index % 5) * 4));
      }),
    [],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    setLoadError(false);
    setCurrentTime(0);
    setDuration(0);
    audio.load();
  }, [currentTrack, trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, trackIndex]);

  function togglePlay() {
    if (!currentTrack) return;
    setIsPlaying((playing) => !playing);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    setLoadError(false);
  }

  function handleSeek(event: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  }

  function playTrack(index: number) {
    if (index < 0 || index >= activeTracks.length) return;
    setTrackIndex(index);
    setIsPlaying(true);
  }

  function playNext() {
    if (activeTracks.length <= 1) return;
    const next = trackIndex + 1 >= activeTracks.length ? 0 : trackIndex + 1;
    playTrack(next);
  }

  function playPrevious() {
    if (activeTracks.length <= 1) return;
    const prev = trackIndex - 1 < 0 ? activeTracks.length - 1 : trackIndex - 1;
    playTrack(prev);
  }

  function handleEnded() {
    if (activeTracks.length <= 1) {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }

    if (loopPlaylist || trackIndex < activeTracks.length - 1) {
      const next = trackIndex + 1 >= activeTracks.length ? 0 : trackIndex + 1;
      playTrack(next);
      return;
    }

    setIsPlaying(false);
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="border border-app/80 bg-surface/30 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Sonic healing
        </p>
        {activeTracks.length > 1 && (
          <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">
            {trackIndex + 1} / {activeTracks.length}
          </p>
        )}
      </div>

      {currentTrack ? (
        <>
          <audio
            ref={audioRef}
            src={currentTrack.src}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            onError={() => setLoadError(true)}
          />

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-app transition-colors hover:border-neutral-500"
            >
              {isPlaying ? (
                <span className="flex gap-1" aria-hidden>
                  <span className="h-3 w-0.5 bg-white" />
                  <span className="h-3 w-0.5 bg-white" />
                </span>
              ) : (
                <span
                  className="ml-0.5 inline-block border-y-[6px] border-l-[10px] border-y-transparent border-l-white"
                  aria-hidden
                />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div
                role="slider"
                aria-label="Playback progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                tabIndex={0}
                onClick={handleSeek}
                onKeyDown={(event) => {
                  if (!audioRef.current || !duration) return;
                  if (event.key === "ArrowRight") {
                    audioRef.current.currentTime = Math.min(duration, currentTime + 5);
                  }
                  if (event.key === "ArrowLeft") {
                    audioRef.current.currentTime = Math.max(0, currentTime - 5);
                  }
                }}
                className="relative h-px cursor-pointer bg-neutral-800"
              >
                <span
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: `${progress}%` }}
                />
                <span
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
                  style={{ left: `calc(${progress}% - 4px)` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLoopPlaylist((loop) => !loop)}
              aria-label={loopPlaylist ? "Disable loop" : "Enable loop"}
              aria-pressed={loopPlaylist}
              className={`shrink-0 text-neutral-600 transition-colors hover:text-app ${
                loopPlaylist ? "text-app" : ""
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 5.5A4.5 4.5 0 0 1 11.2 3.6M13 5.5V2.5H10M13 10.5A4.5 4.5 0 0 1 4.8 12.4M3 10.5v3H6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="mt-5 flex h-16 items-end gap-[2px] overflow-hidden">
            {waveformBars.map((height, index) => {
              const barProgress = (index / waveformBars.length) * 100;
              const isActive = barProgress <= progress;

              return (
                <span
                  key={index}
                  className={`w-1 rounded-full transition-colors duration-150 ${
                    isActive ? "bg-white/80" : "bg-neutral-800"
                  } ${isPlaying ? "animate-pulse" : ""}`}
                  style={{ height: `${height}%` }}
                  aria-hidden
                />
              );
            })}
          </div>

          {loadError && (
            <p className="mt-4 text-xs text-neutral-500">
              Add audio to{" "}
              <code className="text-neutral-400">{currentTrack.src}</code>
            </p>
          )}

          {activeTracks.length > 1 && (
            <div className="mt-5 border-t border-app/80 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                  Playlist
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={playPrevious}
                    className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-app"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={playNext}
                    className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-app"
                  >
                    Next
                  </button>
                </div>
              </div>
              <ul className="space-y-1">
                {activeTracks.map((track, index) => (
                  <li key={track.id}>
                    <button
                      type="button"
                      onClick={() => playTrack(index)}
                      className={`w-full rounded-sm px-3 py-2 text-left text-xs transition-colors ${
                        index === trackIndex
                          ? "bg-surface-elevated text-app"
                          : "text-neutral-500 hover:bg-surface-elevated/50 hover:text-neutral-300"
                      }`}
                    >
                      {track.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className="mt-5 text-sm text-neutral-500">
          No tracks yet. Add MP3 files in{" "}
          <code className="text-neutral-400">public/audio/</code>
        </p>
      )}
    </div>
  );
}
