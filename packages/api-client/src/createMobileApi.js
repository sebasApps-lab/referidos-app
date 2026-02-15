import { runOnboardingCheck } from "./auth/onboarding.js";
import { runValidateRegistration } from "./auth/registration.js";
import { searchAddresses } from "./address/search.js";
import { reverseGeocode } from "./address/reverse.js";
import { getGpsFallbackLocation, saveGpsFallbackLocation } from "./address/gpsFallback.js";
import {
  fetchCantonesByProvincia,
  fetchParroquiasByCanton,
  fetchProvincias,
} from "./address/territory.js";
import * as support from "./support/supportClient.js";
import { logEvent } from "./logs/logEvent.js";

export function createMobileApi(supabase) {
  return {
    auth: {
      runOnboardingCheck: () => runOnboardingCheck(supabase),
      runValidateRegistration: () => runValidateRegistration(supabase),
    },
    address: {
      search: (query, options) => searchAddresses(supabase, query, options),
      reverse: (lat, lng, options) => reverseGeocode(supabase, lat, lng, options),
      saveGpsFallback: (payload) => saveGpsFallbackLocation(supabase, payload),
      getGpsFallback: () => getGpsFallbackLocation(supabase),
      fetchProvincias: () => fetchProvincias(supabase),
      fetchCantones: (provinciaId) => fetchCantonesByProvincia(supabase, provinciaId),
      fetchParroquias: (cantonId) => fetchParroquiasByCanton(supabase, cantonId),
    },
    support: {
      createThread: (payload) => support.createSupportThread(supabase, payload),
      assignThread: (payload) => support.assignSupportThread(supabase, payload),
      updateStatus: (payload) => support.updateSupportStatus(supabase, payload),
      addNote: (payload) => support.addSupportNote(supabase, payload),
      closeThread: (payload) => support.closeSupportThread(supabase, payload),
      createIrregular: (payload) => support.createIrregularThread(supabase, payload),
      startSession: (payload) => support.startSupportSession(supabase, payload),
      endSession: (payload) => support.endSupportSession(supabase, payload),
      pingSession: () => support.pingSupportSession(supabase),
      startAdminSession: (payload) => support.startAdminSupportSession(supabase, payload),
      endAdminSession: (payload) => support.endAdminSupportSession(supabase, payload),
      pingAdminSession: (payload) => support.pingAdminSupportSession(supabase, payload),
      denyAdminSession: (payload) => support.denyAdminSupportSession(supabase, payload),
      createAdminUser: (payload) => support.createSupportAdminUser(supabase, payload),
      cancelThread: (payload) => support.cancelSupportThread(supabase, payload),
      anonymous: {
        createThread: (payload) => support.createAnonymousSupportThread(supabase, payload),
        getThreadStatus: (payload) => support.getAnonymousSupportThreadStatus(supabase, payload),
        linkToUser: (payload) => support.linkAnonymousThreadToUser(supabase, payload),
      },
    },
    logs: {
      logEvent: (payload) => logEvent(supabase, payload),
    },
  };
}
