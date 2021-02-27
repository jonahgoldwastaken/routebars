import handlebars from 'https://cdn.skypack.dev/handlebars@^4.7.7'

export function component(
  templatePath,
  initialState = {},
  { mounted, updated, unmounted } = {
    mounted: null,
    updated: null,
    unmounted: null,
  }
) {
  async function renderer(rerender) {
    try {
      const res = await fetch(`${window.location.origin}${templatePath}`)
      const source = res.text()
      const template = compile(source)
      const state = createState(
        initialState,
        update.bind(null, rerender, template)
      )
      const firstRender = render(template, state)
      const component = {
        state,
        template: firstRender,
        mounted,
        updated,
        unmounted,
      }
      return component
    } catch {
      console.error(`${templatePath} is not a valid template path`)
    }
  }
  return renderer
}

function createState(initialState, updateFn) {
  let _state = { ...initialState }
  let publicState = {}

  for (const key in initialState) {
    Object.defineProperty(publicState, key, {
      get() {
        return _state[key]
      },
      set(value) {
        _state[key] = value
        updateFn(_state)
      },
    })
  }

  return publicState
}

function render(template, state) {
  return template(state)
}

function compile(source) {
  return handlebars.compile(source)
}

function update(callback, template, state) {
  return callback(template(state))
}
