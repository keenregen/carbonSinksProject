const isDevMode = process?.env?.NODE_ENV === 'development';
const version = process?.env?.NEXT_PUBLIC_VERSION ?? null;
const explorerApiKeys = JSON.parse(process?.env?.EXPLORER_API_KEYS || '{}');
const walletConnectProjectId = '880f9dbb8c48ff1ccb009e680d5c522c';

interface Config {
  debug: boolean; // Enables some debug features in the app
  version: string | null; // Matches version number in package.json
  explorerApiKeys: Record<string, string>; // Optional map of API keys for block explorer
  showTipBox: boolean; // Show/Hide the blue tip box above the main form
  walletConnectProjectId: string;
}

export const config: Config = Object.freeze({
  debug: isDevMode,
  version,
  explorerApiKeys,
  showTipBox: true,
  walletConnectProjectId,
});
