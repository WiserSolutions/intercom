import { useEffect, useRef } from 'react'
import useAsyncFn from 'react-use/lib/useAsyncFn'

import { loadIntercom, startIntercom, stopIntercom, updateIntercom } from './intercom'
import { shallowEqual } from './utils/shallowEqual'

const useObjectMemo = (value) => {
  const ref = useRef(value)
  if (!shallowEqual(ref.current, value)) ref.current = value
  return ref.current
}

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
