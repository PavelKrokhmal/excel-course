import { defaultStyles } from "../../constants"
import { parse } from "../../core/parse"
import { toInlineStyles } from "../../core/utils"

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`
    const data = parse(state.dataState[id]) || ''
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]})
    return `
      <div class="cell" 
      contenteditable 
      data-col="${col}"
      data-type="cell"
      data-value="${data}"
      style="width: ${getWidth(state.colState, col)}; ${styles};" 
      data-id="${id}">
      ${data}
      </div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div class="column" 
          data-type="resizable" 
          style="width: ${width}"
          data-col="${index}">
      ${col}
      <div class="col-resize" 
          data-resize="col"></div>
    </div>
  `
}

function createRow(content, index, state) {
  const divRowResize = `<div class="row-resize" data-resize="row"></div>`
  const height = getHeight(state, index)
  const resizer = index ? divRowResize : ''
  return `
    <div class="row" 
          data-type="resizable" 
          data-row="${index}" 
          style="height: ${height}">
      <div class="row-info">
      ${index ? index : ''}
      ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFromState(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
              .fill('')
              .map(toChar)
              .map(withWidthFromState(state.colState))
              .map(toColumn)
              .join('')

  rows.push(createRow(cols, null, {}))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
                  .fill('')
                  .map(toCell(state, row))
                  .join('')
    rows.push(
      createRow(
        cells,
        row + 1,
        state.rowState
      )
    )
  }
  return rows.join('')
}
