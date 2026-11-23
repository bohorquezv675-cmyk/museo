import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { AudioMotif } from '../data/museumData';

interface MuseumAudioPlayerProps {
  id: string;
  label: string;
  audioSrc: string;
  motif: AudioMotif;
  durationSec: number;
}

const MOTIF_SCALES: Record<AudioMotif, { freqs: number[]; tempoMs: number; wave: OscillatorType; gain: number }> = {
  punk: { freqs: [110, 110, 146.83, 130.81, 110, 164.81, 146.83, 98], tempoMs: 210, wave: 'sawtooth', gain: 0.06 },
  metal: { freqs: [82.41, 82.41, 98, 110, 82.41, 123.47, 110, 92.5], tempoMs: 230, wave: 'sawtooth', gain: 0.055 },
  extreme: { freqs: [73.42, 77.78, 73.42, 110, 73.42, 103.83, 98, 73.42], tempoMs: 175, wave: 'square', gain: 0.04 },
  heavy: { freqs: [98, 110, 130.81, 146.83, 130.81, 110, 98, 87.31], tempoMs: 280, wave: 'sawtooth', gain: 0.055 },
  prog: { freqs: [146.83, 174.61, 220, 261.63, 246.94, 196, 164.81, 146.83], tempoMs: 320, wave: 'triangle', gain: 0.08 },
  compilation: { freqs: [130.81, 164.81, 196, 220, 196, 164.81, 146.83, 130.81], tempoMs: 340, wave: 'triangle', gain: 0.075 },
  radio: { freqs: [220, 277.18, 329.63, 277.18, 246.94, 293.66, 329.63, 220], tempoMs: 420, wave: 'sine', gain: 0.07 },
  live: { freqs: [110, 130.81, 146.83, 164.81, 146.83, 130.81, 110, 98], tempoMs: 260, wave: 'sawtooth', gain: 0.055 },
  archive: { freqs: [164.81, 196, 220, 246.94, 220, 196, 164.81, 146.83], tempoMs: 380, wave: 'triangle', gain: 0.07 },
};

function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${mins}:${rem.toString().padStart(2, '0')}`;
}

export const MuseumAudioPlayer: React.FC<MuseumAudioPlayerProps> = ({
  id,
  label,
  audioSrc,
  motif,
  durationSec,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(durationSec);
  const [hasRealAudio, setHasRealAudio] = useState<boolean | null>(null);

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const stepTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioElRef.current) {
      audioElRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const stopAllInternal = () => {
    if (stepTimerRef.current !== null) {
      window.clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.pause();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    const onGlobalPlay = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail !== id) {
        stopAllInternal();
      }
    };
    window.addEventListener('museum-audio-active', onGlobalPlay);
    return () => {
      window.removeEventListener('museum-audio-active', onGlobalPlay);
      stopAllInternal();
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => undefined);
      }
    };
  }, [id]);

  const playSynthStep = () => {
    const ctx = ctxRef.current;
    if (!ctx || isMutedRef.current) return;

    const preset = MOTIF_SCALES[motif];
    const freq = preset.freqs[noteIndexRef.current % preset.freqs.length];
    noteIndexRef.current += 1;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc.type = preset.wave;
    osc.frequency.setValueAtTime(freq, now);

    sub.type = 'triangle';
    sub.frequency.setValueAtTime(freq * 0.5, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(motif === 'radio' ? 1400 : 950, now);

    const dur = (preset.tempoMs / 1000) * 0.85;
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(preset.gain, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    sub.start(now);
    osc.stop(now + dur + 0.02);
    sub.stop(now + dur + 0.02);
  };

  const startSynthPlayback = async (startFrom: number) => {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctxRef.current && AudioCtx) {
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume();
    }

    const preset = MOTIF_SCALES[motif];
    setElapsed(startFrom >= totalDuration ? 0 : startFrom);
    setIsPlaying(true);

    playSynthStep();
    stepTimerRef.current = window.setInterval(() => {
      playSynthStep();
    }, preset.tempoMs);

    progressTimerRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= totalDuration) {
          stopAllInternal();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleTogglePlay = async () => {
    if (isPlaying) {
      stopAllInternal();
      return;
    }

    window.dispatchEvent(new CustomEvent('museum-audio-active', { detail: id }));

    let useReal = hasRealAudio;
    if (useReal === null) {
      try {
        const res = await fetch(audioSrc, { method: 'HEAD' });
        const contentType = res.headers.get('content-type') || '';
        useReal = res.ok && contentType.startsWith('audio/');
      } catch {
        useReal = false;
      }
      setHasRealAudio(useReal);
    }

    if (useReal) {
      if (!audioElRef.current) {
        const el = new Audio(audioSrc);
        el.muted = isMuted;
        el.addEventListener('loadedmetadata', () => {
          if (Number.isFinite(el.duration) && el.duration > 0) {
            setTotalDuration(Math.round(el.duration));
          }
        });
        el.addEventListener('timeupdate', () => {
          setElapsed(Math.floor(el.currentTime));
        });
        el.addEventListener('ended', () => {
          setIsPlaying(false);
          setElapsed(0);
        });
        audioElRef.current = el;
      }
      try {
        await audioElRef.current.play();
        setIsPlaying(true);
        return;
      } catch {
        setHasRealAudio(false);
      }
    }

    await startSynthPlayback(elapsed);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setElapsed(next);
    if (hasRealAudio && audioElRef.current) {
      audioElRef.current.currentTime = next;
    }
  };

  const progressPct = totalDuration > 0 ? Math.min(100, (elapsed / totalDuration) * 100) : 0;

  return (
    <div className="bg-[#FAF8F8] border border-[#E5DCDC] p-3.5">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-medium text-[#1A1415] truncate">{label}</span>
        <span className="font-mono text-[11px] tabular-nums text-[#594D4F] shrink-0">
          {formatTime(elapsed)} / {formatTime(totalDuration)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? `Pausar ${label}` : `Reproducir ${label}`}
          className="w-9 h-9 shrink-0 flex items-center justify-center bg-[#721422] text-white hover:bg-[#540D18] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#721422]"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="flex-1 flex items-center">
          <div className="relative w-full h-1.5 bg-[#E5DCDC]">
            <div
              className="absolute inset-y-0 left-0 bg-[#721422] transition-all duration-150"
              style={{ width: `${progressPct}%` }}
            />
            <input
              type="range"
              min={0}
              max={totalDuration}
              value={elapsed}
              onChange={handleSeek}
              aria-label={`Progreso de ${label}`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          className="w-8 h-8 shrink-0 flex items-center justify-center text-[#594D4F] hover:text-[#721422] transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
