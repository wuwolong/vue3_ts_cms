import registerElement from './register-element'
import registerProperties from './register_properties'
import { App } from 'vue'
export default function globalRegister(app: App): void {
  registerElement(app)
  registerProperties(app)
}
