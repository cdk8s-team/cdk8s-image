import { spawnSync } from 'child_process';

export function shell(command: string, ...args: string[]): string {
  const proc = spawnSync(command, args);

  if (proc.error) {
    throw new Error(proc.error.message);
  }

  if (proc.status !== 0) {
    throw new Error(`non-zero exist code ${proc.status}: ${proc.stdout} ${proc.stderr}`);
  }

  return proc.stdout.toString('utf-8');
}