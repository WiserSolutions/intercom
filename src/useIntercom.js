import { useEffect } from 'react'
import { useObjectMemo } from '@hon2a/use-object-memo'
import useAsyncFn from 'react-use/lib/useAsyncFn'

import { loadIntercom, startIntercom, stopIntercom, updateIntercom } from './intercom'

export const useIntercom = (appId, settings = {}) => {
  const settingsMemo = useObjectMemo(settings)
  const [{ loading: isLoading, value: isStarted }, loadAndStart] = useAsyncFn(async () => {
    await loadIntercom(appId)
    startIntercom(appId, settingsMemo)
    return true
  }, [appId, settingsMemo])
  useEffect(() => {
    if (!appId) {
      if (isStarted) stopIntercom()
      return
    }

    if (isStarted) {
      updateIntercom(settingsMemo)
    } else if (!isLoading) {
      loadAndStart()
    }
  }, [appId, settingsMemo])
}
