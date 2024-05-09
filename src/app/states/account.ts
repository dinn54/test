
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ethers } from "ethers";

const { persistAtom } = recoilPersist();

export const SignerState = atom<ethers.providers.JsonRpcSigner | null>({
  key: "ethers_signer",
  default: null,
  effects_UNSTABLE: [persistAtom], // Apply persistence effect
});

export const AccountState = atom<string | null>({
  key: "ethers_account",
  default: null,
  effects_UNSTABLE: [persistAtom], // Apply persistence effect
});

export const ChainNetworkState = atom<string>({
  key: "ethers_network",
  default: "polygonamoy",
  effects_UNSTABLE: [persistAtom], // Apply persistence effect
});

export const BalanceState = atom<string | null>({
  key: "balance",
  default: "0",
  effects_UNSTABLE: [persistAtom], // Apply persistence effect
});