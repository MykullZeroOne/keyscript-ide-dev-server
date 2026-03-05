import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const TerminalTab: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#0f172a', // slate-900
        foreground: '#cbd5e1', // slate-300
      },
      fontSize: 12,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(terminalRef.current);
    fit.fit();

    termInstance.current = term;
    fitAddon.current = fit;

    // Initialize pty in main process
    (window as any).api.initTerminal(process.cwd());

    // Listen for data from main process
    (window as any).api.onTerminalData((data: string) => {
      term.write(data);
    });

    // Handle user input
    term.onData((data) => {
      (window as any).api.writeTerminal(data);
    });

    const handleResize = () => {
      fit.fit();
      (window as any).api.resizeTerminal(term.cols, term.rows);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} className="h-full w-full bg-slate-900" />;
};

export default TerminalTab;
