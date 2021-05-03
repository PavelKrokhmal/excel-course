import { ExcelComponent } from "@core/ExcelComponent";
import {$} from '@core/dom'
import { changeTitle } from "@/redux/actions";
import { defaultTitle } from "@/constants";
import { debounce } from "@core/utils";
import { ActiveRoute } from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = "excel__header"
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Do you really want to delete this table?')
      if (decision) {
        localStorage.removeItem('excel-' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return ` 
      <input type="text" class="input" value="${title}"></input>
      <div>
        <span data-button="exit" class="button">
          <span class="material-icons" data-button="exit">
            exit_to_app
          </span>
        </span>
        <div class="button" data-button="remove">
          <span class="material-icons" data-button="remove">
            delete
          </span>
        </div>
      </div>`;
  }
}
