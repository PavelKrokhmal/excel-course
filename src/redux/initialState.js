import { storage } from "../core/utils"
import { defaultStyles } from '@/constants'
import { defaultTitle } from "../constants"

export const defaultState = { colState: {},
                            rowState: {},
                            dataState: {},
                            stylesState: {},
                            currentStyle: defaultStyles,
                            currentText: '',
                            title: defaultTitle,
                            }

export const initialState = storage('excel-state') || defaultState
