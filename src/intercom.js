// @warn Don't modify this carefully cleaned up integration snippet from
//  https://developers.intercom.com/installing-intercom/docs/basic-javascript unless absolutely necessary!
// @note The original snippet has been completely refactored to allow lazy loading instead of having to contain
//  hard-coded app ID.
// region Install

let { Intercom } = window
if (typeof Intercom === 'function') {
  Intercom('reattach_activator')
  Intercom('update', window.intercomSettings)
} else {
  Intercom = function () {
    Intercom.c(arguments)
  }
  Intercom.q = []
  Intercom.c = (args) => {
    Intercom.q.push(args)
  }
  window.Intercom = Intercom
}

export const loadIntercom = (appId) =>
  new Promise((resolve, reject) => {
    const loadScript = () => {
      const scriptNode = Object.assign(document.createElement('script'), {
        type: 'text/javascript',
        async: true,
        src: `https://widget.intercom.io/widget/${appId}`,
        onload: () => resolve(Intercom),
        onerror: reject,
      })
      const refNode = document.getElementsByTagName('script')[0]
      refNode.parentNode.insertBefore(scriptNode, refNode)
    }

    if (document.readyState === 'complete') {
      loadScript()
    } else if (window.attachEvent) {
      window.attachEvent('onload', loadScript)
    } else {
      window.addEventListener('load', loadScript, false)
    }
  })

// endregion
// The wrappers below are added just as a convenience feature, as the real API is a bit unwieldy.
// region API Wrapper

export const isIntercomLoaded = () => Boolean(Intercom.booted)

export function startIntercom(appId, settings = {}) {
  Intercom('boot', { ...settings, app_id: appId })
}

export function getIntercomSettings() {
  return window.intercomSettings
}

export function updateIntercom(settingsUpdate = {}) {
  Intercom('update', settingsUpdate)
}

export function stopIntercom() {
  Intercom('shutdown')
}

export function showIntercom() {
  Intercom('show')
}

export function hideIntercom() {
  Intercom('hide')
}

export function startIntercomTour(tourId) {
  Intercom('startTour', tourId)
}

// endregion
