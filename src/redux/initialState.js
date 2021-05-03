import { defaultStyles, defaultTitle } from '@/constants'
import { clone } from '@core/utils'

export const defaultState = { colState: {},
                            rowState: {},
                            dataState: {},
                            stylesState: {},
                            currentStyle: defaultStyles,
                            currentText: '',
                            title: defaultTitle,
                            openedDate: new Date().toJSON(),
                            }

const normalize = function(state) {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: '',
    }
}

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
