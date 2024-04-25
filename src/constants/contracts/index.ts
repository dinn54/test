import {
  CLINGSWAP_VAULT_INFO,
  CLINGSWAP_VAULTROUTER_INFO,
} from './polygon/clingswap'
import { CVNFT_TOKENROUTER_INFO } from './polygon/cvnft'
import { FANDOMSHOP_INFO } from './polygon/fandomshop'
import { CLINGEVENT_INFO } from './polygon/helper'
import { CVTX_INFO, FDX_INFO } from './polygon/tokens'

export const CONTRACTINFO_POLYGON = {
  clingswap: {
    vault: CLINGSWAP_VAULT_INFO,
    vault_router: CLINGSWAP_VAULTROUTER_INFO,
  },
  cvnft: {
    token_router: CVNFT_TOKENROUTER_INFO,
  },
  fandomshop: {
    fandomshop: FANDOMSHOP_INFO,
  },
  helper: {
    cling_event: CLINGEVENT_INFO,
  },
  tokens: {
    cvtx: CVTX_INFO,
    fdx: FDX_INFO,
  },
}

export const CONTRACTINFO_BINANCE = {}
